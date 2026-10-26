import { SWEEZY_COMPANION } from "./companion";
import type { Locale } from "../lib/i18n";
import { destinationImage, travelDestinations } from "./travel-destinations";

export const TRAVEL_KIT_SLUGS = ["oeschinen-lake", "rhine-falls", "mount-rigi", "lavaux-vineyards", "aletsch-glacier", "creux-du-van", "bern-old-town", "st-gallen-abbey"] as const;

const SOURCES: Record<string, { name: string; url: string }> = {
  "oeschinen-lake": { name: "Oeschinensee", url: "https://www.oeschinensee.ch/en/" },
  "rhine-falls": { name: "Rheinfall", url: "https://rheinfall.ch/en/" },
  "mount-rigi": { name: "Rigi", url: "https://www.rigi.ch/en" },
  "lavaux-vineyards": { name: "Switzerland Tourism", url: "https://www.myswitzerland.com/en-ch/destinations/lavaux-vineyard-terraces/" },
  "aletsch-glacier": { name: "Aletsch Arena", url: "https://www.aletscharena.ch/en" },
  "creux-du-van": { name: "Jura & Trois-Lacs", url: "https://www.j3l.ch/fr/Z10813/" },
  "bern-old-town": { name: "UNESCO", url: "https://whc.unesco.org/en/list/267/" },
  "st-gallen-abbey": { name: "St.Gallen-Bodensee Tourismus", url: "https://st.gallen-bodensee.ch/en/discover/history-and-culture/unesco-world-cultural-heritage-site.html" },
};

