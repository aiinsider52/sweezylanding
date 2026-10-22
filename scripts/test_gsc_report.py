import importlib.util
import csv
from datetime import date, timedelta
from pathlib import Path
import tempfile
import unittest
from zipfile import ZipFile
from xml.sax.saxutils import escape

spec = importlib.util.spec_from_file_location("gsc_report", Path(__file__).with_name("gsc-report.py"))
report = importlib.util.module_from_spec(spec)
spec.loader.exec_module(report)


class MetricsTests(unittest.TestCase):
    def fixture(self, folder, days):
        with (folder / "Диаграмма.csv").open("w", encoding="utf-8-sig", newline="") as output:
            writer = csv.writer(output)
            writer.writerow(["Дата", "Kлики", "Показы", "CTR", "Позиция"])
            for day in days:
                writer.writerow([day, 1, 100, "1%", 10])
        with (folder / "Страницы.csv").open("w", encoding="utf-8", newline="") as output:
            csv.writer(output).writerow(["Популярные страницы", "Kлики", "Показы", "CTR", "Позиция"])
        with (folder / "Запросы.csv").open("w", encoding="utf-8", newline="") as output:
            writer = csv.writer(output)
            writer.writerow(["Популярные запросы", "Kлики", "Показы", "CTR", "Позиция"])
            writer.writerow(["moving to zurich", 2, 152, "1.32%", 23.69])
            writer.writerow(["sweezy app", 7, 88, "7.95%", 4.94])

    def test_windows_partial_month_and_unknown_visitors(self):
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            self.fixture(folder, [date(2026, 7, 19) + timedelta(days=i) for i in range(56)])
            result = report.build_report(folder)
            self.assertEqual(result["last_28_days"]["clicks"], 28)
            self.assertEqual(result["previous_28_days"]["to"], "2026-08-15")
            self.assertTrue(result["months"]["2026-08"]["complete"])
            self.assertFalse(result["months"]["2026-09"]["complete"])
            self.assertIsNone(result["visitor_goal"]["achieved"])
            self.assertIsNone(result["visitor_goal"]["measured_site_visits"])
            self.assertEqual(result["visitor_goal"]["monthly_site_visits_range"], [2000, 3000])
            self.assertEqual(
                result["non_brand_query_opportunities"][0]["Популярные запросы"],
                "moving to zurich",
            )

    def test_missing_and_duplicate_dates_fail(self):
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            for days in [["2026-09-01", "2026-09-03"], ["2026-09-01", "2026-09-01"]]:
                self.fixture(folder, days)
                with self.assertRaises(ValueError):
                    report.build_report(folder)

    def test_ctr_is_weighted_not_averaged(self):
        result = report.metrics([
            {"Клики": "1", "Показы": "10", "Позиция": "1"},
            {"Клики": "1", "Показы": "90", "Позиция": "11"},
        ])
        self.assertEqual(result["ctr_percent"], 2)
        self.assertEqual(result["approximate_position"], 10)

    def test_zero_impressions_are_not_position_zero(self):
        result = report.metrics([{"Клики": "0", "Показы": "0", "Позиция": ""}])
        self.assertIsNone(result["ctr_percent"])
        self.assertIsNone(result["approximate_position"])

    def test_xlsx_matches_csv_with_shared_inline_and_sparse_cells(self):
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            self.fixture(folder, [date(2026, 8, 26) + timedelta(days=i) for i in range(56)])
            expected = report.build_report(folder)
            strings = []
            sheets = []
            names = ["Диаграмма", "Страницы", "Запросы"]
            with ZipFile(folder / "export.xlsx", "w") as archive:
                for index, name in enumerate(names, 1):
                    with (folder / (name + ".csv")).open(encoding="utf-8-sig", newline="") as source:
                        rows = list(csv.reader(source))
                    xml_rows = []
                    for row_number, row in enumerate(rows, 1):
                        cells = []
                        for column, value in enumerate(row):
                            if not value:
                                continue
                            coordinate = chr(65 + column) + str(row_number)
                            if column in (1, 2, 4) and row_number > 1:
                                cells.append(f'<c r="{coordinate}"><v>{float(value)}</v></c>')
                            elif row_number % 2:
                                strings.append(value)
                                cells.append(f'<c r="{coordinate}" t="s"><v>{len(strings) - 1}</v></c>')
                            else:
                                cells.append(f'<c r="{coordinate}" t="inlineStr"><is><t>{escape(value)}</t></is></c>')
                        xml_rows.append(f'<row r="{row_number}">' + ''.join(cells) + '</row>')
                    archive.writestr(f"xl/worksheets/sheet{index}.xml", '<worksheet xmlns="' + report.NS['s'] + '"><sheetData>' + ''.join(xml_rows) + '</sheetData></worksheet>')
                    sheets.append(f'<sheet name="{name}" sheetId="{index}" r:id="rId{index}"/>')
                archive.writestr("xl/workbook.xml", '<workbook xmlns="' + report.NS['s'] + '" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' + ''.join(sheets) + '</sheets></workbook>')
                archive.writestr("xl/_rels/workbook.xml.rels", '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + ''.join(f'<Relationship Id="rId{i}" Target="/xl/worksheets/sheet{i}.xml"/>' for i in range(1, 4)) + '</Relationships>')
                archive.writestr("xl/sharedStrings.xml", '<sst xmlns="' + report.NS['s'] + '">' + ''.join('<si><t>' + escape(value) + '</t></si>' for value in strings) + '</sst>')
            actual = report.build_report(folder / "export.xlsx")
            for key in ["total", "months", "last_28_days", "previous_28_days", "growth_percent", "query_coverage"]:
                self.assertEqual(actual[key], expected[key], key)

    def test_fractional_and_negative_counts_fail(self):
        for value in ["1.5", "-1", "NaN", "inf"]:
            with self.assertRaises(ValueError):
                report.count(value)


if __name__ == "__main__":
    unittest.main()
