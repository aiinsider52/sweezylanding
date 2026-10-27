import type { Locale } from "../lib/i18n";

// Describe the illustration itself. John is a fictional mascot, not a person
// offering the services discussed on the surrounding page.
const SCENES = {
  "home-discover": ["з біноклем і зеленим рюкзаком", "with binoculars and a green backpack", "mit Fernglas und grünem Rucksack"],
  "home-welcome": ["вітає рукою поруч із зеленою валізою", "waving beside a green suitcase", "winkt neben einem grünen Koffer"],
  "home-route": ["показує маршрут на паперовій мапі з компасом", "pointing to a route on a paper map with a compass", "zeigt eine Route auf einer Papierkarte mit Kompass"],
  "home-done": ["піднімає великі пальці поруч із зеленою зіркою", "giving two thumbs up beside a green star", "zeigt beide Daumen nach oben neben einem grünen Stern"],
  "home-help": ["у гарнітурі поруч із хмаринкою зі знаком питання", "wearing a headset beside a question-mark speech bubble", "mit Headset neben einer Sprechblase mit Fragezeichen"],
  "home-community": ["з розкритими долонями та двома хмаринками повідомлень", "with open hands and two conversation bubbles", "mit offenen Händen und zwei Sprechblasen"],
  footer: ["тримає зелене горнятко обома руками", "holding a green mug in both hands", "hält eine grüne Tasse mit beiden Händen"],
  download: ["з буклетами в руці показує пальцем униз", "holding booklets and pointing down", "hält Broschüren und zeigt nach unten"],
  "travel-kit": ["з фотоапаратом і зеленою сумкою через плече", "with a camera and a green crossbody bag", "mit Kamera und grüner Umhängetasche"],
  guides: ["показує сторінку відкритої зеленої книги", "pointing to a page in an open green guidebook", "zeigt auf eine Seite in einem offenen grünen Ratgeber"],
  starter: ["тримає папку з документами поруч із валізою", "holding a document folder beside a suitcase", "hält eine Dokumentenmappe neben einem Koffer"],
  services: ["дивиться крізь лупу й тримає зелений маркер мапи", "looking through a magnifying glass and holding a green map pin", "schaut durch eine Lupe und hält einen grünen Kartenmarker"],
  team: ["усміхається, тримаючи руки в кишенях чорної куртки", "smiling with his hands in his black jacket pockets", "lächelt mit den Händen in den Taschen seiner schwarzen Jacke"],
  about: ["тримає зелене серце в долонях", "holding a green heart", "hält ein grünes Herz in den Händen"],
  places: ["із трекінговою палицею та рюкзаком стає на камінь", "stepping onto a rock with a trekking pole and backpack", "steigt mit Wanderstock und Rucksack auf einen Stein"],
  partners: ["тримає світлу папку й простягає відкриту долоню", "holding a cream portfolio and extending an open hand", "hält eine helle Mappe und streckt eine offene Hand aus"],
  planner: ["із ноутбуком і олівцем за м’ятним столом", "with a laptop and pencil at a mint-green desk", "mit Laptop und Bleistift an einem mintgrünen Tisch"],
  "post-writer": ["робить нотатки олівцем у світлому блокноті", "writing with a pencil in a cream notebook", "schreibt mit einem Bleistift in ein helles Notizbuch"],
  jobs: ["із портфелем показує на зелену лампочку", "holding a briefcase and pointing to a green light bulb", "hält eine Aktentasche und zeigt auf eine grüne Glühbirne"],
  "article-reader": ["в окулярах перегортає сторінку відкритої книги", "wearing glasses and turning a page in an open book", "trägt eine Brille und blättert in einem offenen Buch"],
  community: ["із телефоном сидить на зеленій хмаринці повідомлення", "sitting on a green conversation bubble with a phone", "sitzt mit einem Telefon auf einer grünen Sprechblase"],
} as const;

export type CompanionPose = keyof typeof SCENES;

export function companionImageAlt(pose: CompanionPose, locale: Locale) {
  const [uk, en, de] = SCENES[pose];
  if (locale === "uk") return `Джон, 3D-персонаж Sweezy, ${uk}`;
  if (locale === "de") return `John, die 3D-Figur von Sweezy, ${de}`;
  return `John, Sweezy’s 3D mascot, ${en}`;
}

export function companionImage(pose: CompanionPose) {
  return `/brand/companion/${pose}.webp`;
}