export const travelKitCopy = {
  uk: {
    badge: "БЕЗКОШТОВНИЙ МІНІГІД · SWEEZY", title: "Швейцарія, яку варто побачити.",
    intro: "Бірюзові озера, гори, водоспади й міста з історією. Зібрали 8 місць для вашого списку мрій — із сезонами, ідеями для поїздки та гідами.",
    download: "Забрати PDF", open: "Обрати свої місця", free: "Безкоштовно", pages: "10 сторінок", noSignup: "Без реєстрації", destinations: "місць для вашого списку", guide: SWEEZY_COMPANION.introduction.uk, guideNote: "Наступна пригода починається з одного місця.",
    listTitle: "Куди хочеться поїхати?", listBody: "Позначайте місця, які хочете побачити. Відкривайте гід, щоб перевірити дорогу й спланувати день.",
    selected: "у вашому списку", select: "Хочу побачити", reset: "Очистити список", saved: "Ваш список зберігається в цьому браузері.", unavailable: "Позначки діють до закриття сторінки: збереження в браузері недоступне.",
    season: "Орієнтир сезону", duration: "На поїздку", read: "Гід і маршрут", official: "Перевірити актуальний доступ", sources: "Першоджерела", note: "Це добірка для різних поїздок, а не маршрут на один день. Сезон і час — орієнтири; перед виїздом перевірте погоду, стан стежок, роботу транспорту та доступ до місця на офіційному сайті.",
    planner: "З ідеї — у справжню поїздку.", plannerBody: "Оберіть одне місце й підготуйте день. Решта може зачекати на наступні вихідні.",
    tasks: ["Обрати місце й дату", "Перевірити погоду та актуальний доступ", "Погодити маршрут і зворотний транспорт", "Перевірити квитки та бронювання", "Підготувати воду, одяг і заряд телефону", "Зберегти карту та запасний план"],
    myTrip: "Моя наступна поїздка", date: "Дата", budget: "Бюджет", notes: "Нотатки", all: "Усі місця Швейцарії", firstWeek: "Щойно переїхали? Відкрити чеклист перших 7 днів", reviewed: "Джерела звірено 23.10.2026", nextFour: "Ще чотири причини вирушити в дорогу.", online: "Відкрити інтерактивний список", pdfLink: "Відкрити гід", sourceLabel: "Актуальні умови — у першоджерелах", pdfIntro: "8 ідей для різних поїздок: фотографії, сезонність, тривалість і посилання на детальні гіди.",
  },
  en: {
    badge: "FREE MINI GUIDE · SWEEZY", title: "Switzerland, worth stepping out for.",
    intro: "Turquoise lakes, mountain views, waterfalls and historic towns. Eight places for your wish list, with seasonal pointers, trip ideas and practical guides.",
    download: "Get the PDF", open: "Pick your places", free: "Free", pages: "10 pages", noSignup: "No signup", destinations: "places for your wish list", guide: SWEEZY_COMPANION.introduction.en, guideNote: "Your next adventure starts with one place.",
    listTitle: "Where would you love to go?", listBody: "Tick the places you want to see. Open a guide to check the journey and plan your day.",
    selected: "on your wish list", select: "Want to visit", reset: "Clear my list", saved: "Your list stays in this browser.", unavailable: "Browser storage is unavailable. Your choices last until you close this page.",
    season: "Seasonal pointer", duration: "Allow for the visit", read: "Guide and route", official: "Check current access", sources: "Primary sources", note: "These are ideas for separate trips, not a one-day itinerary. Seasons and visit times are pointers. Check weather, trails, transport and destination access on the official website before leaving.",
    planner: "Turn a saved idea into a day out.", plannerBody: "Choose one place and prepare your day. The others can wait for another weekend.",
    tasks: ["Choose a destination and date", "Check weather and current access", "Plan the journey and return transport", "Check tickets and reservations", "Pack water, suitable clothing and a charged phone", "Save your map and a backup plan"],
    myTrip: "My next day out", date: "Date", budget: "Budget", notes: "Notes", all: "Explore all Swiss places", firstWeek: "Just moved? Open your first-week checklist", reviewed: "Sources checked 23 October 2026", nextFour: "Four more reasons to head out.", online: "Open your interactive wish list", pdfLink: "Open the guide", sourceLabel: "Current conditions: check the primary sources", pdfIntro: "Eight ideas for separate trips, with photographs, seasons, visit lengths and links to detailed guides.",
  },
  de: {
    badge: "KOSTENLOSER MINI-GUIDE · SWEEZY", title: "Die Schweiz, die Sie sehen möchten.",
    intro: "Türkise Seen, Bergpanoramen, Wasserfälle und historische Städte. Acht Orte für Ihre Wunschliste, mit saisonalen Hinweisen, Ausflugsideen und praktischen Guides.",
    download: "PDF mitnehmen", open: "Lieblingsorte auswählen", free: "Kostenlos", pages: "10 Seiten", noSignup: "Ohne Anmeldung", destinations: "Orte für Ihre Wunschliste", guide: SWEEZY_COMPANION.introduction.de, guideNote: "Das nächste Abenteuer beginnt mit einem Ort.",
    listTitle: "Wohin möchten Sie als Nächstes?", listBody: "Markieren Sie Ihre Wunschziele. Im Guide finden Sie Hinweise zur Anreise und zur Planung Ihres Tages.",
    selected: "auf Ihrer Wunschliste", select: "Möchte ich besuchen", reset: "Liste leeren", saved: "Ihre Liste wird in diesem Browser gespeichert.", unavailable: "Der Browserspeicher ist nicht verfügbar. Ihre Auswahl bleibt bis zum Schliessen der Seite erhalten.",
    season: "Saisonaler Hinweis", duration: "Zeit für den Besuch", read: "Guide und Anreise", official: "Aktuellen Zugang prüfen", sources: "Primärquellen", note: "Die Orte sind Ideen für einzelne Ausflüge, keine Tagesroute. Saison und Besuchsdauer dienen zur Orientierung. Prüfen Sie vor der Abreise Wetter, Wege, Transport und Zugang auf der offiziellen Website.",
    planner: "Aus einer Idee wird ein Ausflug.", plannerBody: "Wählen Sie einen Ort und planen Sie Ihren Tag. Die übrigen Ziele warten auf das nächste Wochenende.",
    tasks: ["Ziel und Datum auswählen", "Wetter und aktuellen Zugang prüfen", "Hin- und Rückreise planen", "Tickets und Reservierungen prüfen", "Wasser, passende Kleidung und geladenes Handy einpacken", "Karte und Alternativplan speichern"],
    myTrip: "Mein nächster Ausflug", date: "Datum", budget: "Budget", notes: "Notizen", all: "Alle Orte in der Schweiz", firstWeek: "Gerade angekommen? Zur Checkliste für die erste Woche", reviewed: "Quellen geprüft am 23.10.2026", nextFour: "Vier weitere Gründe, loszuziehen.", online: "Interaktive Wunschliste öffnen", pdfLink: "Zum Guide", sourceLabel: "Aktuelle Bedingungen bei den Primärquellen prüfen", pdfIntro: "Acht Ausflugsideen mit Fotos, Reisezeiten, Aufenthaltsdauer und Links zu ausführlichen Guides.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

export function getTravelKitPlaces(locale: Locale) {
  return TRAVEL_KIT_SLUGS.map((slug) => {
    const place = travelDestinations.find((item) => item.slug === slug);
    if (!place) throw new Error(`Travel kit destination missing: ${slug}`);
    return { slug, title: place.title[locale], region: place.region[locale], summary: place.summary[locale], description: place.description[locale], arrival: place.arrival[locale], tip: place.tip[locale], season: place.season[locale], duration: place.duration[locale], image: destinationImage(place), alt: place.alt[locale][0], href: `/${locale}/places/${slug}`, source: SOURCES[slug] };
  });
}

export function travelKitPdf(locale: Locale) { return `/downloads/sweezy-travel-kit-${locale}.pdf`; }
