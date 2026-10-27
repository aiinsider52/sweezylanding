export const SERVICE_COUNTRIES = { CH: "Швейцарія", DE: "Німеччина", AT: "Австрія" } as const;
export const SERVICE_COUNTRY_LOCATIVES = { CH: "у Швейцарії", DE: "у Німеччині", AT: "в Австрії" } as const;
export type ServiceCountry = keyof typeof SERVICE_COUNTRIES;
export const SERVICE_COUNTRY_SLUGS: Record<ServiceCountry, string> = { CH: "switzerland", DE: "germany", AT: "austria" };
const MAP_COUNTRIES: Record<ServiceCountry, string> = { CH: "Switzerland", DE: "Germany", AT: "Austria" };

export type UkrainianService = {
  slug: string;
  name: string;
  category: string;
  country: ServiceCountry;
  region: string;
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
    country: "CH", region: "Тургау",
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
    category: "Краса та догляд", country: "CH", region: "Цюрих", city: "Zürich", schemaType: "BeautySalon",
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
    category: "Фотографія", country: "CH", region: "Цюрих", city: "Zürich", schemaType: "ProfessionalService",
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
    category: "Фотографія", country: "CH", region: "Цюрих", city: "Zürich", schemaType: "ProfessionalService",
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
    category: "Освіта", country: "CH", region: "Цюрих", city: "Zürich", schemaType: "School",
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
    category: "Переклади", country: "CH", region: "Санкт-Галлен", city: "St. Gallen", schemaType: "ProfessionalService",
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
    category: "Масаж", country: "CH", region: "Тургау", city: "Frauenfeld", schemaType: "MedicalClinic",
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
  {
    slug: "ukde-berlin", name: "UKDE.BERLIN — Tatiana Garcia", category: "Переклади", country: "DE", region: "Берлін", city: "Berlin", schemaType: "ProfessionalService",
    street: "Pestalozzistraße 73", postalCode: "10627", website: "https://ukde.berlin/", phone: "+491624171614", phoneDisplay: "+49 162 4171614",
    locationNote: "На сайті вказана контактна адреса в Берліні. Особистий прийом і місце усного перекладу погодьте перед візитом.",
    summary: "Письмовий переклад з української на німецьку та усний переклад у Берліні. Запит і вимоги установи погоджують індивідуально.",
    connection: "translation", ukrainianConnection: "Власний сайт прямо описує письмові переклади українська → німецька та усний переклад українська ↔ німецька. Прийнятність результату для конкретної установи уточніть до замовлення.",
    checkedAt: "2026-10-27", hoursNote: "Прийом і виконання замовлень за домовленістю.",
    inquiryChecklist: ["Назвіть мовну пару, тип документа або місце усного перекладу.", "Уточніть вимоги установи до засвідчення до передання документів.", "Погодьте безпечний канал передання, строк і повну вартість."],
    services: [{ title: "Письмовий та усний переклад", description: "Документи та супровід розмов із установами. Конкретний формат і вимоги одержувача узгоджують до замовлення.", source: "https://ukde.berlin/" }],
    sources: [{ name: "UKDE.BERLIN — мови, послуги та контакти", url: "https://ukde.berlin/" }],
  },
  {
    slug: "linguakontakt-berlin", name: "linguakontakt — Galina Raupach-Pchennikova", category: "Переклади", country: "DE", region: "Берлін", city: "Berlin", schemaType: "ProfessionalService",
    street: "Stahlheimer Str. 10a", postalCode: "10439", website: "https://www.linguakontakt.de/", phone: "+493028045264", phoneDisplay: "+49 30 28045264", email: "office@linguakontakt.de",
    locationNote: "Контактна адреса в Берліні. Час прийому й спосіб передання оригіналів підтвердьте перед поїздкою.",
    summary: "Переклади та усний переклад з українською мовою в Берліні; прямі контакти опубліковані на сайті linguakontakt.",
    connection: "translation", ukrainianConnection: "На контактній сторінці власного сайту українська прямо зазначена серед мов перекладу. Це підтвердження мовної послуги, а не походження власниці.",
    checkedAt: "2026-10-27", hoursNote: "Опубліковані контакти для узгодження прийому; єдиного графіка в цій картці не підтверджено.",
    inquiryChecklist: ["Повідомте мови та установу, для якої потрібен переклад.", "З’ясуйте вимоги до засвідчення й оригіналів.", "Узгодьте строк, ціну та отримання результату."],
    services: [{ title: "Переклад документів та усне спілкування", description: "Можна звернутися щодо української мовної пари; доступність потрібного формату погодьте з виконавицею.", source: "https://www.linguakontakt.de/kontakt.php" }],
    sources: [{ name: "linguakontakt — українська мова, адреса й контакти", url: "https://www.linguakontakt.de/kontakt.php" }],
  },
  {
    slug: "bebright-duesseldorf", name: "BeBright Photography — Jarina & Jan", category: "Фотографія", country: "DE", region: "Північний Рейн-Вестфалія", city: "Düsseldorf", schemaType: "ProfessionalService",
    website: "https://bebright.photography/", phone: "+4915568164464", phoneDisplay: "+49 155 68 16 44 64",
    locationNote: "Робота в Дюссельдорфі та погоджених локаціях. Юридичну адресу з Impressum не подаємо як адресу фотостудії; місце зйомки уточнюйте окремо.",
    summary: "Сімейні, весільні, портретні та бізнес-зйомки в Дюссельдорфі. Команда прямо вказує українську серед мов спілкування.",
    connection: "language", ukrainianConnection: "На сторінці контактів Jarina & Jan прямо пишуть, що спілкуються українською. Під час звернення зазначте бажану мову та формат зйомки.",
    checkedAt: "2026-10-27", hoursNote: "Зйомки за попередньою домовленістю; час і локацію погоджують для замовлення.",
    inquiryChecklist: ["Вкажіть тип зйомки, місто, дату та потрібну мову.", "Уточніть студію, виїзд і склад повної ціни.", "Погодьте строки, кількість фото та права використання."],
    services: [{ title: "Зйомки для людей та бізнесу", description: "У портфоліо представлені родини, весілля, портрети й бізнес-фото. Обсяг і місце роботи погодьте під своє завдання.", source: "https://bebright.photography/kontakt/" }],
    sources: [{ name: "BeBright — мови та телефон", url: "https://bebright.photography/kontakt/" }, { name: "BeBright — місцезнаходження в Дюссельдорфі", url: "https://bebright.photography/impressum/" }],
  },
  {
    slug: "dekur-photography", name: "Dekur Photography — Daria Kurchenko", category: "Фотографія", country: "DE", region: "Баден-Вюртемберг", city: "Bad Rappenau / Heilbronn", schemaType: "ProfessionalService",
    website: "https://dekur-photography.de/", phone: "+491623278341", phoneDisplay: "+49 162 3278341",
    locationNote: "Сайт позиціонує роботу в Bad Rappenau / Heilbronn і називає інші міста для виїзду. Адресу студії та транспортні витрати тут не підтверджено — погодьте локацію.",
    summary: "Портретні, сімейні та бізнес-зйомки в регіоні Heilbronn. Українська вказана в підписі на контактній сторінці фотографки.",
    connection: "language", ukrainianConnection: "На власній контактній сторінці в підписі до зображення зазначені Deutsch, Russisch, Ukrainisch. Українську для конкретного замовлення підтвердьте під час звернення; телефон походить із опублікованого WhatsApp-посилання.",
    checkedAt: "2026-10-27", hoursNote: "Зйомки та обговорення проєктів за домовленістю.",
    inquiryChecklist: ["Повідомте місто, дату, завдання та потрібну мову.", "Уточніть формат, локацію й витрати на виїзд.", "Погодьте строки, обробку, права використання й ціну."],
    services: [{ title: "Портрети та бізнес-фотографія", description: "Контактна сторінка пропонує обговорити фотографію й персональний брендинг у регіоні Heilbronn та інших названих містах.", source: "https://dekur-photography.de/kontakt" }],
    sources: [{ name: "Dekur — регіони, мовна позначка та прямий WhatsApp-контакт", url: "https://dekur-photography.de/kontakt" }],
  },
  {
    slug: "ukrainische-samstagsschule-muenchen", name: "Українська суботня школа — Мюнхен", category: "Освіта", country: "DE", region: "Баварія", city: "München", schemaType: "School",
    website: "https://ua-schule.de/", phone: "+4917663333372", phoneDisplay: "+49 176 63333372", email: "info@ua-schule.de",
    locationNote: "Контактна сторінка називає Freudstraße 15, а оголошення дня відкритих дверей — Führichstraße 53. Через різні опубліковані локації адресу саме вашої групи потрібно підтвердити зі школою; маршрут автоматично не будуємо.",
    summary: "Українська суботня школа в Мюнхені: українська мова, література, історія й культура, набір на 2026/2027 навчальний рік.",
    connection: "language", ukrainianConnection: "Власний сайт описує збереження української мови й навчальний план з української мови, літератури, історії та культури. Це мовна освітня пропозиція; доступність групи потрібно уточнити.",
    checkedAt: "2026-10-27", hoursNote: "Сторінка контактів зазначає навчання в суботу 10:00–14:00 і телефонні довідки 12:00–14:00. Розклад своєї групи підтвердьте окремо.",
    inquiryChecklist: ["Назвіть вік дитини та потрібну групу.", "Попросіть підтвердити актуальну адресу: на сторінках є різні локації.", "Уточніть наявність місць, внески та цифровий порядок запису."],
    services: [{ title: "Українська суботня освіта", description: "Навчальний план з української мови, літератури, історії та культури. Умови зарахування визначає школа.", source: "https://ua-schule.de/" }],
    sources: [{ name: "Школа — актуальні контакти й місце занять", url: "https://ua-schule.de/contact" }, { name: "Школа — українська мова, програма й оголошення іншої локації", url: "https://ua-schule.de/" }],
  },
  {
    slug: "belin-translations-wien", name: "Belin Translations — Vladislav Belin", category: "Переклади", country: "AT", region: "Відень", city: "Wien", schemaType: "ProfessionalService",
    website: "https://www.belintranslation.com/", phone: "+4367762854001", phoneDisplay: "+43 677 62854001", email: "office@belintranslation.com",
    locationNote: "На сайті названі Відень і Vereinsgasse 10-21. Формат адреси й можливість особистого прийому уточніть; адресу для автоматичного маршруту не припускаємо.",
    summary: "Письмовий та усний переклад з українською мовою у Відні, зокрема відеопереклад за погодженням.",
    connection: "translation", ukrainianConnection: "Українська прямо зазначена серед мов перекладу на власному сайті. Це підтверджує мовну пару послуги; українське походження виконавця не заявляється.",
    checkedAt: "2026-10-27", hoursNote: "Час і формат замовлення узгоджують через опубліковані контакти.",
    inquiryChecklist: ["Опишіть документ або подію, мови та строк.", "Уточніть у одержувача вимоги до засвідчення.", "Погодьте відеоформат або місце зустрічі, ціну та спосіб передання даних."],
    services: [{ title: "Переклади та усний супровід", description: "На сайті є переклад документів, усні й відеозустрічі. Потрібну мовну пару, формат і прийнятність результату погодьте перед замовленням.", source: "https://www.belintranslation.com/" }],
    sources: [{ name: "Belin Translations — українська, формати та контакти", url: "https://www.belintranslation.com/" }],
  },
  {
    slug: "ludmila-frank-wien", name: "Ludmila Frank — переклади у Відні", category: "Переклади", country: "AT", region: "Відень", city: "Wien", schemaType: "ProfessionalService",
    street: "Siebensterngasse 42-44/12", postalCode: "1070", website: "https://translate.frank-vie.at/", phone: "+436642027880", phoneDisplay: "+43 664 202 78 80", email: "translate@frank-vie.at",
    locationNote: "Опублікована контактна адреса: 2-й поверх, двері 12. Особистий візит узгодьте заздалегідь.",
    summary: "Перекладачка у Відні з прямо зазначеною українською мовою та опублікованими адресою, телефоном і email.",
    connection: "translation", ukrainianConnection: "Українська прямо зазначена серед мов перекладу на сайті виконавиці. Вимоги до конкретного документа й засвідчення погодьте з одержувачем перед замовленням.",
    checkedAt: "2026-10-27", hoursNote: "Час звернення та прийому — за домовленістю.",
    inquiryChecklist: ["Повідомте мовну пару, тип документа й одержувача.", "Уточніть вимоги до засвідчення, оригіналів і строку.", "Погодьте повну ціну та спосіб отримання результату."],
    services: [{ title: "Українська мовна пара", description: "Можна звернутися щодо письмового та усного перекладу; конкретний формат потрібно погодити з виконавицею.", source: "https://translate.frank-vie.at/" }],
    sources: [{ name: "Ludmila Frank — українська мова й прямі контакти", url: "https://translate.frank-vie.at/" }],
  },
  {
    slug: "snitynskyi-photography-wien", name: "Volodymyr Snitynskyi Photography", category: "Фотографія", country: "AT", region: "Відень", city: "Wien", schemaType: "ProfessionalService",
    website: "https://www.snitynskyi.com/de/startseite/", phone: "+436603753356", phoneDisplay: "+43 660 375 33 56", email: "volodymyrsnitynskyi@gmail.com",
    locationNote: "Фотограф базується у Відні та пропонує виїзди Австрією й Європою. Постійна адреса студії не підтверджена; локацію та доїзд узгодьте.",
    summary: "Весільні, сімейні, парні та портретні зйомки у Відні й за домовленістю на виїзді. Українська прямо вказана серед мов.",
    connection: "language", ukrainianConnection: "У контактному розділі та відповідях фотограф прямо зазначає, що планування й обговорення можливі українською, англійською або німецькою.",
    checkedAt: "2026-10-27", hoursNote: "Дату, тривалість і місце зйомки погоджують індивідуально.",
    inquiryChecklist: ["Вкажіть формат, дату, місце й бажану мову.", "Погодьте доїзд, тривалість та повну ціну.", "Уточніть кількість фото, строки й умови використання результату."],
    services: [{ title: "Весільна й портретна фотографія", description: "На сайті представлені весілля, пари, родини та портрети. Умови виїзду та результат погоджують у пропозиції.", source: "https://www.snitynskyi.com/de/startseite/" }],
    sources: [{ name: "Snitynskyi — українська мова, телефон та email", url: "https://www.snitynskyi.com/de/anfrage/" }, { name: "Snitynskyi — формати й територія роботи", url: "https://www.snitynskyi.com/de/startseite/" }],
  },
  {
    slug: "ukrainische-samstagsschule-wien", name: "Українська суботня школа — Відень", category: "Освіта", country: "AT", region: "Відень", city: "Wien", schemaType: "School",
    street: "Beethovenplatz 1", postalCode: "1010", website: "https://ukr-schule.at/", phone: "+436505910994", phoneDisplay: "+43 650 591 09 94", email: "info@ukr-schule.at",
    locationNote: "Адреса занять опублікована на сайті школи. Перед першим візитом підтвердьте будівлю, вхід і групу.",
    summary: "Українське навчальне середовище у Відні: шкільні групи, підготовка й гуртки; запис і програму уточнюють у школі.",
    connection: "language", ukrainianConnection: "Школа прямо описує україномовне освітнє середовище на власному сайті. Мову й програму конкретної групи підтвердьте під час запису.",
    checkedAt: "2026-10-27", hoursNote: "Заняття по суботах; актуальний час своєї групи уточніть у школи.",
    inquiryChecklist: ["Повідомте вік дитини та потрібну програму.", "Уточніть наявність місць, адресу й розклад групи.", "Запитайте про внески, матеріали та порядок запису."],
    services: [{ title: "Навчання та гуртки", description: "Сайт описує шкільні й підготовчі групи та додаткові заняття. Набір, внески й актуальну пропозицію підтверджує школа.", source: "https://ukr-schule.at/" }],
    sources: [{ name: "Суботня школа — адреса та контакти", url: "https://ukr-schule.at/contacts/" }, { name: "Суботня школа — українське мовне середовище", url: "https://ukr-schule.at/" }],
  },
  {
    slug: "erudyt-school-wien", name: "Українська школа «Ерудит» — Відень", category: "Освіта", country: "AT", region: "Відень", city: "Wien", schemaType: "School",
    street: "Davidgasse 92-94", postalCode: "1100", website: "https://www.erudytwien.com/", phone: "+436769481689", phoneDisplay: "+43 676 9481689", email: "erudyt.wien@gmail.com",
    locationNote: "На власному сайті опублікована адреса Davidgasse 92-94. Уточніть кабінет, групу та порядок першого відвідування.",
    summary: "Українська школа у Відні з навчанням предметів українською, підготовчими групами й додатковими заняттями.",
    connection: "language", ukrainianConnection: "Сторінка «Наша школа» прямо повідомляє про вивчення предметів українською мовою. Формат і мову конкретної додаткової послуги слід уточнювати окремо.",
    checkedAt: "2026-10-27", hoursNote: "Розклад залежить від групи та програми; єдиний час прийому не підтверджено.",
    inquiryChecklist: ["Назвіть вік дитини та потрібний формат навчання.", "Перевірте набір, мову й розклад конкретної групи.", "Погодьте внески, матеріали й адресу першого заняття."],
    services: [{ title: "Школа й підготовчі групи", description: "На сайті описані навчання, підготовка до школи та гуртки. Доступність і умови конкретної програми уточніть безпосередньо.", source: "https://www.erudytwien.com/nasha-shkola" }],
    sources: [{ name: "Ерудит — контакти й адреса", url: "https://www.erudytwien.com/" }, { name: "Ерудит — прямо зазначена українська мова навчання", url: "https://www.erudytwien.com/nasha-shkola" }],
  },
];

