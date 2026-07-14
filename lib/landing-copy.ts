import type { Locale } from "./i18n";

export type ShowcaseMode = {
  id: "path" | "work" | "market" | "profile";
  label: string;
  title: string;
  description: string;
  images: readonly string[];
};

export type LandingCopy = {
  nav: {
    product: string;
    method: string;
    stories: string;
    faq: string;
    guides: string;
    blog: string;
    app: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    footnote: string;
  };
  proof: Array<{ value: string; label: string }>;
  product: {
    eyebrow: string;
    title: string;
    body: string;
    modes: ShowcaseMode[];
  };
  value: {
    eyebrow: string;
    title: string;
    items: Array<{ tag: string; title: string; body: string }>;
  };
  method: {
    eyebrow: string;
    title: string;
    steps: Array<{ title: string; body: string }>;
  };
  stories: {
    eyebrow: string;
    title: string;
    items: Array<{ quote: string; name: string; role: string; image: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    button: string;
    note: string;
  };
  footer: {
    line: string;
    product: string;
    resources: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    support: string;
  };
};

const sharedImages = {
  path: [
    "/app-frames/path-journey.png",
    "/app-frames/path-first-30-days.png",
    "/app-frames/path-permit-checklist.png",
    "/app-frames/path-city-hub.png",
  ],
  work: [
    "/app-frames/work-ai-match.png",
    "/app-frames/work-experience.png",
    "/app-frames/work-landlord-letter.png",
    "/app-frames/work-support-calculator.png",
  ],
  market: [
    "/app-frames/market-relocation-service.png",
    "/app-frames/market-community-event.png",
    "/app-frames/market-new-listing.png",
    "/app-frames/market-expert.png",
  ],
  profile: [
    "/app-frames/profile-settings.png",
    "/app-frames/profile-situation.png",
    "/app-frames/profile-passport.png",
    "/app-frames/profile-access.png",
  ],
} as const;

export const landingCopy: Record<Locale, LandingCopy> = {
  en: {
    nav: {
      product: "Inside Sweezy",
      method: "How it works",
      stories: "Stories",
      faq: "FAQ",
      guides: "Guides",
      blog: "Blog",
      app: "Get the app",
      menu: "Open menu",
      close: "Close menu",
    },
    hero: {
      eyebrow: "Swiss life, in one clear system",
      title: "Your next step in Switzerland.",
      accent: "Already mapped.",
      body:
        "Permits, documents, work, local services and community — Sweezy turns a complicated move into a path you can follow.",
      primary: "Download for iPhone",
      secondary: "See how it works",
      footnote: "Available in English, Ukrainian and German",
    },
    proof: [
      { value: "50+", label: "practical guides" },
      { value: "26", label: "cantons covered" },
      { value: "3", label: "complete languages" },
      { value: "iOS", label: "built for your pocket" },
    ],
    product: {
      eyebrow: "One product, four parts of the move",
      title: "Not another folder of links. A working system.",
      body:
        "Sweezy shows what matters now, what comes next and where to act — without making Swiss bureaucracy feel bigger than it is.",
      modes: [
        {
          id: "path",
          label: "Path & knowledge",
          title: "A route through the move",
          description: "Clear steps, checklists and local guidance shaped around your situation.",
          images: sharedImages.path,
        },
        {
          id: "work",
          label: "Work & documents",
          title: "Documents that get you moving",
          description: "Swiss-style CV tools, practical templates and calculators for real decisions.",
          images: sharedImages.work,
        },
        {
          id: "market",
          label: "Market & community",
          title: "People and services nearby",
          description: "Find trusted help, local events and community answers without starting from zero.",
          images: sharedImages.market,
        },
        {
          id: "profile",
          label: "Profile & access",
          title: "Progress that stays yours",
          description: "Your situation, saved progress and next actions in one personal space.",
          images: sharedImages.profile,
        },
      ],
    },
    value: {
      eyebrow: "Built around real relocation work",
      title: "Less searching. More finished tasks.",
      items: [
        { tag: "PATH", title: "Know what comes next", body: "A personal sequence keeps deadlines, documents and decisions in the right order." },
        { tag: "LOCAL", title: "Act where you live", body: "Canton-aware guidance makes broad advice useful in your municipality." },
        { tag: "WORK", title: "Prepare for Swiss hiring", body: "Build a local CV and use focused tools instead of generic career templates." },
        { tag: "PEOPLE", title: "Find trusted help", body: "Services and community activity sit next to the task that created the need." },
      ],
    },
    method: {
      eyebrow: "Start in minutes",
      title: "Three moves. Then Sweezy does the sorting.",
      steps: [
        { title: "Tell us your situation", body: "Choose canton, permit, language and the stage of your move." },
        { title: "Open your route", body: "Sweezy turns those answers into relevant steps, tools and local guidance." },
        { title: "Move forward", body: "Complete tasks, save progress and return exactly where you left off." },
      ],
    },
    stories: {
      eyebrow: "From first users",
      title: "Designed for the moment everything feels unfamiliar.",
      items: [
        { quote: "The permit guide gave me a sequence, not another article. That changed everything.", name: "Maria K.", role: "Moved to Zürich", image: "/images/testimonial-olena.jpg" },
        { quote: "I found the right office and understood what to bring before I went there.", name: "Thomas M.", role: "Moved to Basel", image: "/images/testimonial-marco.jpg" },
        { quote: "The checklist made the first month feel manageable instead of chaotic.", name: "Sarah L.", role: "Moved to Geneva", image: "/images/testimonial-sarah.jpg" },
      ],
    },
    faq: {
      eyebrow: "Before you download",
      title: "Useful answers. No fine print.",
      items: [
        { question: "Who is Sweezy for?", answer: "Newcomers, expats and Ukrainians building a life in Switzerland — from first paperwork to work, housing and local services." },
        { question: "Is the app free?", answer: "You can start with Sweezy for free. Any paid additions are shown clearly inside the app before you choose them." },
        { question: "Which languages are available?", answer: "English, Ukrainian and German are supported across the core product experience." },
        { question: "Does guidance change by canton?", answer: "Yes. Sweezy connects national guidance with canton and municipality context whenever local rules matter." },
        { question: "Is Sweezy available on Android?", answer: "Sweezy is currently available for iPhone. Android is not available yet." },
      ],
    },
    cta: {
      eyebrow: "Your route can start today",
      title: "Switzerland is complex. Your next step should not be.",
      body: "Download Sweezy and turn the move into work you can actually finish.",
      button: "Get Sweezy on the App Store",
      note: "iPhone · EN / UA / DE",
    },
    footer: {
      line: "A practical system for life in Switzerland.",
      product: "Product",
      resources: "Resources",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      support: "Support",
    },
  },
  uk: {
    nav: {
      product: "Всередині Sweezy",
      method: "Як це працює",
      stories: "Історії",
      faq: "FAQ",
      guides: "Гіди",
      blog: "Блог",
      app: "Завантажити",
      menu: "Відкрити меню",
      close: "Закрити меню",
    },
    hero: {
      eyebrow: "Життя у Швейцарії — в одній зрозумілій системі",
      title: "Ваш наступний крок у Швейцарії.",
      accent: "Уже визначено.",
      body:
        "Дозволи, документи, робота, локальні сервіси й спільнота — Sweezy перетворює складний переїзд на маршрут, яким легко рухатися.",
      primary: "Завантажити для iPhone",
      secondary: "Подивитися, як працює",
      footnote: "Українська, English та Deutsch",
    },
    proof: [
      { value: "50+", label: "практичних гайдів" },
      { value: "26", label: "кантонів" },
      { value: "3", label: "повні мови" },
      { value: "iOS", label: "завжди під рукою" },
    ],
    product: {
      eyebrow: "Один продукт для чотирьох частин переїзду",
      title: "Не ще одна папка з посиланнями. Робоча система.",
      body:
        "Sweezy показує, що важливо зараз, що буде далі й де діяти — без відчуття, що швейцарська бюрократія ще складніша.",
      modes: [
        { id: "path", label: "Шлях і знання", title: "Маршрут крізь переїзд", description: "Чіткі кроки, чеклісти й локальні підказки під вашу ситуацію.", images: sharedImages.path },
        { id: "work", label: "Робота й документи", title: "Документи, що рухають уперед", description: "Швейцарський CV, практичні шаблони й калькулятори для реальних рішень.", images: sharedImages.work },
        { id: "market", label: "Маркет і спільнота", title: "Люди та сервіси поруч", description: "Перевірена допомога, локальні події й відповіді спільноти без старту з нуля.", images: sharedImages.market },
        { id: "profile", label: "Профіль і доступ", title: "Прогрес, який залишається з вами", description: "Ваша ситуація, виконані кроки й наступні дії в одному просторі.", images: sharedImages.profile },
      ],
    },
    value: {
      eyebrow: "Створено навколо реальних справ",
      title: "Менше пошуку. Більше завершених кроків.",
      items: [
        { tag: "ШЛЯХ", title: "Знайте, що далі", body: "Персональна послідовність тримає дедлайни, документи й рішення у правильному порядку." },
        { tag: "ЛОКАЛЬНО", title: "Дійте там, де живете", body: "Поради з урахуванням кантону працюють у вашій громаді, а не лише в теорії." },
        { tag: "РОБОТА", title: "Готуйтеся до найму", body: "Створюйте локальний CV й користуйтеся точними інструментами замість загальних шаблонів." },
        { tag: "ЛЮДИ", title: "Знаходьте перевірену допомогу", body: "Сервіси та спільнота з’являються поруч із завданням, яке створило потребу." },
      ],
    },
    method: {
      eyebrow: "Старт за кілька хвилин",
      title: "Три дії. Далі Sweezy усе впорядкує.",
      steps: [
        { title: "Розкажіть про ситуацію", body: "Оберіть кантон, дозвіл, мову й етап переїзду." },
        { title: "Відкрийте свій маршрут", body: "Sweezy перетворить відповіді на релевантні кроки, інструменти й локальні поради." },
        { title: "Рухайтеся вперед", body: "Виконуйте завдання, зберігайте прогрес і повертайтеся саме туди, де зупинилися." },
      ],
    },
    stories: {
      eyebrow: "Від перших користувачів",
      title: "Для моменту, коли навколо все незнайоме.",
      items: [
        { quote: "Гайд про дозвіл дав мені послідовність, а не ще одну статтю. Це змінило все.", name: "Марія К.", role: "Переїхала до Цюриха", image: "/images/testimonial-olena.jpg" },
        { quote: "Я знайшов потрібну установу й заздалегідь зрозумів, що взяти із собою.", name: "Томас М.", role: "Переїхав до Базеля", image: "/images/testimonial-marco.jpg" },
        { quote: "Чекліст зробив перший місяць керованим замість хаотичного.", name: "Сара Л.", role: "Переїхала до Женеви", image: "/images/testimonial-sarah.jpg" },
      ],
    },
    faq: {
      eyebrow: "Перед завантаженням",
      title: "Корисні відповіді. Без дрібного шрифту.",
      items: [
        { question: "Для кого Sweezy?", answer: "Для новоприбулих, експатів та українців, які будують життя у Швейцарії — від перших документів до роботи, житла й локальних сервісів." },
        { question: "Застосунок безкоштовний?", answer: "Почати користуватися Sweezy можна безкоштовно. Платні можливості, якщо вони потрібні, показуються до підтвердження." },
        { question: "Які мови доступні?", answer: "Основний досвід Sweezy доступний українською, англійською та німецькою." },
        { question: "Поради відрізняються за кантонами?", answer: "Так. Sweezy поєднує загальношвейцарські правила з контекстом кантону й громади, коли це важливо." },
        { question: "Чи є Sweezy на Android?", answer: "Зараз Sweezy доступний для iPhone. Версії для Android поки немає." },
      ],
    },
    cta: {
      eyebrow: "Ваш маршрут може початися сьогодні",
      title: "Швейцарія складна. Наступний крок не має бути складним.",
      body: "Завантажте Sweezy й перетворіть переїзд на справи, які можна завершити.",
      button: "Завантажити Sweezy в App Store",
      note: "iPhone · UA / EN / DE",
    },
    footer: {
      line: "Практична система для життя у Швейцарії.",
      product: "Продукт",
      resources: "Ресурси",
      legal: "Правові документи",
      privacy: "Конфіденційність",
      terms: "Умови",
      cookies: "Cookies",
      support: "Підтримка",
    },
  },
  de: {
    nav: {
      product: "Sweezy entdecken",
      method: "So funktioniert es",
      stories: "Erfahrungen",
      faq: "FAQ",
      guides: "Guides",
      blog: "Blog",
      app: "App laden",
      menu: "Menü öffnen",
      close: "Menü schließen",
    },
    hero: {
      eyebrow: "Das Leben in der Schweiz — in einem klaren System",
      title: "Ihr nächster Schritt in der Schweiz.",
      accent: "Bereits sortiert.",
      body:
        "Bewilligungen, Dokumente, Arbeit, lokale Services und Community — Sweezy macht aus einem komplexen Umzug einen Weg, dem Sie folgen können.",
      primary: "Für iPhone laden",
      secondary: "So funktioniert es",
      footnote: "Deutsch, English und Ukrainisch",
    },
    proof: [
      { value: "50+", label: "praktische Guides" },
      { value: "26", label: "Kantone" },
      { value: "3", label: "vollständige Sprachen" },
      { value: "iOS", label: "immer griffbereit" },
    ],
    product: {
      eyebrow: "Ein Produkt für vier Seiten des Umzugs",
      title: "Kein weiterer Ordner voller Links. Ein Arbeitssystem.",
      body:
        "Sweezy zeigt, was jetzt zählt, was danach kommt und wo Sie handeln — ohne die Schweizer Bürokratie noch größer wirken zu lassen.",
      modes: [
        { id: "path", label: "Weg & Wissen", title: "Ein Weg durch den Umzug", description: "Klare Schritte, Checklisten und lokale Hinweise für Ihre Situation.", images: sharedImages.path },
        { id: "work", label: "Arbeit & Dokumente", title: "Dokumente, die weiterbringen", description: "Schweizer Lebenslauf, praktische Vorlagen und Rechner für echte Entscheidungen.", images: sharedImages.work },
        { id: "market", label: "Markt & Community", title: "Menschen und Services in der Nähe", description: "Vertrauenswürdige Hilfe, lokale Events und Antworten der Community.", images: sharedImages.market },
        { id: "profile", label: "Profil & Zugang", title: "Fortschritt, der Ihnen gehört", description: "Ihre Situation, erledigte Schritte und nächste Aktionen an einem Ort.", images: sharedImages.profile },
      ],
    },
    value: {
      eyebrow: "Für echte Relocation-Aufgaben gebaut",
      title: "Weniger suchen. Mehr erledigen.",
      items: [
        { tag: "WEG", title: "Wissen, was danach kommt", body: "Eine persönliche Reihenfolge hält Fristen, Dokumente und Entscheidungen richtig sortiert." },
        { tag: "LOKAL", title: "Dort handeln, wo Sie leben", body: "Kantonsbezogene Hinweise machen allgemeine Regeln in Ihrer Gemeinde nutzbar." },
        { tag: "ARBEIT", title: "Für den Schweizer Markt", body: "Erstellen Sie einen lokalen Lebenslauf und nutzen Sie gezielte Werkzeuge statt allgemeiner Vorlagen." },
        { tag: "MENSCHEN", title: "Vertrauenswürdige Hilfe finden", body: "Services und Community-Aktivität stehen neben der Aufgabe, die den Bedarf ausgelöst hat." },
      ],
    },
    method: {
      eyebrow: "In wenigen Minuten starten",
      title: "Drei Angaben. Danach sortiert Sweezy.",
      steps: [
        { title: "Situation angeben", body: "Wählen Sie Kanton, Bewilligung, Sprache und Phase des Umzugs." },
        { title: "Persönlichen Weg öffnen", body: "Sweezy macht daraus relevante Schritte, Werkzeuge und lokale Hinweise." },
        { title: "Weiterkommen", body: "Aufgaben erledigen, Fortschritt speichern und genau dort weitermachen." },
      ],
    },
    stories: {
      eyebrow: "Von ersten Nutzern",
      title: "Für den Moment, in dem alles neu wirkt.",
      items: [
        { quote: "Der Bewilligungs-Guide gab mir eine Reihenfolge statt eines weiteren Artikels.", name: "Maria K.", role: "Nach Zürich gezogen", image: "/images/testimonial-olena.jpg" },
        { quote: "Ich fand die richtige Stelle und wusste vor dem Termin, was ich mitbringen muss.", name: "Thomas M.", role: "Nach Basel gezogen", image: "/images/testimonial-marco.jpg" },
        { quote: "Die Checkliste machte den ersten Monat überschaubar statt chaotisch.", name: "Sarah L.", role: "Nach Genf gezogen", image: "/images/testimonial-sarah.jpg" },
      ],
    },
    faq: {
      eyebrow: "Vor dem Download",
      title: "Nützliche Antworten. Kein Kleingedrucktes.",
      items: [
        { question: "Für wen ist Sweezy?", answer: "Für Neuzuzüger, Expats und Ukrainer, die ein Leben in der Schweiz aufbauen — von ersten Dokumenten bis Arbeit, Wohnen und lokale Services." },
        { question: "Ist die App kostenlos?", answer: "Der Einstieg in Sweezy ist kostenlos. Kostenpflichtige Ergänzungen werden vor der Auswahl klar angezeigt." },
        { question: "Welche Sprachen gibt es?", answer: "Das Kernprodukt ist auf Deutsch, Englisch und Ukrainisch verfügbar." },
        { question: "Unterscheiden sich Hinweise je Kanton?", answer: "Ja. Sweezy verbindet nationale Regeln mit Kanton und Gemeinde, wenn lokale Unterschiede wichtig sind." },
        { question: "Gibt es Sweezy für Android?", answer: "Sweezy ist aktuell für iPhone verfügbar. Eine Android-Version gibt es noch nicht." },
      ],
    },
    cta: {
      eyebrow: "Ihr Weg kann heute beginnen",
      title: "Die Schweiz ist komplex. Ihr nächster Schritt sollte es nicht sein.",
      body: "Laden Sie Sweezy und machen Sie aus dem Umzug Aufgaben, die sich erledigen lassen.",
      button: "Sweezy im App Store laden",
      note: "iPhone · DE / EN / UA",
    },
    footer: {
      line: "Ein praktisches System für das Leben in der Schweiz.",
      product: "Produkt",
      resources: "Ressourcen",
      legal: "Rechtliches",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      cookies: "Cookies",
      support: "Support",
    },
  },
};
