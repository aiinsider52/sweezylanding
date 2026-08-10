import type { Locale } from "../lib/i18n";
import type { TravelDestination } from "./travel-destinations";

type Editorial = {
  labels: { experience: string; route: string; routeIntro: string; prepare: string; prepareIntro: string; faq: string };
  experience: string;
  route: { number: string; title: string; text: string }[];
  preparation: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

const categoryName = {
  en: { mountains: "mountain landscape", lakes: "lake landscape", nature: "natural landscape", culture: "cultural landmark" },
  uk: { mountains: "гірський ландшафт", lakes: "озерний ландшафт", nature: "природний ландшафт", culture: "культурна пам’ятка" },
  de: { mountains: "Berglandschaft", lakes: "Seenlandschaft", nature: "Naturlandschaft", culture: "Kulturort" },
} as const;

export function buildDestinationEditorial(place: TravelDestination, locale: Locale): Editorial {
  const title = place.title[locale];
  const region = place.region[locale];
  const highlights = place.highlights[locale];
  const category = categoryName[locale][place.category];

  if (locale === "uk") return {
    labels: { experience: "Яким буде цей день", route: "Як побудувати маршрут", routeIntro: `Три послідовні кроки допоможуть побачити ${title} без зайвого поспіху й складної логістики.`, prepare: "Що варто знати до поїздки", prepareIntro: `Короткий план для поїздки в регіон ${region}: транспорт, час і умови краще перевірити до виїзду.`, faq: "Поширені запитання" },
    experience: `${title} — це ${category}, який варто сприймати не як коротку фотозупинку, а як окремий маршрут. Почніть із головної оглядової точки, залиште час на прогулянку та придивіться до деталей місцевості. ${place.whyVisit.uk} За ${place.duration.uk.toLowerCase()} можна побачити ключові місця без гонитви, якщо заздалегідь визначити напрям руху.`,
    route: [
      { number: "01", title: "Приїзд і перша панорама", text: `${place.arrival.uk}. Після прибуття зорієнтуйтеся на місці та почніть із «${highlights[0]}».` },
      { number: "02", title: "Головна частина маршруту", text: `Продовжуйте до «${highlights[1]}». Саме на цю частину варто закласти найбільше часу: темп тут важливіший за кількість зупинок.` },
      { number: "03", title: "Спокійне завершення", text: `Завершіть день біля «${highlights[2]}». Звідси зручно планувати повернення або наступну зупинку в регіоні.` },
    ],
    preparation: [
      { title: "Сезон і погода", text: `Найкращий орієнтир — ${place.season.uk.toLowerCase()}. Перевірте локальний прогноз, сезонний доступ і статус маршруту в день поїздки.` },
      { title: "Час і темп", text: `Плануйте приблизно ${place.duration.uk.toLowerCase()}. Додайте запас на пересадки, фото, черги та неспішну прогулянку.` },
      { title: "Практична деталь", text: `${place.tip.uk} Збережіть офлайн-карту й розклад зворотного транспорту, особливо поза містом.` },
    ],
    faq: [
      { question: `Коли найкраще їхати до ${title}?`, answer: `Основний рекомендований період: ${place.season.uk}. Перед виїздом перевірте погоду, сезонний доступ і години роботи транспорту.` },
      { question: `Скільки часу потрібно на ${title}?`, answer: `Орієнтир — ${place.duration.uk}. Для спокійної поїздки додайте резерв на пересадки та оглядові точки.` },
      { question: "Як дістатися громадським транспортом?", answer: `${place.arrival.uk}. Перевірте актуальний розклад у день подорожі, особливо ввечері та у вихідні.` },
      { question: "Що подивитися в першу чергу?", answer: `Почніть із «${highlights[0]}», потім переходьте до «${highlights[1]}» і завершіть біля «${highlights[2]}».` },
    ],
  };

  if (locale === "de") return {
    labels: { experience: "So fühlt sich der Tag an", route: "Route planen", routeIntro: `Drei klare Etappen machen ${title} ohne unnötige Hektik erlebbar.`, prepare: "Vor der Reise wissen", prepareIntro: `Kompakte Planung für ${region}: Verkehr, Zeit und Bedingungen vor Abfahrt prüfen.`, faq: "Häufige Fragen" },
    experience: `${title} ist eine ${category}, die mehr als einen kurzen Fotostopp verdient. Mit Aussicht, Spaziergang und Zeit für Details entsteht ein vollständiger Ausflug. ${place.whyVisit.de} In ${place.duration.de.toLowerCase()} lassen sich die wichtigsten Stationen ruhig verbinden.`,
    route: [
      { number: "01", title: "Ankommen und orientieren", text: `${place.arrival.de}. Zuerst bei „${highlights[0]}“ orientieren und den weiteren Weg prüfen.` },
      { number: "02", title: "Haupterlebnis", text: `Danach zu „${highlights[1]}“ weitergehen. Für diesen Abschnitt am meisten Zeit einplanen.` },
      { number: "03", title: "Ruhiger Abschluss", text: `Den Besuch bei „${highlights[2]}“ beenden. Von hier Rückfahrt oder nächste Station rechtzeitig planen.` },
    ],
    preparation: [
      { title: "Saison und Wetter", text: `Gute Reisezeit: ${place.season.de}. Lokale Prognose, Wegstatus und saisonale Öffnung am Reisetag prüfen.` },
      { title: "Zeit und Tempo", text: `Richtwert: ${place.duration.de}. Reserve für Umstiege, Aussichtspausen und Wartezeiten einplanen.` },
      { title: "Praktischer Hinweis", text: `${place.tip.de} Offline-Karte und letzte Rückverbindung speichern.` },
    ],
    faq: [
      { question: `Wann ist die beste Reisezeit für ${title}?`, answer: `Empfohlener Zeitraum: ${place.season.de}. Wetter, Zugang und Fahrplan kurz vor Abfahrt kontrollieren.` },
      { question: `Wie viel Zeit braucht ${title}?`, answer: `Als Richtwert gelten ${place.duration.de}. Zusätzliche Zeit für Umstiege und Aussichtspunkte lassen.` },
      { question: "Wie erfolgt die Anreise mit öffentlichen Verkehrsmitteln?", answer: `${place.arrival.de}. Aktuelle Verbindungen am Reisetag prüfen.` },
      { question: "Was sollte man zuerst sehen?", answer: `Mit „${highlights[0]}“ beginnen, danach „${highlights[1]}“ besuchen und bei „${highlights[2]}“ abschliessen.` },
    ],
  };

  return {
    labels: { experience: "What the day feels like", route: "How to shape the route", routeIntro: `Three clear stages make ${title} easy to experience without turning the visit into a race.`, prepare: "Know before you go", prepareIntro: `A compact plan for ${region}: check transport, timing and local conditions before leaving.`, faq: "Frequently asked questions" },
    experience: `${title} is a ${category} worth treating as a journey rather than a quick photo stop. Begin with the main viewpoint, leave room for a walk and notice the character of the place. ${place.whyVisit.en} In ${place.duration.en.toLowerCase()}, essential stops fit comfortably when direction is clear.`,
    route: [
      { number: "01", title: "Arrive and find the view", text: `${place.arrival.en}. Get oriented at “${highlights[0]}” before taking the longest section.` },
      { number: "02", title: "Take the main route", text: `Continue toward “${highlights[1]}”. Give this stage most of the visit and favour a calm pace.` },
      { number: "03", title: "End without rushing", text: `Finish near “${highlights[2]}”. Leave enough time for the return connection or next regional stop.` },
    ],
    preparation: [
      { title: "Season and weather", text: `Best general window: ${place.season.en.toLowerCase()}. Check local forecast, route status and seasonal opening on travel day.` },
      { title: "Time and pace", text: `Allow around ${place.duration.en.toLowerCase()}. Add a buffer for transfers, viewpoints, queues and an unhurried walk.` },
      { title: "Practical detail", text: `${place.tip.en} Save an offline map and final return connection.` },
    ],
    faq: [
      { question: `When is the best time to visit ${title}?`, answer: `Main recommended period: ${place.season.en}. Check weather, access and transport hours shortly before departure.` },
      { question: `How much time does ${title} need?`, answer: `Use ${place.duration.en} as a working estimate, plus time for transfers and viewpoint stops.` },
      { question: "How do I reach it by public transport?", answer: `${place.arrival.en}. Recheck live connections on the day.` },
      { question: "What should I see first?", answer: `Start with “${highlights[0]}”, continue to “${highlights[1]}”, then finish around “${highlights[2]}”.` },
    ],
  };
}
