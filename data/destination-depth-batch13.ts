import type { Locale } from "../lib/i18n";
import type { DestinationDepth } from "./destination-depth";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

const t = (en: string, uk: string, de: string): LocalizedText => ({ en, uk, de });
const list = (en: string[], uk: string[], de: string[]): LocalizedList => ({ en, uk, de });

export const batch13DestinationDepth: Record<string, DestinationDepth> = {
  "lavaux-vineyards": {
    reviewedAt: "2026-09-07",
    sources: [
      { name: "UNESCO World Heritage Centre — Lavaux", url: "https://whc.unesco.org/en/list/1243/" },
      { name: "Switzerland Tourism — Lavaux", url: "https://www.myswitzerland.com/en-ch/destinations/lavaux-vineyard-terraces/" },
      { name: "Vaud Promotion — Lavaux", url: "https://www.region-du-leman.ch/en/Z10330/lavaux-unesco" },
    ],
    lead: t(
      "Lavaux is a 30-kilometre cultural landscape, not one viewpoint. For a useful day, choose one railway station, one walking section and one return connection. Cully offers services and easy access, Rivaz puts you among steep terraces, and Saint-Saphorin adds a compact historic village. Trying to cover the whole UNESCO area in one visit weakens the experience.",
      "Лаво — це 30-кілометровий культурний ландшафт, а не одна оглядова точка. Для зручного дня оберіть одну станцію, одну пішохідну ділянку й одне зворотне сполучення. Cully дає більше сервісів, Rivaz веде до крутих терас, а Saint-Saphorin додає компактне історичне село. Намагатися пройти всю зону UNESCO за один раз не варто.",
      "Lavaux ist eine rund 30 Kilometer lange Kulturlandschaft, kein einzelner Aussichtspunkt. Für einen guten Tag einen Bahnhof, einen Wegabschnitt und eine Rückverbindung wählen. Cully bietet Infrastruktur, Rivaz führt direkt in steile Terrassen, Saint-Saphorin ergänzt ein kompaktes historisches Dorf. Das ganze UNESCO-Gebiet an einem Tag abzuhaken schwächt das Erlebnis."
    ),
    sections: [
      {
        title: t("Read Lavaux as a living landscape", "Побачте в Лаво живий ландшафт", "Lavaux als lebendige Landschaft lesen"),
        paragraphs: list(
          [
            "UNESCO inscribed Lavaux in 2007 as a vineyard landscape shaped by long interaction between people and a steep lakeshore. Stone walls, villages, paths and working vines form one system. The value is not a decorative lake backdrop alone: generations adapted the slope for cultivation while preserving settlements and routes.",
            "These are active vineyards. Stay on marked public paths, keep entrances and work lanes clear, and do not step between vines for a photograph. Harvest and maintenance can change what feels quiet or accessible. Respecting the working landscape protects both the visit and the people who maintain it.",
          ],
          [
            "UNESCO внесла Лаво до списку у 2007 році як виноградний ландшафт, сформований тривалою взаємодією людей із крутим берегом озера. Кам’яні стіни, села, стежки й діючі виноградники утворюють одну систему. Цінність місця — не лише красивий фон: покоління пристосовували схил для вирощування винограду, зберігаючи поселення й маршрути.",
            "Це робочі виноградники. Залишайтеся на маркованих громадських стежках, не блокуйте в’їзди й не заходьте між лозами заради фото. Збір урожаю та догляд можуть змінювати доступність ділянок. Повага до робочого ландшафту захищає і враження, і людей, які його підтримують.",
          ],
          [
            "UNESCO nahm Lavaux 2007 als Weinlandschaft auf, die durch lange Wechselwirkung zwischen Menschen und steilem Seeufer entstand. Steinmauern, Dörfer, Wege und bewirtschaftete Reben bilden ein System. Der Wert ist mehr als eine dekorative Seekulisse: Generationen passten den Hang dem Weinbau an und bewahrten Siedlungen und Routen.",
            "Die Rebberge werden bewirtschaftet. Auf markierten öffentlichen Wegen bleiben, Zufahrten freihalten und für Fotos nicht zwischen die Reben treten. Lese und Unterhalt verändern Ruhe und Zugang. Rücksicht schützt das Erlebnis und die Menschen, die diese Landschaft erhalten.",
          ]
        ),
      },
      {
        title: t("Choose one section, not the whole coast", "Оберіть одну ділянку, а не весь берег", "Einen Abschnitt statt der ganzen Küste wählen"),
        paragraphs: list(
          [
            "Cully is the easiest base for a first visit because trains, food and the waterfront sit close together. Rivaz works when the priority is the geometric vineyard slope and a shorter route. Saint-Saphorin rewards travellers who want lanes, stone houses and a slower village finish. Build the direction around elevation and the station you want to reach.",
            "Lake Geneva makes the landscape feel horizontal, but the paths repeatedly climb and descend. Heat and limited shade matter in summer. Carry water, use sun protection and check the official route map before leaving the station. A lakeside walk is a separate low-level option when slope conditions or heat make the terraces unsuitable.",
          ],
          [
            "Cully — найпростіша база для першого візиту: вокзал, їжа й набережна розташовані поруч. Rivaz підходить, якщо головне — геометрія схилу й коротший маршрут. Saint-Saphorin варто обрати за вузькі вулиці, кам’яні будинки й повільний фінал у селі. Напрям визначайте за набором висоти та потрібною кінцевою станцією.",
            "Женевське озеро створює відчуття рівного маршруту, але стежки постійно піднімаються й спускаються. Влітку важливі спека й нестача тіні. Візьміть воду, захист від сонця й відкрийте офіційну карту до виходу зі станції. Прогулянка берегом — окремий нижній варіант, якщо схили або спека не підходять.",
          ],
          [
            "Cully ist die einfachste Basis für den ersten Besuch, weil Bahnhof, Gastronomie und Ufer nah beieinanderliegen. Rivaz passt, wenn geometrische Rebterrassen und eine kürzere Route im Mittelpunkt stehen. Saint-Saphorin bietet Gassen, Steinhäuser und einen ruhigen Dorfabschluss. Richtung nach Höhenmetern und gewünschtem Zielbahnhof planen.",
            "Der Genfersee lässt die Landschaft horizontal wirken, doch Wege steigen und fallen wiederholt. Hitze und wenig Schatten zählen im Sommer. Wasser und Sonnenschutz mitnehmen, offizielle Karte vor dem Start öffnen. Ein Uferweg ist eine eigene tiefere Alternative, wenn Hangbedingungen oder Hitze nicht passen.",
          ]
        ),
      },
      {
        title: t("Use rail and boat as route tools", "Використовуйте потяг і корабель як частину маршруту", "Bahn und Schiff als Routenwerkzeuge nutzen"),
        paragraphs: list(
          [
            "Regional trains make a one-way walk practical: start at one village and return from another instead of retracing every climb. Boats can add a broad view back toward the terraces, but service is seasonal and less frequent than rail. Confirm the last useful departure before relying on a lake crossing.",
            "Lavaux pairs best with one nearby stop, not a chain of distant highlights. Vevey or Lausanne can extend a short vineyard walk; Château de Chillon needs its own transfer and enough time. If weather turns, keep the day inside the same rail corridor rather than replacing it with a cross-country backup.",
          ],
          [
            "Регіональні потяги роблять односторонню прогулянку зручною: почніть в одному селі й поверніться з іншого, не повторюючи кожен підйом. Корабель додає широкий вид на тераси з води, але ходить сезонно й рідше за потяг. Перевірте останнє практичне відправлення до того, як покладатися на переправу.",
            "Лаво найкраще поєднувати з однією сусідньою зупинкою, а не з ланцюгом далеких пам’яток. Vevey або Lausanne доповнять коротку прогулянку; Château de Chillon потребує окремого переїзду й достатнього часу. Якщо погода зміниться, залишайте запасний план у тому самому залізничному коридорі.",
          ],
          [
            "Regionalzüge machen eine Streckenwanderung praktisch: in einem Dorf starten und von einem anderen zurückfahren, statt jeden Anstieg zu wiederholen. Das Schiff zeigt die Terrassen vom Wasser, fährt aber saisonal und seltener als die Bahn. Letzte brauchbare Abfahrt prüfen, bevor die Überfahrt Teil des Plans wird.",
            "Lavaux lässt sich am besten mit einem nahen Stopp verbinden, nicht mit einer Kette entfernter Highlights. Vevey oder Lausanne ergänzen einen kurzen Rebweg; Schloss Chillon braucht eigenen Transfer und genug Zeit. Bei Wetterwechsel im selben Bahnkorridor bleiben, statt eine Alternative am anderen Ende des Landes zu wählen.",
          ]
        ),
      },
    ],
    options: [
      { title: t("Cully first visit", "Перше знайомство через Cully", "Erster Besuch ab Cully"), bestFor: t("Simple access and a flexible half-day", "Простий доступ і гнучкі пів дня", "Einfacher Zugang und flexibler Halbtag"), plan: t("Station, waterfront and one signed terrace loop", "Станція, набережна й одне марковане кільце", "Bahnhof, Ufer und eine markierte Terrassenrunde"), watch: t("Heat, shade and return train", "Спека, тінь і зворотний потяг", "Hitze, Schatten und Rückzug") },
      { title: t("Rivaz to Saint-Saphorin", "Rivaz — Saint-Saphorin", "Rivaz–Saint-Saphorin"), bestFor: t("Vineyard detail and village atmosphere", "Фактура виноградників і атмосфера села", "Rebdetails und Dorfatmosphäre"), plan: t("Walk one direction and return by regional train", "Пройдіть в один бік і поверніться регіональним потягом", "Eine Richtung gehen, mit Regionalzug zurück"), watch: t("Slope, working lanes and exact station access", "Схил, робочі проїзди й доступ до станції", "Steigung, Arbeitswege und Bahnhofszugang") },
      { title: t("Terraces plus lake", "Тераси плюс озеро", "Terrassen plus See"), bestFor: t("Full day with seasonal boat service", "Повний день із сезонним кораблем", "Ganzer Tag mit saisonalem Schiff"), plan: t("Short walk, village break and confirmed lake segment", "Коротка прогулянка, зупинка в селі й підтверджена ділянка кораблем", "Kurzer Weg, Dorfpause und bestätigte Schiffsstrecke"), watch: t("Boat season and last connection", "Сезон навігації й останнє сполучення", "Schiffssaison und letzte Verbindung") },
    ],
    checklist: list(
      ["Choose one start and one finish station", "Open the official path map", "Check heat, rain and visibility", "Confirm train or seasonal boat return", "Carry water and sun protection", "Stay on public paths through working vineyards"],
      ["Оберіть станції старту й фінішу", "Відкрийте офіційну карту стежки", "Перевірте спеку, дощ і видимість", "Підтвердьте повернення потягом або кораблем", "Візьміть воду й захист від сонця", "Залишайтеся на громадських стежках у діючих виноградниках"],
      ["Start- und Zielbahnhof wählen", "Offizielle Wegkarte öffnen", "Hitze, Regen und Sicht prüfen", "Rückfahrt per Zug oder Schiff bestätigen", "Wasser und Sonnenschutz mitnehmen", "Auf öffentlichen Wegen durch bewirtschaftete Reben bleiben"]
    ),
    faq: [
      { question: t("Can I see Lavaux in half a day?", "Чи можна побачити Лаво за пів дня?", "Kann ich Lavaux in einem halben Tag sehen?"), answer: t("Yes. Choose Cully, Rivaz or Saint-Saphorin and walk one defined section. A full day is useful only when adding another village, a longer path or a confirmed boat segment.", "Так. Оберіть Cully, Rivaz або Saint-Saphorin і пройдіть одну визначену ділянку. Повний день потрібен, якщо додаєте ще одне село, довший маршрут або підтверджену поїздку кораблем.", "Ja. Cully, Rivaz oder Saint-Saphorin wählen und einen klaren Abschnitt gehen. Ein ganzer Tag lohnt sich mit weiterem Dorf, längerem Weg oder bestätigter Schiffsstrecke.") },
      { question: t("Are Lavaux vineyards free to enter?", "Чи можна вільно заходити у виноградники Лаво?", "Sind die Lavaux-Rebberge frei zugänglich?"), answer: t("Public marked paths cross the landscape, but the vines and work lanes are private or operational space. Stay on signed routes, respect closures and do not enter vine rows for photographs.", "Громадські марковані стежки проходять через ландшафт, але лози й робочі проїзди є приватним або виробничим простором. Не сходьте з маршруту й не заходьте між рядами заради фото.", "Öffentliche markierte Wege queren die Landschaft, Reben und Arbeitsgassen sind jedoch Privat- oder Betriebsflächen. Auf signalisierten Routen bleiben und nicht für Fotos in Rebzeilen gehen.") },
      { question: t("Which Lavaux village is best for a first visit?", "Яке село Лаво найкраще для першого візиту?", "Welches Lavaux-Dorf passt zum ersten Besuch?"), answer: t("Cully offers the simplest mix of station, services and waterfront. Rivaz focuses on steep terraces; Saint-Saphorin adds the strongest compact village atmosphere. Best means matching the village to your route, not ranking the views.", "Cully дає найпростіше поєднання станції, сервісів і набережної. Rivaz — круті тераси, Saint-Saphorin — найвиразніша атмосфера компактного села. Обирайте під свій маршрут, а не за абстрактним рейтингом краєвидів.", "Cully verbindet Bahnhof, Infrastruktur und Ufer am einfachsten. Rivaz steht für steile Terrassen, Saint-Saphorin für kompakte Dorfatmosphäre. Die Wahl folgt der Route, nicht einer allgemeinen Aussichtsrangliste.") },
    ],
  },

  "lake-murten": {
    reviewedAt: "2026-09-07",
    sources: [
      { name: "Switzerland Tourism — Lake Murten", url: "https://www.myswitzerland.com/en-ch/destinations/lake-murten/" },
      { name: "Switzerland Tourism — Murten", url: "https://www.myswitzerland.com/en-ch/destinations/murten/" },
      { name: "Region Murtensee — official tourism", url: "https://fribourg.ch/en/regionmurtensee/" },
    ],
    lead: t(
      "Lake Murten works because three distinct experiences sit close together: Murten's old town and ring wall, the waterfront, and the vineyard landscape of Mont Vully. A half-day should stay around Murten. A full day can add one lake crossing or one Vully section, but seasonal boat service must be confirmed before it becomes the link between them.",
      "Озеро Муртен зручне тим, що поруч розташовані три різні враження: старе місто й міська стіна Муртена, набережна та виноградний ландшафт Мон-Вюллі. Пів дня варто провести навколо Муртена. За повний день можна додати одну переправу або одну ділянку Вюллі, але сезонний корабель потрібно підтвердити заздалегідь.",
      "Der Murtensee verbindet drei nahe Erlebnisse: Murtens Altstadt und Ringmauer, das Ufer und die Reblandschaft am Mont Vully. Ein Halbtag bleibt am besten in Murten. Ein ganzer Tag kann eine Schifffahrt oder einen Vully-Abschnitt ergänzen, doch der saisonale Fahrplan muss vorher bestätigt sein."
    ),
    sections: [
      {
        title: t("Start with Murten's compact old town", "Почніть із компактного старого міста Муртена", "Mit Murtens kompakter Altstadt beginnen"),
        paragraphs: list(
          [
            "Murten/Morat is a bilingual town whose historic centre sits a short walk from the railway station and lake. The ring wall offers a raised view over tiled roofs toward the water; arcaded streets, gates and the main lane make the centre easy to understand without a long itinerary.",
            "Use the wall and old town before the waterfront, when streets are quieter and light reaches the roofs from the lake side. Access to individual historic structures and museums can change, so check official opening information if an interior visit is essential. The outdoor route still works year-round.",
          ],
          [
            "Murten/Morat — двомовне місто, історичний центр якого лежить за коротку прогулянку від вокзалу й озера. З міської стіни видно черепичні дахи та воду; аркади, брами й головна вулиця допомагають зрозуміти місто без складного маршруту.",
            "Почніть зі стіни та старого міста, поки вулиці спокійніші, а світло падає на дахи з боку озера. Доступ до окремих історичних споруд і музеїв може змінюватися, тому перевірте години, якщо важливий інтер’єр. Зовнішній маршрут працює цілий рік.",
          ],
          [
            "Murten/Morat ist zweisprachig; Altstadt, Bahnhof und See liegen nah beieinander. Von der Ringmauer reicht der Blick über Ziegeldächer zum Wasser. Lauben, Tore und Hauptgasse machen das Zentrum ohne langen Ablauf verständlich.",
            "Ringmauer und Altstadt zuerst besuchen, wenn Gassen ruhiger sind und Licht vom See auf die Dächer fällt. Zugang zu historischen Bauten und Museen kann wechseln; Öffnungszeiten prüfen, wenn Innenräume wichtig sind. Die Aussenroute funktioniert ganzjährig.",
          ]
        ),
      },
      {
        title: t("Decide whether the lake is a view or a journey", "Вирішіть, озеро — це краєвид чи маршрут", "Entscheiden: See als Aussicht oder Reise"),
        paragraphs: list(
          [
            "For a simple visit, the promenade and harbour provide the lake without adding timetable risk. In warmer months, beaches and water sports expand the day. Treat swimming conditions, rental availability and local rules as live information rather than permanent page facts.",
            "A boat changes the perspective and can connect shores, but sailings are seasonal. Check the exact date, boarding point and final return before leaving the old town. If the service does not fit, keep the lake as a promenade stop and use rail or bus for the next segment.",
          ],
          [
            "Для простого візиту достатньо набережної й гавані: озеро буде частиною дня без ризику розкладу. У теплі місяці додаються пляжі та водні активності. Умови купання, прокат і місцеві правила перевіряйте як оперативну інформацію, а не як постійний факт сторінки.",
            "Корабель змінює ракурс і може сполучити береги, але рейси сезонні. Перевірте дату, причал і останнє повернення до виходу зі старого міста. Якщо розклад не підходить, залиште озеро прогулянкою й продовжуйте потягом або автобусом.",
          ],
          [
            "Für einen einfachen Besuch zeigen Promenade und Hafen den See ohne Fahrplanrisiko. In warmen Monaten kommen Badeplätze und Wassersport hinzu. Badebedingungen, Vermietung und lokale Regeln als Live-Information prüfen, nicht als dauerhafte Seitenangabe.",
            "Ein Schiff verändert die Perspektive und kann Ufer verbinden, fährt jedoch saisonal. Datum, Anlegestelle und letzte Rückfahrt vor dem Altstadtbesuch prüfen. Passt der Fahrplan nicht, bleibt der See Promenadenstopp; Weiterfahrt per Bahn oder Bus.",
          ]
        ),
      },
      {
        title: t("Add Mont Vully only with enough time", "Додавайте Мон-Вюллі лише із запасом часу", "Mont Vully nur mit genügend Zeit ergänzen"),
        paragraphs: list(
          [
            "Mont Vully rises between Lake Murten and Lake Neuchâtel. Vineyard villages and paths add a rural contrast to the walled town. Choose one viewpoint or one signed section instead of treating the whole hill as an extra stop. The journey there and back belongs in the plan.",
            "Cycling is useful around the lake only when distance, traffic confidence and return timing suit the group. Do not turn a compact city-and-lake day into an unplanned circuit. For most first visits, Murten plus one Vully village is enough; reserve a full circuit for a dedicated day.",
          ],
          [
            "Мон-Вюллі піднімається між озерами Муртен і Невшатель. Виноробні села та стежки створюють сільський контраст до міста зі стінами. Оберіть одну панораму або одну марковану ділянку, а не весь пагорб як додаткову зупинку. Дорога туди й назад є частиною плану.",
            "Велосипед навколо озера доречний, лише якщо дистанція, рух і час повернення підходять групі. Не перетворюйте компактний день у місті й біля води на незаплановане кільце. Для першої поїздки достатньо Муртена й одного села Вюллі; повне коло залиште на окремий день.",
          ],
          [
            "Der Mont Vully liegt zwischen Murten- und Neuenburgersee. Winzerdörfer und Wege bilden einen ländlichen Kontrast zur ummauerten Stadt. Einen Aussichtspunkt oder markierten Abschnitt wählen, nicht den ganzen Hügel als Zusatzstopp behandeln. Hin- und Rückweg gehören in den Plan.",
            "Eine Velorunde passt nur, wenn Distanz, Verkehrssicherheit und Rückkehrzeit zur Gruppe passen. Einen kompakten Stadt-und-See-Tag nicht ungeplant zum Rundkurs machen. Für den ersten Besuch reichen Murten und ein Vully-Dorf; die ganze Runde verdient einen eigenen Tag.",
          ]
        ),
      },
    ],
    options: [
      { title: t("Murten compact half-day", "Компактні пів дня в Муртені", "Kompakter Halbtag in Murten"), bestFor: t("First visits and year-round travel", "Перша поїздка й будь-який сезон", "Erster Besuch und ganzjährig"), plan: t("Station, ring wall, old town and promenade", "Вокзал, міська стіна, старе місто й набережна", "Bahnhof, Ringmauer, Altstadt und Promenade"), watch: t("Access to wall and interior opening hours", "Доступ на стіну й години роботи інтер’єрів", "Zugang zur Mauer und Innenöffnungszeiten") },
      { title: t("Old town plus boat", "Старе місто плюс корабель", "Altstadt plus Schiff"), bestFor: t("Warm-season full day", "Повний день у теплий сезон", "Ganzer Tag in warmer Saison"), plan: t("Morning old town, confirmed sailing, waterfront return", "Старе місто вранці, підтверджений рейс, повернення набережною", "Altstadt morgens, bestätigte Fahrt, Rückkehr am Ufer"), watch: t("Seasonal timetable and final connection", "Сезонний розклад і останнє сполучення", "Saisonfahrplan und letzte Verbindung") },
      { title: t("Murten and Mont Vully", "Муртен і Мон-Вюллі", "Murten und Mont Vully"), bestFor: t("Landscape, villages and a full day", "Ландшафт, села й повний день", "Landschaft, Dörfer und ganzer Tag"), plan: t("Old town plus one Vully village or viewpoint", "Старе місто плюс одне село чи панорама Вюллі", "Altstadt plus ein Vully-Dorf oder Aussichtspunkt"), watch: t("Transfer, heat and return timing", "Переїзд, спека й час повернення", "Transfer, Hitze und Rückkehrzeit") },
    ],
    checklist: list(
      ["Choose half-day Murten or full-day Vully", "Check ring-wall and museum access", "Confirm seasonal boat timetable", "Save return connection from the correct shore", "Check swimming or cycling conditions separately", "Keep one weather-proof old-town alternative"],
      ["Оберіть пів дня в Муртені або повний день із Вюллі", "Перевірте доступ на стіну й до музеїв", "Підтвердьте сезонний розклад кораблів", "Збережіть повернення з правильного берега", "Окремо перевірте умови купання чи веломаршруту", "Майте запасний маршрут старим містом на негоду"],
      ["Halbtag Murten oder ganzen Tag mit Vully wählen", "Zugang zu Ringmauer und Museen prüfen", "Saisonalen Schiffsfahrplan bestätigen", "Rückverbindung vom richtigen Ufer speichern", "Bade- oder Velobedingungen getrennt prüfen", "Wetterfeste Altstadt-Alternative behalten"]
    ),
    faq: [
      { question: t("How much time do I need at Lake Murten?", "Скільки часу потрібно на озеро Муртен?", "Wie viel Zeit brauche ich am Murtensee?"), answer: t("Half a day covers Murten's old town, ring wall and promenade. Use a full day for a confirmed boat trip, a beach or one Mont Vully section. Trying to add all three usually creates more transfers than useful time.", "Пів дня вистачить на старе місто, стіну й набережну Муртена. Повний день потрібен для підтвердженої поїздки кораблем, пляжу або однієї ділянки Мон-Вюллі. Усе разом дає забагато переїздів.", "Ein Halbtag reicht für Altstadt, Ringmauer und Promenade. Einen ganzen Tag für bestätigte Schifffahrt, Badeplatz oder einen Mont-Vully-Abschnitt nutzen. Alles zusammen erzeugt meist zu viele Transfers.") },
      { question: t("Can I visit Lake Murten without a car?", "Чи можна відвідати озеро Муртен без автомобіля?", "Kann ich den Murtensee ohne Auto besuchen?"), answer: t("Yes. Murten/Morat station is close to the historic centre and waterfront. Boat, bus or rail can extend the route, but confirm seasonal lake service and the return from the shore you choose.", "Так. Від станції Murten/Morat недалеко до історичного центру й набережної. Маршрут можна продовжити кораблем, автобусом або потягом, але перевірте сезонне сполучення й повернення з обраного берега.", "Ja. Bahnhof Murten/Morat liegt nahe bei Altstadt und Ufer. Schiff, Bus oder Bahn verlängern die Route; saisonalen Seeverkehr und Rückfahrt vom gewählten Ufer bestätigen.") },
      { question: t("Is Lake Murten only a summer destination?", "Озеро Муртен — лише літнє місце?", "Ist der Murtensee nur ein Sommerziel?"), answer: t("No. The old town and outdoor walking route work year-round. Summer adds swimming, water sports and more boat options. In colder months, build the day around the town and promenade rather than seasonal services.", "Ні. Старе місто й зовнішній пішохідний маршрут доступні цілий рік. Улітку додаються купання, водні активності й більше рейсів. У холодні місяці будуйте день навколо міста й набережної.", "Nein. Altstadt und Aussenroute funktionieren ganzjährig. Im Sommer kommen Baden, Wassersport und mehr Schiffe hinzu. In kälteren Monaten den Tag um Stadt und Promenade bauen.") },
    ],
  },

  "bern-old-town": {
    reviewedAt: "2026-09-07",
    sources: [
      { name: "UNESCO World Heritage Centre — Old City of Bern", url: "https://whc.unesco.org/en/list/267/" },
      { name: "Bern Welcome — Old City", url: "https://bern.com/en/explore/tourist-attractions/attractions/bern-s-old-city" },
      { name: "City of Bern", url: "https://www.bern.ch/en" },
    ],
    lead: t(
      "Bern Old Town is best understood as a walk through changing levels: the station and upper city, the arcades and civic centre, then the lower Aare edge. A first visit does not need a checklist of every fountain. Follow one continuous route, choose one elevated viewpoint and keep indoor stops as weather options.",
      "Старе місто Берна найкраще розкривається через різні рівні: вокзал і верхнє місто, аркади та громадський центр, потім нижній край біля Ааре. Для першого візиту не потрібен список кожного фонтану. Пройдіть один безперервний маршрут, оберіть одну верхню панораму, а інтер’єри залиште як варіант на негоду.",
      "Die Berner Altstadt erschliesst sich über Höhenstufen: Bahnhof und obere Stadt, Lauben und Zentrum, danach die tiefere Aarekante. Beim ersten Besuch braucht es keine Liste aller Brunnen. Eine durchgehende Route, einen erhöhten Aussichtspunkt und Innenräume als Wetteroption wählen."
    ),
    sections: [
      {
        title: t("Why Bern became a UNESCO city", "Чому Берн став містом UNESCO", "Warum Bern UNESCO-Stadt wurde"),
        paragraphs: list(
          [
            "UNESCO describes Bern as a medieval city founded in the 12th century on a hill encircled by the Aare. Its planning pattern, broad later streets, sandstone buildings and covered arcades survived while the capital continued to function as a modern city. Heritage here is urban structure, not one isolated monument.",
            "The six kilometres of arcades give the centre a distinct rhythm and make walking practical in rain or heat. Zytglogge, the Federal Palace, Münster and fountains become anchors along that structure. Look into courtyards and down toward the river instead of moving only between headline sights.",
          ],
          [
            "UNESCO описує Берн як середньовічне місто, засноване у XII столітті на пагорбі, оточеному Ааре. Планувальна структура, широкі пізніші вулиці, пісковикові будинки й криті аркади збереглися, поки столиця продовжувала жити як сучасне місто. Спадщина тут — у міській системі, а не в одній пам’ятці.",
            "Шість кілометрів аркад задають центру особливий ритм і роблять прогулянку зручною в дощ чи спеку. Zytglogge, Федеральний палац, Münster і фонтани стають орієнтирами вздовж цієї структури. Заглядайте у двори й униз до річки, а не рухайтеся лише між головними об’єктами.",
          ],
          [
            "UNESCO beschreibt Bern als mittelalterliche Stadt, die im 12. Jahrhundert auf einem von der Aare umschlossenen Hügel gegründet wurde. Planungsmuster, breitere spätere Strassen, Sandsteinbauten und gedeckte Lauben blieben erhalten, während die Hauptstadt modern weiterlebte. Das Erbe liegt in der Stadtstruktur, nicht in einem Einzelmonument.",
            "Sechs Kilometer Lauben geben dem Zentrum Rhythmus und machen Wege bei Regen oder Hitze praktisch. Zytglogge, Bundeshaus, Münster und Brunnen sind Anker in dieser Struktur. Auch Höfe und Blicke hinunter zur Aare beachten, statt nur Hauptsehenswürdigkeiten zu verbinden.",
          ]
        ),
      },
      {
        title: t("Walk from upper city to the Aare", "Пройдіть від верхнього міста до Ааре", "Von der oberen Stadt zur Aare gehen"),
        paragraphs: list(
          [
            "From the station, cross the upper old town toward the Federal Palace or continue through Marktgasse to Zytglogge. Münster terrace opens a clear view toward the Aare and the lower city. Nydegg and the bridge show why the river bend shaped Bern's form.",
            "Rosengarten gives the classic elevated overview and works either at the start, reached by local transport, or as the final climb. Do not force both Rosengarten and every river-level path into a short visit. Elevation changes add time, and a direct walk back to the station is longer than the map first suggests.",
          ],
          [
            "Від вокзалу пройдіть верхньою частиною до Федерального палацу або через Marktgasse до Zytglogge. Тераса Münster відкриває чіткий вид на Ааре й нижнє місто. Nydegg і міст показують, як вигин річки сформував Берн.",
            "Rosengarten дає класичну панораму згори й підходить або для старту з під’їздом локальним транспортом, або як фінальний підйом. Не намагайтеся додати і Rosengarten, і всі стежки біля води до короткого візиту. Перепади висоти забирають час, а повернення до вокзалу довше, ніж здається на карті.",
          ],
          [
            "Vom Bahnhof durch die obere Altstadt zum Bundeshaus oder über die Marktgasse zum Zytglogge gehen. Die Münsterplattform öffnet den Blick auf Aare und untere Stadt. Nydegg und Brücke zeigen, wie die Flussschlaufe Berns Form bestimmte.",
            "Der Rosengarten liefert den klassischen Überblick und passt entweder an den Anfang mit lokaler Anfahrt oder als Schlussanstieg. Bei kurzem Besuch nicht Rosengarten und alle Flusswege erzwingen. Höhenwechsel kosten Zeit; der direkte Rückweg zum Bahnhof ist länger, als die Karte zunächst wirkt.",
          ]
        ),
      },
      {
        title: t("Build a weather-proof city day", "Складіть міський день на будь-яку погоду", "Einen wetterfesten Stadttag bauen"),
        paragraphs: list(
          [
            "Arcades protect much of the central route, so rain does not cancel Bern. Add one museum or interior only after checking its current opening day and ticket rules. Cafés and shops under the arcades provide natural pauses without sending the route across the city.",
            "The Aare is part of Bern's identity but requires respect. River conditions and swimming safety change, and strong currents are not suitable for casual visitors. Treat a riverbank walk as the default; use official local guidance before considering swimming. In high water or ice, follow closures and keep away from exposed edges.",
          ],
          [
            "Аркади захищають значну частину центрального маршруту, тому дощ не скасовує Берн. Додайте один музей або інтер’єр лише після перевірки дня роботи й квитків. Кав’ярні та магазини під аркадами дають природні паузи без переїздів через усе місто.",
            "Ааре є частиною ідентичності Берна, але потребує поваги. Течія й умови купання змінюються, а сильна вода не підходить випадковим відвідувачам. За замовчуванням обирайте прогулянку берегом; перед купанням читайте офіційні місцеві правила. За високої води чи ожеледиці дотримуйтеся закриттів.",
          ],
          [
            "Die Lauben schützen einen grossen Teil der zentralen Route, deshalb fällt Bern bei Regen nicht aus. Einen Museums- oder Innenbesuch erst nach Prüfung von Öffnungstag und Ticketregeln ergänzen. Cafés und Läden unter den Lauben schaffen Pausen ohne Wege quer durch die Stadt.",
            "Die Aare gehört zu Bern, verlangt aber Respekt. Strömung und Schwimmbedingungen ändern sich; starke Strömung eignet sich nicht für spontane Gäste. Ein Uferweg ist der Standard, vor dem Schwimmen offizielle lokale Hinweise lesen. Bei Hochwasser oder Eis Sperrungen beachten und Abstand zu exponierten Kanten halten.",
          ]
        ),
      },
    ],
    options: [
      { title: t("Classic first visit", "Класичний перший візит", "Klassischer Erstbesuch"), bestFor: t("Half-day orientation", "Орієнтація за пів дня", "Orientierung in einem Halbtag"), plan: t("Station, Bundesplatz, Zytglogge, Münster and Nydegg", "Вокзал, Bundesplatz, Zytglogge, Münster і Nydegg", "Bahnhof, Bundesplatz, Zytglogge, Münster und Nydegg"), watch: t("Walking time back to station", "Час повернення до вокзалу", "Gehzeit zurück zum Bahnhof") },
      { title: t("Old town and panorama", "Старе місто й панорама", "Altstadt und Panorama"), bestFor: t("Photography and a full day", "Фото й повний день", "Fotografie und ganzer Tag"), plan: t("Core old town plus Rosengarten at one end", "Центр плюс Rosengarten на початку або в кінці", "Kernaltstadt plus Rosengarten an einem Ende"), watch: t("Elevation and sunset return", "Набір висоти й повернення після заходу", "Höhenmeter und Rückkehr nach Sonnenuntergang") },
      { title: t("Rain-safe Bern", "Берн на дощовий день", "Regensicheres Bern"), bestFor: t("Mixed weather and slower pace", "Мінлива погода й повільний темп", "Wechselwetter und ruhiges Tempo"), plan: t("Arcades, one booked interior and short river view", "Аркади, один підтверджений інтер’єр і короткий вид на річку", "Lauben, ein bestätigter Innenraum und kurzer Flussblick"), watch: t("Museum closing days", "Вихідні дні музеїв", "Museumsschliessungstage") },
    ],
    checklist: list(
      ["Choose upper-to-lower or lower-to-upper direction", "Save one elevated viewpoint", "Check one interior opening time", "Allow for elevation changes", "Use public transport if the final climb is too much", "Follow official Aare safety guidance"],
      ["Оберіть напрям згори вниз або знизу вгору", "Збережіть одну верхню оглядову точку", "Перевірте години одного інтер’єру", "Закладіть час на перепади висоти", "Скористайтеся транспортом, якщо фінальний підйом зайвий", "Дотримуйтеся офіційних правил безпеки на Ааре"],
      ["Richtung oben–unten oder unten–oben wählen", "Einen erhöhten Aussichtspunkt speichern", "Öffnungszeit eines Innenraums prüfen", "Zeit für Höhenwechsel einplanen", "Bei zu viel Schlussanstieg ÖV nutzen", "Offizielle Aare-Sicherheitshinweise beachten"]
    ),
    faq: [
      { question: t("How long do I need for Bern Old Town?", "Скільки часу потрібно на старе місто Берна?", "Wie lange brauche ich für die Berner Altstadt?"), answer: t("Three to four hours covers a clear station-to-Nydegg route with pauses. Use a full day for Rosengarten, a museum or a longer Aare walk. Do not count only map distance; arcades, viewpoints and elevation slow the route usefully.", "Три-чотири години вистачить на зрозумілий маршрут від вокзалу до Nydegg із паузами. Повний день потрібен для Rosengarten, музею чи довшої прогулянки вздовж Ааре. Враховуйте не лише відстань, а й панорами та перепади висоти.", "Drei bis vier Stunden reichen für eine klare Route vom Bahnhof nach Nydegg mit Pausen. Einen ganzen Tag für Rosengarten, Museum oder längeren Aareweg nutzen. Nicht nur Kartendistanz rechnen; Lauben, Aussicht und Höhenmeter verlangsamen sinnvoll.") },
      { question: t("Is Bern Old Town good in rain?", "Чи підходить Берн для дощового дня?", "Eignet sich Berns Altstadt bei Regen?"), answer: t("Yes. Around six kilometres of covered arcades protect much of the central route. Pair them with one confirmed museum or interior and shorten exposed river sections when conditions are poor.", "Так. Близько шести кілометрів критих аркад захищають значну частину центру. Додайте один підтверджений музей або інтер’єр і скоротіть відкриті ділянки біля річки за поганої погоди.", "Ja. Rund sechs Kilometer gedeckte Lauben schützen einen grossen Teil der zentralen Route. Mit einem bestätigten Museum oder Innenraum kombinieren und exponierte Flussabschnitte bei schlechtem Wetter kürzen.") },
      { question: t("Can I walk from Bern station to Rosengarten?", "Чи можна дійти від вокзалу Берна до Rosengarten?", "Kann ich vom Bahnhof Bern zum Rosengarten laufen?"), answer: t("Yes, through the full old town, but the final approach climbs. It works as a longer one-way city walk; local transport is useful when time, mobility or weather makes the climb impractical.", "Так, через усе старе місто, але фінальна ділянка йде вгору. Це хороший довгий односторонній маршрут; локальний транспорт допоможе, якщо бракує часу, сил або погода погана.", "Ja, durch die ganze Altstadt, doch der Schlussanstieg ist spürbar. Als längerer Stadtweg funktioniert es; bei wenig Zeit, eingeschränkter Mobilität oder schlechtem Wetter hilft der lokale Verkehr.") },
    ],
  },
};
