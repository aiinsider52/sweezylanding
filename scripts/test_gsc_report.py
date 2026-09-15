import importlib.util
import csv
from datetime import date, timedelta
from pathlib import Path
import tempfile
import unittest

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


if __name__ == "__main__":
    unittest.main()
