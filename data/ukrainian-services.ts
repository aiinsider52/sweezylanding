export type UkrainianService = {
  slug: string;
  name: string;
  category: string;
  canton: string;
  city: string;
  schemaType: "AutoRepair" | "BeautySalon" | "ProfessionalService" | "School" | "MedicalClinic";
  street?: string;
  postalCode?: string;
  locationNote: string;
  website: string;
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  summary: string;
  connection: "language" | "origin" | "translation" | "editorial";
  ukrainianConnection: string;
  checkedAt: string;
  hoursNote: string;
  openingHours?: { days: string[]; opens: string; closes: string }[];
  inquiryChecklist: string[];
  guide?: { title: string; href: string };
  services: { title: string; description: string; source: string }[];
  sources: { name: string; url: string }[];
};

export const ukrainianServices: UkrainianService[] = [
  {
    slug: "classic-car-die-garage",
    name: "Classic Car die Garage GmbH",
    category: "Автосервіс",
    canton: "Тургау",
    city: "Roggwil TG",
    schemaType: "AutoRepair",
    street: "St. Gallerstrasse 29",
    postalCode: "9325",
    locationNote: "Майстерня у Roggwil TG, кантон Тургау. Перед поїздкою підтвердьте запис.",
    website: "https://classiccardiegarage.ch/",
    phone: "+41712786060",
    phoneDisplay: "+41 71 278 60 60",
    email: "info@classiccardiegarage.ch",
    summary: "Обслуговування легкових автомобілів і роботи з олдтаймерами в Roggwil, кантон Тургау.",
    connection: "editorial",
    ukrainianConnection: "За інформацією, наданою редакції Sweezy, у гаражі працюють українці. Можливість запису й пояснення ремонту українською уточніть безпосередньо в гаражі.",
    checkedAt: "2026-10-22",
    hoursNote: "Пн–пт: 08:00–17:00. Субота: за домовленістю. Неділя: зачинено.",
    openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }],
    inquiryChecklist: ["Марка, модель, рік випуску й опис проблеми або потрібної роботи.", "Бажаний час і потрібна мова спілкування.", "Запит на кошторис: що входить у роботу та як погоджують додаткові витрати."],
    guide: { title: "Автосервіс у Тургау: як записатися й погодити ремонт", href: "/uk/blog/ukrayinskyy-avtoservis-thurgau" },
    services: [
      {
        title: "Сервіс і ремонт легкових автомобілів",
        description: "На сайті є напрям обслуговування легкових авто; окремо описані ремонт, відновлення вузлів і налаштування олдтаймерів. Роботи для своєї марки та моделі погодьте перед візитом.",
        source: "https://classiccardiegarage.ch/dienstleistungen/service-und-reparaturarbeiten-an-allen-personenwagen/",
      },
      {
        title: "Підготовка олдтаймерів до Veteranenprüfung",
        description: "Гараж описує допомогу з роботами, пов'язаними з оформленням автомобіля як олдтаймера. Потрібні роботи й документи обговоріть із майстернею.",
        source: "https://classiccardiegarage.ch/dienstleistungen/veteranenpru%CC%88fung/",
      },
    ],
    sources: [
      { name: "Контакти й години роботи гаража", url: "https://classiccardiegarage.ch/kontakt/" },
      { name: "Сервіс і ремонт", url: "https://classiccardiegarage.ch/dienstleistungen/service-und-reparaturarbeiten-an-allen-personenwagen/" },
      { name: "Veteranenprüfung", url: "https://classiccardiegarage.ch/dienstleistungen/veteranenpru%CC%88fung/" },
    ],
  },
  {
    slug: "genki-beauty-zurich",
    name: "GENKI Beauty",
    category: "Краса та догляд", canton: "Цюрих", city: "Zürich", schemaType: "BeautySalon",
    street: "In Gassen 7", postalCode: "8001",
    locationNote: "Салон у центрі Цюриха. Для спілкування українською запитайте запис до Anastasiia Shtalder.",
    website: "https://genki-beauty.ch/", phone: "+41793110229", phoneDisplay: "+41 79 311 02 29", email: "info@genki.ch",
    summary: "Косметичний догляд у Цюриху. У команді є Anastasiia Shtalder, яка, за сторінкою салону, спілкується українською.",
    connection: "language",
    ukrainianConnection: "Українська прямо вказана серед мов Anastasiia Shtalder на сторінці команди GENKI. Під час запису назвіть спеціалістку та потрібну мову: це не означає, що всі працівники салону говорять українською.",
    checkedAt: "2026-10-23",
    hoursNote: "Години салону: пн–пт 10:00–19:00, сб 09:00–17:00, нд зачинено. Час прийому Anastasiia уточніть окремо.",
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
      { days: ["Saturday"], opens: "09:00", closes: "17:00" },
    ],
    inquiryChecklist: ["Назвіть Anastasiia Shtalder й уточніть можливість прийому українською.", "Опишіть, який догляд вас цікавить; попросіть підтвердити його доступність у цієї спеціалістки.", "Узгодьте тривалість, ціну та умови перенесення запису."],
    guide: { title: "Українські послуги в Цюриху: контакти й запис", href: "/uk/blog/ukrayinski-posluhy-zurich" },
    services: [{ title: "Косметичний догляд", description: "На сторінці спеціалістки описані процедури для обличчя та тіла. Конкретну процедуру, її умови й вартість погодьте із салоном.", source: "https://genki-beauty.ch/team/" }],
    sources: [{ name: "Команда GENKI — спеціалісти та мови", url: "https://genki-beauty.ch/team/" }, { name: "GENKI — контакти й графік", url: "https://genki-beauty.ch/kontakt/" }],
  },
  {
    slug: "jane-gromova-photography",
    name: "Jane Gromova Photography",
    category: "Фотографія", canton: "Цюрих", city: "Zürich", schemaType: "ProfessionalService",
    locationNote: "Зйомки в Цюриху та інших містах за домовленістю. Сайт згадує Zürich і Basel; постійна адреса студії тут не підтверджена. Уточніть місце зустрічі й витрати на виїзд.",
    website: "https://www.janegromova.ch/", phone: "+41797772344", phoneDisplay: "+41 79 777 23 44", email: "evhenia.gromova@gmail.com",
    summary: "Фотографка з України: портретні, сімейні, весільні та ділові зйомки, зокрема в Цюриху. Локацію погоджують перед зйомкою.",
    connection: "origin",
    ukrainianConnection: "Jane пише на власному сайті, що вона з України. Окремого переліку мов спілкування не знайдено; українську для консультації та зйомки потрібно підтвердити під час звернення.",
    checkedAt: "2026-10-23", hoursNote: "Зйомки за попередньою домовленістю; години студії не опубліковані.",
    inquiryChecklist: ["Вкажіть тип зйомки, дату, місто та кількість учасників.", "Уточніть мову, локацію, оренду студії та витрати на виїзд.", "Погодьте кількість готових фото, строки, права використання й умови оплати."],
    guide: { title: "Як знайти фотографа та інші українські послуги в Цюриху", href: "/uk/blog/ukrayinski-posluhy-zurich" },
    services: [{ title: "Фото для людей і бізнесу", description: "У портфоліо є сімейні й весільні зйомки, портрети для особистого бренду та події. Формат фото або відео узгодьте для свого проєкту.", source: "https://www.janegromova.ch/" }],
    sources: [{ name: "Jane Gromova — про себе, послуги та контакти", url: "https://www.janegromova.ch/" }],
  },
  {
    slug: "m-fotografie",
    name: "M-Fotografie",
    category: "Фотографія", canton: "Цюрих", city: "Zürich", schemaType: "ProfessionalService",
    locationNote: "Цюрих входить до опублікованих регіонів роботи. Адреса постійної студії не підтверджена; місце зйомки узгодьте безпосередньо.",
    website: "https://www.m-fotografie.ch/", phone: "+41762011674", phoneDisplay: "+41 76 201 16 74", email: "maria@m-fotografie.ch",
    summary: "Фотографка Maria з України. На сайті є зйомки для особистого бренду, подій, сімей і бізнесу; серед регіонів роботи — Цюрих.",
    connection: "origin",
    ukrainianConnection: "На сторінці «Über mich» Maria вказує походження з України, німецьку та швейцарську німецьку. Українська як мова послуги окремо не зазначена — уточніть її перед бронюванням.",
    checkedAt: "2026-10-23", hoursNote: "Дата, час і місце зйомки — за попередньою домовленістю.",
    inquiryChecklist: ["Опишіть завдання: сімейні фото, подія, особистий бренд або фото для бізнесу.", "Вкажіть місто, дату та потрібну мову; уточніть можливість виїзду.", "Узгодьте формат результату, строки, права використання та всі складові ціни."],
    guide: { title: "Фотографи та інші українські послуги в Цюриху", href: "/uk/blog/ukrayinski-posluhy-zurich" },
    services: [{ title: "Портретні та комерційні зйомки", description: "Портфоліо охоплює людей, родини, події, їжу й нерухомість. Доступність потрібного формату та локації уточніть для своєї дати.", source: "https://www.m-fotografie.ch/" }],
    sources: [{ name: "M-Fotografie — походження, мови й контакти", url: "https://www.m-fotografie.ch/%C3%BCber-mich" }, { name: "M-Fotografie — портфоліо", url: "https://www.m-fotografie.ch/" }],
  },
  {
    slug: "mrija-school-zurich",
    name: "Українська школа «Мрія» — Цюрих",
    category: "Освіта", canton: "Цюрих", city: "Zürich", schemaType: "School",
    street: "Aegertenstrasse 29", postalCode: "8003",
    locationNote: "Schule Aegerten — одна з опублікованих локацій занять. На сторінці також згадана Neue Schule Zürich; конкретну будівлю й групу підтвердьте зі школою.",
    website: "https://www.mrija.schule/school", email: "info@mrija.schule",
    summary: "Українська школа в Цюриху: заняття українською мовою, навчання мови й знайомство з культурою. Запис і групу погоджують зі школою.",
    connection: "language",
    ukrainianConnection: "Школа прямо зазначає, що заняття проводяться українською мовою. Це освітня пропозиція української спільноти; умови вступу й розклад залежать від групи.",
    checkedAt: "2026-10-23", hoursNote: "Розклад залежить від групи. Час і будівлю занять уточніть перед першим відвідуванням.",
    inquiryChecklist: ["Повідомте вік дитини, попередній досвід навчання та потрібну групу.", "Уточніть наявність місць, розклад і адресу саме вашої групи.", "Запитайте про реєстрацію, оплату й матеріали для першого заняття."],
    guide: { title: "Школа та інші українські послуги в Цюриху", href: "/uk/blog/ukrayinski-posluhy-zurich" },
    services: [{ title: "Навчання українською", description: "На сайті школи описані українська мова, література та культура. Вікову групу й актуальну програму підтвердьте під час запису.", source: "https://www.mrija.schule/" }],
    sources: [{ name: "Мрія — навчання в Цюриху, мова й адреса", url: "https://www.mrija.schule/school" }, { name: "Мрія — програма та контакти школи", url: "https://www.mrija.schule/" }],
  },
  {
    slug: "invatrans-st-gallen",
    name: "InvaTrans GmbH",
    category: "Переклади", canton: "Санкт-Галлен", city: "St. Gallen", schemaType: "ProfessionalService",
    street: "Burgstrasse 57", postalCode: "9000",
    locationNote: "Офіс у Санкт-Галлені. Час особистого звернення та спосіб передання документів краще погодити заздалегідь.",
    website: "https://invatrans.ch/", phone: "+41712301020", phoneDisplay: "+41 71 230 10 20", email: "info@invatrans.ch",
    summary: "Перекладацьке бюро в Санкт-Галлені з опублікованою пропозицією перекладу між українською та німецькою.",
    connection: "translation",
    ukrainianConnection: "На сайті бюро є окрема послуга перекладу українська ↔ німецька. Це підтверджує мовну пару послуги; українське походження власників і мова адміністратора тут не підтверджені.",
    checkedAt: "2026-10-23", hoursNote: "Години прийому в офісі уточніть безпосередньо. Згадку про доступність зв'язку 24/7 не слід сприймати як цілодобовий прийом відвідувачів.",
    inquiryChecklist: ["Назвіть мови оригіналу й перекладу, вид документа та потрібний строк.", "Погодьте з одержувачем вимоги до перекладу, а з бюро — можливість їх виконання й повну ціну.", "Уточніть порядок передання оригіналів або копій, отримання результату та контактну мову."],
    services: [{ title: "Переклад українська ↔ німецька", description: "Бюро публікує цю мовну пару для документів і текстів. Потрібний формат та вимоги одержувача уточніть до замовлення.", source: "https://invatrans.ch/sprachen/uebersetzung-deutsch-ukrainisch/" }],
    sources: [{ name: "InvaTrans — українська та німецька", url: "https://invatrans.ch/sprachen/uebersetzung-deutsch-ukrainisch/" }, { name: "InvaTrans — контакти й адреса офісу", url: "https://invatrans.ch/kontakt/" }],
  },
  {
    slug: "physiozentrum-frauenfeld",
    name: "PHYSIOZENTRUM Frauenfeld",
    category: "Масаж", canton: "Тургау", city: "Frauenfeld", schemaType: "MedicalClinic",
    street: "Bahnhofplatz 65", postalCode: "8500",
    locationNote: "Філія біля вокзалу Frauenfeld. Для української мови під час запису запитайте спеціалістку Alla Altherr.",
    website: "https://www.physiozentrum.ch/frauenfeld/", phone: "+41523007700", phoneDisplay: "+41 52 300 77 00",
    summary: "У філії Frauenfeld працює Alla Altherr, медична масажистка, у профілі якої прямо вказана українська мова.",
    connection: "language",
    ukrainianConnection: "У профілі Alla Altherr на сайті PHYSIOZENTRUM вказані українська, німецька, російська й англійська. Для прийому українською потрібен запис саме до цієї спеціалістки; це не твердження про мови всієї клініки.",
    checkedAt: "2026-10-23", hoursNote: "Години філії: пн–чт 07:30–20:00, пт 07:30–18:30. Вільний час Alla Altherr уточніть окремо.",
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:30", closes: "20:00" },
      { days: ["Friday"], opens: "07:30", closes: "18:30" },
    ],
    inquiryChecklist: ["Назвіть Alla Altherr і потрібну мову прийому.", "Уточніть доступний формат запису, тривалість і вільний час.", "Погодьте вартість із практикою; питання покриття витрат перевірте у свого страховика."],
    services: [{ title: "Запис на масаж до Alla Altherr", description: "На сторінці спеціалістки є варіанти запису на класичний, медичний і спортивний масаж. Потрібний формат узгодьте з практикою.", source: "https://www.physiozentrum.ch/frauenfeld/team/alla-altherr-stadtmann/" }],
    sources: [{ name: "Alla Altherr — роль, мови та запис", url: "https://www.physiozentrum.ch/frauenfeld/team/alla-altherr-stadtmann/" }, { name: "PHYSIOZENTRUM Frauenfeld — адреса, телефон і години", url: "https://www.physiozentrum.ch/frauenfeld/" }],
  },
];

