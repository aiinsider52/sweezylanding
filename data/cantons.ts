export type Canton = {
  slug: string;
  name: string;
  nameDe: string;
  nameUk: string;
  capital: string;
  population: number;
  languageRegion: "German-speaking" | "French-speaking" | "Italian-speaking" | "Bilingual" | "Trilingual";
  languageRegionDe:
    | "Deutschsprachig"
    | "Französischsprachig"
    | "Italienischsprachig"
    | "Zweisprachig"
    | "Dreisprachig";
  languageRegionUk:
    | "німецькомовний"
    | "франкомовний"
    | "італійськомовний"
    | "двомовний"
    | "тримовний";
};

export const cantons: Canton[] = [
  { slug: "zurich", name: "Zurich", nameDe: "Zürich", nameUk: "Цюрих", capital: "Zurich", population: 1620020, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "bern", name: "Bern", nameDe: "Bern", nameUk: "Берн", capital: "Bern", population: 1071216, languageRegion: "Bilingual", languageRegionDe: "Zweisprachig", languageRegionUk: "двомовний" },
  { slug: "lucerne", name: "Lucerne", nameDe: "Luzern", nameUk: "Люцерн", capital: "Lucerne", population: 437944, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "uri", name: "Uri", nameDe: "Uri", nameUk: "Урі", capital: "Altdorf", population: 38275, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "schwyz", name: "Schwyz", nameDe: "Schwyz", nameUk: "Швіц", capital: "Schwyz", population: 168931, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "obwalden", name: "Obwalden", nameDe: "Obwalden", nameUk: "Обвальден", capital: "Sarnen", population: 39662, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "nidwalden", name: "Nidwalden", nameDe: "Nidwalden", nameUk: "Нідвальден", capital: "Stans", population: 45345, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "glarus", name: "Glarus", nameDe: "Glarus", nameUk: "Гларус", capital: "Glarus", population: 42371, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "zug", name: "Zug", nameDe: "Zug", nameUk: "Цуг", capital: "Zug", population: 133739, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "fribourg", name: "Fribourg", nameDe: "Freiburg", nameUk: "Фрібур", capital: "Fribourg", population: 346674, languageRegion: "Bilingual", languageRegionDe: "Zweisprachig", languageRegionUk: "двомовний" },
  { slug: "solothurn", name: "Solothurn", nameDe: "Solothurn", nameUk: "Золотурн", capital: "Solothurn", population: 289792, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "basel-stadt", name: "Basel-Stadt", nameDe: "Basel-Stadt", nameUk: "Базель-Штадт", capital: "Basel", population: 201384, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "basel-landschaft", name: "Basel-Landschaft", nameDe: "Basel-Landschaft", nameUk: "Базель-Ландшафт", capital: "Liestal", population: 301323, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "schaffhausen", name: "Schaffhausen", nameDe: "Schaffhausen", nameUk: "Шаффгаузен", capital: "Schaffhausen", population: 88667, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "appenzell-ausserrhoden", name: "Appenzell Ausserrhoden", nameDe: "Appenzell Ausserrhoden", nameUk: "Аппенцелль-Ауссерроден", capital: "Herisau", population: 56705, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "appenzell-innerrhoden", name: "Appenzell Innerrhoden", nameDe: "Appenzell Innerrhoden", nameUk: "Аппенцелль-Іннерроден", capital: "Appenzell", population: 16733, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "st-gallen", name: "St. Gallen", nameDe: "St. Gallen", nameUk: "Санкт-Галлен", capital: "St. Gallen", population: 540036, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "graubunden", name: "Graubünden", nameDe: "Graubünden", nameUk: "Граубюнден", capital: "Chur", population: 206138, languageRegion: "Trilingual", languageRegionDe: "Dreisprachig", languageRegionUk: "тримовний" },
  { slug: "aargau", name: "Aargau", nameDe: "Aargau", nameUk: "Ааргау", capital: "Aarau", population: 735808, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "thurgau", name: "Thurgau", nameDe: "Thurgau", nameUk: "Тургау", capital: "Frauenfeld", population: 299509, languageRegion: "German-speaking", languageRegionDe: "Deutschsprachig", languageRegionUk: "німецькомовний" },
  { slug: "ticino", name: "Ticino", nameDe: "Tessin", nameUk: "Тічино", capital: "Bellinzona", population: 358903, languageRegion: "Italian-speaking", languageRegionDe: "Italienischsprachig", languageRegionUk: "італійськомовний" },
  { slug: "vaud", name: "Vaud", nameDe: "Waadt", nameUk: "Во", capital: "Lausanne", population: 855106, languageRegion: "French-speaking", languageRegionDe: "Französischsprachig", languageRegionUk: "франкомовний" },
  { slug: "valais", name: "Valais", nameDe: "Wallis", nameUk: "Вале", capital: "Sion", population: 371288, languageRegion: "Bilingual", languageRegionDe: "Zweisprachig", languageRegionUk: "двомовний" },
  { slug: "neuchatel", name: "Neuchâtel", nameDe: "Neuenburg", nameUk: "Невшатель", capital: "Neuchâtel", population: 179518, languageRegion: "French-speaking", languageRegionDe: "Französischsprachig", languageRegionUk: "франкомовний" },
  { slug: "geneva", name: "Geneva", nameDe: "Genf", nameUk: "Женева", capital: "Geneva", population: 531102, languageRegion: "French-speaking", languageRegionDe: "Französischsprachig", languageRegionUk: "франкомовний" },
  { slug: "jura", name: "Jura", nameDe: "Jura", nameUk: "Юра", capital: "Delémont", population: 74840, languageRegion: "French-speaking", languageRegionDe: "Französischsprachig", languageRegionUk: "франкомовний" },
];

export function getCantonBySlug(slug: string) {
  return cantons.find((canton) => canton.slug === slug);
}

