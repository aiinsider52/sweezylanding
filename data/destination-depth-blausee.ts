import type { Locale } from "../lib/i18n";
import type { DestinationDepth } from "./destination-depth";

const t = (en: string, uk: string, de: string): Record<Locale, string> => ({ en, uk, de });
const list = (en: string[], uk: string[], de: string[]): Record<Locale, string[]> => ({ en, uk, de });

export const blauseeDepth: DestinationDepth = {
  reviewedAt: "2026-09-28",
  seoTitle: t("Blausee Switzerland: Tickets, Bus & Boat Trip", "Блаузеє: квитки, автобус і прогулянка озером", "Blausee: Eintritt, Anreise und Bootsfahrt"),
  seoDescription: t("Plan a Blausee visit: bus via Frutigen or Kandersteg, park tickets, seasonal boat trips and swimming rules. Official links and a relaxed route.", "Поїздка на Блаузеє: автобус через Frutigen або Kandersteg, квитки, сезонний човен і правила купання. Офіційні посилання та маршрут.", "Blausee-Ausflug planen: Bus ab Frutigen oder Kandersteg, Eintritt, saisonale Bootsfahrt und Baderegeln. Mit offiziellen Links und Route."),
  relatedSlugs: ["oeschinen-lake", "bern-old-town", "lake-murten"],
  sources: [
    { name: "Blausee: directions and opening hours", url: "https://www.blausee.ch/en/welcome/" },
    { name: "Blausee: visitor FAQ", url: "https://www.blausee.ch/en/welcome/faq/" },
    { name: "Blausee: nature park and paths", url: "https://www.blausee.ch/en/nature-park/" },
  ],
  lead: t("Plan Blausee as a short lake-and-forest visit, not an alpine hiking day. Leave room for sitting by the water instead of treating every attraction as a required stop. The 2–3 hour estimate is a planning suggestion, excluding your journey.", "Плануйте Блаузеє як коротку прогулянку біля озера й у лісі, а не гірський похід. Залиште час посидіти біля води, не перетворюючи кожну атракцію на обов’язкову зупинку. Орієнтир 2–3 години — порада для планування без дороги.", "Blausee als kurzen See- und Waldausflug planen, nicht als Bergwandertag. Zeit am Wasser lassen, statt jede Attraktion abzuhaken. Die 2–3 Stunden sind ein Planungsvorschlag ohne Anreise."),
  sections: [
    { title: t("Getting to Blausee without a car", "Як дістатися без автомобіля", "Anreise ohne Auto"), paragraphs: list(
      ["Take a train to Frutigen or Kandersteg, then a bus to Blausee BE. Check your return connection before entering the park. The operator opens the park from 09:00; check the date-specific closing time and any event exceptions on its website."],
      ["Їдьте потягом до Frutigen або Kandersteg, далі автобусом до Blausee BE. До входу в парк перевірте зворотний рейс. Парк відкривається з 09:00; час закриття та винятки через події перевіряйте на сайті оператора."],
      ["Mit dem Zug nach Frutigen oder Kandersteg, dann mit dem Bus bis Blausee BE. Vor dem Parkbesuch die Rückverbindung prüfen. Der Park öffnet ab 09:00; Schliesszeit und Veranstaltungsausnahmen für das Besuchsdatum beim Betreiber prüfen."]
    ) },
    { title: t("Tickets and optional activities", "Квитки та додаткові заняття", "Eintritt und optionale Aktivitäten"), paragraphs: list(
      ["Use the operator's current ticket shop for the price on your chosen day. Decide whether your priority is the lake, a meal or a boat trip before buying. Keep the boat optional so a change in operation does not derail the whole visit."],
      ["Ціну на обрану дату перевіряйте в офіційному магазині квитків. До купівлі визначте пріоритет: озеро, обід чи човен. Залиште човен додатковою опцією, щоб зміна роботи не зруйнувала весь план."],
      ["Den Preis für den Besuchstag im offiziellen Ticketshop prüfen. Vor dem Kauf entscheiden: See, Essen oder Bootsfahrt? Das Boot als Zusatz einplanen, damit eine Betriebsänderung nicht den ganzen Ausflug bestimmt."]
    ) },
    { title: t("Walk the park at your own pace", "Прогулянка у власному темпі", "Den Park im eigenen Tempo erkunden"), paragraphs: list(
      ["The operator describes a short approach to the lake and woodland paths with roots and stones. Choose footwear for the paths you intend to use, not only for photographs at the water. Start with the shore, then decide how much walking suits your group."],
      ["Оператор описує короткий підхід до озера та лісові стежки з корінням і камінням. Обирайте взуття для маршруту, а не лише фотографій біля води. Почніть із берега й вирішіть, скільки прогулянки підходить вашій групі."],
      ["Der Betreiber beschreibt einen kurzen Zugang zum See und Waldwege mit Wurzeln und Steinen. Schuhe nach dem geplanten Weg wählen, nicht nur für Fotos am Wasser. Am Ufer beginnen und danach den passenden Umfang der Runde entscheiden."]
    ) },
  ],
  route: [
    { title: t("Save the return connection", "Збережіть зворотний рейс", "Rückverbindung speichern"), text: t("Choose an arrival and a later return with a buffer; keep the timetable available offline.", "Оберіть прибуття та зворотний рейс із запасом; збережіть розклад офлайн.", "Ankunft und Rückfahrt mit Reserve wählen; Fahrplan offline bereithalten.") },
    { title: t("Lake first, extras second", "Спершу озеро, потім додаткові плани", "Erst See, dann Extras"), text: t("Spend time at the shore before deciding on food, more walking or any available boat trip.", "Побудьте біля берега, а потім вирішуйте щодо їжі, довшої прогулянки чи доступного човна.", "Am Ufer Zeit lassen, danach über Essen, weitere Wege oder eine verfügbare Bootsfahrt entscheiden.") },
    { title: t("Leave time for the bus", "Залиште час до автобуса", "Zeit für den Bus lassen"), text: t("End the walk with enough margin to reach your stop without rushing.", "Завершіть прогулянку із запасом, щоб без поспіху дістатися зупинки.", "Die Runde mit genügend Reserve für den Weg zur Haltestelle beenden.") },
  ],
  options: [
    { title: t("A quiet short visit", "Короткий спокійний візит", "Kurzer ruhiger Besuch"), bestFor: t("One main stop", "Одна головна зупинка", "Ein Hauptziel"), plan: t("Keep the lake and a relaxed walk as the whole plan.", "Залиште озеро й неквапну прогулянку єдиним планом.", "See und ruhigen Spaziergang als ganzen Plan behalten."), watch: t("Return time", "Час повернення", "Rückfahrzeit") },
    { title: t("Visit with a meal", "Прогулянка з обідом", "Ausflug mit Essen"), bestFor: t("A slower afternoon", "Неквапливий день", "Ruhiger Nachmittag"), plan: t("Confirm food options separately before adding a meal to the walk.", "Окремо перевірте варіанти харчування перед плануванням обіду.", "Essensmöglichkeiten separat prüfen, bevor ein Essen eingeplant wird."), watch: t("Restaurant hours", "Години ресторану", "Restaurantzeiten") },
    { title: t("A second destination?", "Ще одне місце?", "Ein zweites Ziel?"), bestFor: t("Flexible itineraries", "Гнучкий маршрут", "Flexible Reisepläne"), plan: t("Compare Oeschinensee separately; do not assume its mountain access fits the same schedule.", "Окремо перевірте Ешинен: гірський доступ не обов’язково впишеться в цей розклад.", "Oeschinensee separat prüfen; der Bergzugang passt nicht automatisch in denselben Zeitplan."), watch: t("Transfers and conditions", "Пересадки й умови", "Umstiege und Bedingungen") },
  ],
  checklist: list(["Check today's park hours", "Check the current ticket offer", "Save the bus return", "Choose walking shoes", "Keep optional activities flexible"], ["Перевірте години парку", "Перевірте актуальний квиток", "Збережіть зворотний автобус", "Оберіть взуття для прогулянки", "Залиште додаткові заняття гнучкими"], ["Heutige Parkzeiten prüfen", "Aktuelles Ticketangebot prüfen", "Busrückfahrt speichern", "Schuhe für den Weg wählen", "Zusatzaktivitäten flexibel halten"]),
  faq: [
    { question: t("Is Blausee free to visit?", "Чи безкоштовний вхід на Блаузеє?", "Ist der Blausee kostenlos?"), answer: t("No. The nature park charges admission. Check the current ticket offer with the operator.", "Ні. Вхід до природного парку платний. Актуальні квитки перевіряйте в оператора.", "Nein. Der Naturpark kostet Eintritt. Aktuelles Ticketangebot beim Betreiber prüfen.") },
    { question: t("Can you swim in Blausee?", "Чи можна купатися в Блаузеє?", "Darf man im Blausee baden?"), answer: t("No swimming during an ordinary park visit. Special organised events have separate rules.", "Під час звичайного відвідування купатися не можна. Організовані події мають окремі правила.", "Beim normalen Parkbesuch ist Baden verboten. Für organisierte Sonderveranstaltungen gelten eigene Regeln.") },
    { question: t("Is the boat trip available all year?", "Чи працює човен увесь рік?", "Fährt das Boot ganzjährig?"), answer: t("No. The glass-bottom boat is a summer activity; evening tickets do not include an operating boat service.", "Ні. Човен із прозорим дном — літня активність; увечері човнових рейсів немає.", "Nein. Das Glasbodenboot ist ein Sommerangebot; am Abend findet kein Bootsbetrieb statt.") },
  ],
};