export const connectionLabels: Record<UkrainianService["connection"], string> = {
  language: "Українська вказана на сайті",
  origin: "Фахівець з України · мову уточніть",
  translation: "Переклад з / на українську",
  editorial: "Рекомендація спільноти · мову уточніть",
};

export type ServicePreview = Pick<UkrainianService, "slug" | "name" | "category" | "canton" | "city" | "street" | "postalCode" | "phone" | "phoneDisplay" | "summary" | "connection">;

export function servicePreview({ slug, name, category, canton, city, street, postalCode, phone, phoneDisplay, summary, connection }: UkrainianService): ServicePreview {
  return { slug, name, category, canton, city, street, postalCode, phone, phoneDisplay, summary, connection };
}

export function filterServices<T extends Pick<UkrainianService, "category" | "canton">>(services: T[], category: string, canton: string) {
  return services.filter((service) => (!category || service.category === category) && (!canton || service.canton === canton));
}

export function serviceLocation(service: Pick<UkrainianService, "street" | "postalCode" | "city">) {
  return service.street && service.postalCode ? `${service.street}, ${service.postalCode} ${service.city}` : `Регіон роботи: ${service.city}`;
}

export function getUkrainianService(slug: string) {
  return ukrainianServices.find((service) => service.slug === slug);
}

export function servicePath(service: Pick<UkrainianService, "slug">) {
  return `/uk/services/${service.slug}`;
}

export function serviceDirections(service: UkrainianService) {
  if (!service.street || !service.postalCode) return null;
  const address = `${serviceLocation(service)}, Switzerland`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function serviceSchema(service: UkrainianService) {
  return {
    "@context": "https://schema.org",
    "@type": service.schemaType,
    "@id": `https://www.sweezy.world${servicePath(service)}#business`,
    name: service.name,
    url: service.website,
    mainEntityOfPage: `https://www.sweezy.world${servicePath(service)}`,
    description: service.summary,
    ...(service.phone ? { telephone: service.phone } : {}),
    ...(service.email ? { email: service.email } : {}),
    areaServed: { "@type": "AdministrativeArea", name: service.canton },
    ...(service.street && service.postalCode ? { address: {
      "@type": "PostalAddress",
      streetAddress: service.street,
      postalCode: service.postalCode,
      addressLocality: service.city,
      addressRegion: service.canton,
      addressCountry: "CH",
    } } : {}),
    ...(service.openingHours ? { openingHoursSpecification: service.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })) } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.category} — ${service.name}`,
      itemListElement: service.services.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.title, url: item.source } })),
    },
  };
}