export const connectionLabels: Record<UkrainianService["connection"], string> = {
  language: "Українська вказана на сайті",
  origin: "Фахівець з України · мову уточніть",
  translation: "Переклад з / на українську",
  editorial: "Рекомендація спільноти · мову уточніть",
};

export type ServicePreview = Pick<UkrainianService, "slug" | "name" | "category" | "country" | "region" | "city" | "street" | "postalCode" | "phone" | "phoneDisplay" | "summary" | "connection">;

export function servicePreview({ slug, name, category, country, region, city, street, postalCode, phone, phoneDisplay, summary, connection }: UkrainianService): ServicePreview {
  return { slug, name, category, country, region, city, street, postalCode, phone, phoneDisplay, summary, connection };
}

export function filterServices<T extends Pick<UkrainianService, "category" | "region" | "country">>(services: T[], category: string, region: string, country: ServiceCountry | "" = "") {
  return services.filter((service) => (!category || service.category === category) && (!region || service.region === region) && (!country || service.country === country));
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
  const address = `${serviceLocation(service)}, ${MAP_COUNTRIES[service.country]}`;
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
    areaServed: { "@type": "AdministrativeArea", name: service.region, containedInPlace: { "@type": "Country", name: SERVICE_COUNTRIES[service.country], identifier: service.country } },
    ...(service.street && service.postalCode ? { address: {
      "@type": "PostalAddress",
      streetAddress: service.street,
      postalCode: service.postalCode,
      addressLocality: service.city,
      addressRegion: service.region,
      addressCountry: service.country,
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
