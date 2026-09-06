import type { Locale } from "../lib/i18n";
import { batch12DestinationDepth } from "./destination-depth-batch12";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type DestinationDepth = {
  reviewedAt: string;
  sources: { name: string; url: string }[];
  lead: LocalizedText;
  sections: { title: LocalizedText; paragraphs: LocalizedList }[];
  options: { title: LocalizedText; bestFor: LocalizedText; plan: LocalizedText; watch: LocalizedText }[];
  checklist: LocalizedList;
  faq: { question: LocalizedText; answer: LocalizedText }[];
};

const t = (en: string, uk: string, de: string): LocalizedText => ({ en, uk, de });
const list = (en: string[], uk: string[], de: string[]): LocalizedList => ({ en, uk, de });

const guides: Record<string, DestinationDepth> = {
  ...batch12DestinationDepth,
  "aletsch-glacier": {
    reviewedAt: "2026-09-07",
    sources: [
      { name: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1037/" },
      { name: "Aletsch Arena — viewpoints", url: "https://www.aletscharena.ch/en/about-the-region/destination/view-points" },
      { name: "Switzerland Tourism — Aletsch Glacier", url: "https://www.myswitzerland.com/en-ch/destinations/aletsch-the-largest-alpine-glacier/" },
    ],
    lead: t(
      "Aletsch is not one single stop. It is a high-Alpine region with several valley approaches, car-free villages and viewpoints on opposite parts of the glacier. Choose one access corridor and one main viewpoint before buying transport; trying to combine every platform in a day usually replaces landscape time with transfers.",
      "Алеч — це не одна зупинка, а високогірний регіон із кількома під’їздами з долини, безавтомобільними селами та оглядовими майданчиками в різних частинах льодовика. До купівлі квитків оберіть один напрям підйому й одну головну панораму: спроба об’єднати всі майданчики за день залишить більше пересадок, ніж часу на краєвид.",
      "Aletsch ist kein einzelner Halt, sondern eine Hochalpenregion mit mehreren Talzugängen, autofreien Dörfern und Aussichtspunkten an verschiedenen Gletscherabschnitten. Vor dem Ticketkauf einen Zugang und einen Hauptaussichtspunkt wählen; alle Plattformen an einem Tag zu verbinden kostet meist mehr Transfer- als Landschaftszeit."
    ),
    sections: [
      {
        title: t("Why this landscape matters", "Чому цей ландшафт важливий", "Warum diese Landschaft besonders ist"),
        paragraphs: list(
          [
            "The Great Aletsch Glacier lies inside the Swiss Alps Jungfrau–Aletsch World Heritage property. UNESCO describes this as the most glaciated part of the European Alps and highlights its record of mountain building, glacial landforms and ecological change after ice retreat. The significance is therefore larger than the view alone: the valley of ice makes geological time visible.",
            "From the Valais side, the glacier appears as a broad curve between high peaks. Aletsch Arena identifies Hohfluh, Moosfluh, Bettmerhorn and Eggishorn as its four principal viewpoints. Each shows a different section and sits at high altitude, so visibility, wind and temperature can differ sharply from conditions in the Rhône valley."
          ],
          [
            "Великий Алецький льодовик розташований у межах об’єкта Світової спадщини «Швейцарські Альпи Юнгфрау — Алеч». UNESCO називає цей район найбільш зледенілою частиною Європейських Альп і підкреслює його значення для розуміння формування гір, льодовикового рельєфу та змін рослинності після відступу льоду. Цінність місця — не лише в панорамі: тут буквально видно геологічний час.",
            "З боку Вале льодовик відкривається широкою дугою між високими вершинами. Aletsch Arena визначає Hohfluh, Moosfluh, Bettmerhorn і Eggishorn як чотири основні оглядові точки. Кожна показує іншу частину льодовика й лежить високо над долиною, тому вітер, температура та видимість можуть різко відрізнятися від погоди внизу."
          ],
          [
            "Der Grosse Aletschgletscher liegt im UNESCO-Welterbe Schweizer Alpen Jungfrau–Aletsch. UNESCO beschreibt das Gebiet als den am stärksten vergletscherten Teil der Europäischen Alpen und betont seine Bedeutung für Gebirgsbildung, Gletscherformen und die Wiederbesiedlung nach dem Eisrückgang. Der Wert reicht damit weit über das Panorama hinaus: Geologische Zeit wird sichtbar.",
            "Von der Walliser Seite erscheint der Gletscher als breiter Bogen zwischen hohen Gipfeln. Die Aletsch Arena nennt Hohfluh, Moosfluh, Bettmerhorn und Eggishorn als vier Hauptaussichtspunkte. Jeder zeigt einen anderen Abschnitt und liegt hoch über dem Rhonetal; Sicht, Wind und Temperatur können sich deshalb deutlich vom Tal unterscheiden."
          ]
        ),
      },
      {
        title: t("Choosing a viewpoint", "Як обрати оглядовий майданчик", "Den passenden Aussichtspunkt wählen"),
        paragraphs: list(
          [
            "Bettmerhorn works well for a first visit based around Bettmeralp: the village and lift create a clear out-and-back day. Moosfluh pairs naturally with Riederalp and gives room for shorter walks. Eggishorn is the highest of the four official viewpoints and suits travellers prioritising a wide mountain panorama from the Fiesch/Fiescheralp side.",
            "Treat cable-car access and hiking as separate decisions. A lift makes a viewpoint accessible but does not turn every connecting trail into an easy walk. Check the operating timetable, trail status and final descent before leaving. Walking onto the glacier is a different activity and should only be done with a qualified guide."
          ],
          [
            "Bettmerhorn зручно обрати для першої поїздки через Bettmeralp: село й підйомник формують зрозумілий маршрут туди й назад. Moosfluh логічно поєднується з Riederalp і дає більше варіантів короткої прогулянки. Eggishorn — найвища з чотирьох офіційних точок; вона підходить тим, хто шукає широку гірську панораму з боку Fiesch та Fiescheralp.",
            "Рішення про підйомник і рішення про похід — не одне й те саме. Канатна дорога спрощує доступ до панорами, але не робить усі сусідні стежки легкими. Перед виїздом перевірте розклад, стан маршруту й останній спуск. Вихід безпосередньо на льодовик — окрема активність, можлива лише з кваліфікованим гідом."
          ],
          [
            "Das Bettmerhorn eignet sich für einen ersten Besuch über Bettmeralp: Dorf und Bergbahn ergeben einen klaren Hin-und-zurück-Tag. Die Moosfluh lässt sich gut mit Riederalp und kürzeren Spaziergängen verbinden. Das Eggishorn ist der höchste der vier offiziellen Viewpoints und passt zu Reisenden, die von Fiesch und Fiescheralp ein weites Gipfelpanorama suchen.",
            "Bergbahnzugang und Wanderung getrennt beurteilen. Eine Bahn erleichtert den Aussichtspunkt, macht aber nicht jeden Verbindungsweg leicht. Fahrplan, Wegstatus und letzte Talfahrt vor der Abfahrt prüfen. Das Betreten des Gletschers ist eine eigene Aktivität und gehört ausschliesslich in Begleitung qualifizierter Guides."
          ]
        ),
      },
      {
        title: t("Beyond the ice", "Що подивитися крім льодовика", "Mehr als Eis"),
        paragraphs: list(
          [
            "The surrounding plateau changes the character of the trip. Riederalp, Bettmeralp and Fiescheralp are car-free mountain villages, while the rail connections and base stations sit in the Rhône valley. That separation is useful when planning accommodation: a valley stay offers simpler onward travel; a plateau stay gives earlier access to the landscape but depends more on lift timetables.",
            "Aletsch Forest adds a quieter counterpoint to the viewing platforms. The protected landscape documents how vegetation returns where ice once stood. For a weather backup or context before a hike, the World Nature Forum in Naters explains the wider UNESCO region indoors."
          ],
          [
            "Навколишнє плато змінює характер поїздки. Riederalp, Bettmeralp і Fiescheralp — безавтомобільні гірські села, тоді як залізниця й нижні станції підйомників розташовані в долині Рони. Це важливо для ночівлі: у долині простіше продовжити подорож, а на плато ви раніше опиняєтеся серед гір, проте сильніше залежите від розкладу канатних доріг.",
            "Алецький ліс дає спокійнішу альтернативу панорамним платформам. Заповідний ландшафт показує, як рослинність повертається на території, де раніше лежав лід. Якщо погода зіпсується або потрібен контекст перед походом, World Nature Forum у Naters знайомить із ширшим регіоном UNESCO в приміщенні."
          ],
          [
            "Das umliegende Plateau verändert den Charakter des Ausflugs. Riederalp, Bettmeralp und Fiescheralp sind autofreie Bergdörfer; Bahnanschlüsse und Talstationen liegen unten im Rhonetal. Für die Unterkunft ist das relevant: Im Tal bleibt die Weiterreise einfacher, auf dem Plateau beginnt der Landschaftstag früher, hängt aber stärker vom Bergbahnfahrplan ab.",
            "Der Aletschwald bildet einen ruhigen Gegenpol zu den Plattformen. Die geschützte Landschaft zeigt, wie Pflanzen Flächen zurückerobern, die früher vom Eis bedeckt waren. Als Schlechtwetter-Alternative oder Einführung vor der Wanderung erklärt das World Nature Forum in Naters die grössere UNESCO-Region im Innenraum."
          ]
        ),
      },
    ],
    options: [
      {
        title: t("Panorama day", "Панорамний день", "Panoramatag"),
        bestFor: t("First visit, families and limited hiking time", "Перша поїздка, родини та небагато часу на похід", "Erster Besuch, Familien und wenig Wanderzeit"),
        plan: t("Choose Bettmerhorn, Moosfluh or Eggishorn; use one valley access and return through the same corridor.", "Оберіть Bettmerhorn, Moosfluh або Eggishorn; піднімайтеся одним напрямом і повертайтеся ним же.", "Bettmerhorn, Moosfluh oder Eggishorn wählen; über denselben Talzugang hinauf- und zurückfahren."),
        watch: t("Lift timetable, cloud cover and last descent", "Розклад підйомника, хмарність і останній спуск", "Bergbahnfahrplan, Bewölkung und letzte Talfahrt"),
      },
      {
        title: t("Viewpoint plus walk", "Панорама та прогулянка", "Aussicht plus Wanderung"),
        bestFor: t("Travellers comfortable on signed mountain paths", "Ті, хто впевнено почувається на маркованих гірських стежках", "Reisende mit Erfahrung auf markierten Bergwegen"),
        plan: t("Pair one lift-served viewpoint with a signed local route; keep enough time to reverse the route if conditions change.", "Поєднайте один майданчик із локальним маркованим маршрутом; залиште час на повернення тим самим шляхом, якщо умови зміняться.", "Einen bergbahnerschlossenen Viewpoint mit einem markierten lokalen Weg verbinden; Zeit für eine Umkehr bei Wetterwechsel lassen."),
        watch: t("Trail grade, remaining snow, exposure and return transport", "Категорія стежки, залишки снігу, відкриті ділянки й зворотний транспорт", "Wegkategorie, Restschnee, ausgesetzte Stellen und Rückfahrt"),
      },
      {
        title: t("Two-day region stay", "Два дні в регіоні", "Zwei Tage in der Region"),
        bestFor: t("Aletsch Forest, more than one village and flexible weather", "Алецький ліс, кілька сіл і запас на зміну погоди", "Aletschwald, mehrere Dörfer und Wetterreserve"),
        plan: t("Use day one for a glacier viewpoint and day two for the forest, a village route or the World Nature Forum.", "Перший день віддайте панорамі льодовика, другий — лісу, маршруту між селами або World Nature Forum.", "Tag eins für den Gletscherblick, Tag zwei für Wald, Dorfroute oder World Nature Forum nutzen."),
        watch: t("Accommodation side matters: valley and plateau have different transport rhythms", "Сторона ночівлі важлива: долина й плато мають різний транспортний ритм", "Die Unterkunftsseite zählt: Tal und Plateau haben unterschiedliche Verkehrsabläufe"),
      },
    ],
    checklist: list(
      ["Select one viewpoint and its valley station", "Check mountain railway operations and last descent", "Check weather at viewpoint altitude, not only in the valley", "Open the route in swisstopo and confirm trail grade", "Carry layers, water and sun protection", "Use a qualified guide for any glacier access"],
      ["Оберіть один майданчик і його нижню станцію", "Перевірте роботу канатної дороги та останній спуск", "Дивіться погоду на висоті майданчика, а не лише в долині", "Відкрийте маршрут у swisstopo й перевірте категорію стежки", "Візьміть теплий шар, воду та захист від сонця", "Для виходу на льодовик користуйтеся послугами кваліфікованого гіда"],
      ["Einen Viewpoint und seine Talstation auswählen", "Betrieb und letzte Talfahrt prüfen", "Wetter auf Höhe des Aussichtspunkts statt nur im Tal prüfen", "Route in swisstopo öffnen und Wegkategorie kontrollieren", "Schichten, Wasser und Sonnenschutz mitnehmen", "Gletscher nur mit qualifiziertem Guide betreten"]
    ),
    faq: [
      { question: t("Which Aletsch viewpoint is best for a first visit?", "Який майданчик Алеч найкращий для першої поїздки?", "Welcher Aletsch-Viewpoint eignet sich für den ersten Besuch?"), answer: t("Bettmerhorn is a clear first-visit option when your day is based around Bettmeralp. Moosfluh pairs with Riederalp; Eggishorn is the highest official viewpoint. The best choice is the one with the clearest live weather and simplest same-day access.", "Bettmerhorn — зрозумілий варіант для першої поїздки через Bettmeralp. Moosfluh поєднується з Riederalp, а Eggishorn є найвищою офіційною точкою. Найкращий вибір — майданчик із яснішою погодою та найпростішою логістикою цього дня.", "Das Bettmerhorn ist über Bettmeralp eine klare Option für den ersten Besuch. Moosfluh passt zu Riederalp, Eggishorn ist der höchste offizielle Viewpoint. Am besten ist der Punkt mit guter Live-Sicht und einfacher Tageslogistik.") },
      { question: t("Can I step onto the Aletsch Glacier without a guide?", "Чи можна виходити на Алецький льодовик без гіда?", "Darf ich den Aletschgletscher ohne Guide betreten?"), answer: t("No. A viewpoint visit and a glacier tour are different activities. Switzerland Tourism states that crossing the glacier should only be done with a guide.", "Ні. Відвідування оглядового майданчика й тур льодовиком — різні активності. Switzerland Tourism зазначає, що переходити льодовик можна лише з гідом.", "Nein. Aussichtspunkt und Gletschertour sind verschiedene Aktivitäten. Schweiz Tourismus weist darauf hin, dass der Gletscher nur mit Guide überquert werden darf.") },
      { question: t("Can I see every viewpoint in one day?", "Чи реально побачити всі майданчики за один день?", "Kann ich alle Aussichtspunkte an einem Tag sehen?"), answer: t("It is a poor default plan. The viewpoints use different access corridors and lift connections. One viewpoint plus a walk gives a calmer and more reliable day; use a second day for another side of the region.", "Це невдалий базовий план: майданчики мають різні напрямки підйому й пересадки. Один майданчик плюс прогулянка дадуть спокійніший і надійніший день; іншу частину регіону залиште на другий день.", "Als Standardplan ist das unpraktisch: Die Viewpoints nutzen verschiedene Zugänge und Bergbahnen. Ein Aussichtspunkt plus Wanderung ergibt einen ruhigeren, zuverlässigeren Tag; eine zweite Seite besser am Folgetag besuchen.") },
    ],
  },
};

export function getDestinationDepth(slug: string) {
  return guides[slug] ?? null;
}
