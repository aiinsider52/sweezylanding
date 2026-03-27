export type ContactEntry = {
  office: string;
  address: string;
  phone: string;
  website: string;
};

export type CourseEntry = {
  name: string;
  description: string;
};

export type FaqEntry = {
  q: string;
  a: string;
};

export type BlogLinkEntry = {
  href: string;
  label: string;
};

export type LocaleRich = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  registrationLead: string;
  registrationOfficeName: string;
  registrationOfficeAddress: string;
  registrationOfficeWebsite: string;
  registrationDocs: string[];
  permitLead: string;
  permitStatusSNote?: string;
  healthPremium: string;
  healthSubsidyInfo: string;
  healthHospitalNote: string;
  courses: CourseEntry[];
  housingAvgRent: string;
  housingPortals: string[];
  housingAidInfo: string;
  faq: FaqEntry[];
  blogLinks: BlogLinkEntry[];
  // UI labels
  sectionRegistration: string;
  sectionPermit: string;
  sectionHealth: string;
  sectionCourses: string;
  sectionHousing: string;
  sectionContacts: string;
  sectionFaq: string;
  sectionOtherCantons: string;
  sectionOtherCantonsDesc: string;
  colOffice: string;
  colAddress: string;
  colPhone: string;
  colWebsite: string;
  deadline: string;
  requiredDocs: string;
  avgPremium: string;
  avgRent: string;
};

export type CantonRich = {
  contacts: ContactEntry[];
  en: LocaleRich;
  uk: LocaleRich;
};

// The 6 priority cantons with full data
export const RICH_CANTONS: Record<string, CantonRich> = {
  zurich: {
    contacts: [
      {
        office: "Migrationsamt des Kantons Zürich",
        address: "Berninastrasse 45, 8090 Zürich",
        phone: "+41 43 259 88 00",
        website: "zh.ch/migrationsamt",
      },
      {
        office: "Sozialamt Kanton Zürich",
        address: "Stampfenbachstrasse 58, 8090 Zürich",
        phone: "+41 43 259 96 00",
        website: "zh.ch/sozialamt",
      },
      {
        office: "Personenmeldeamt Zürich (City)",
        address: "Stadthaus, Stadthausquai 17, 8001 Zürich",
        phone: "+41 44 412 32 12",
        website: "stadt-zuerich.ch/prd",
      },
      {
        office: "Universitätsspital Zürich (USZ)",
        address: "Rämistrasse 100, 8091 Zürich",
        phone: "+41 44 255 11 11",
        website: "usz.ch",
      },
    ],
    en: {
      metaTitle: "Moving to Zurich: Guide for Newcomers & Expats (2026)",
      metaDescription:
        "Complete guide to moving to Zurich: registration at Personenmeldeamt, residence permits, health insurance (avg CHF 480/month), housing and German language courses. Updated 2026.",
      h1: "Guide for Newcomers: Zurich",
      intro:
        "Zurich is Switzerland's largest city and economic hub, home to over 440,000 residents — roughly 32% of whom are foreign nationals. The canton offers one of the world's highest standards of living, a strong job market spanning finance, technology, and pharmaceuticals, and an efficient public-service infrastructure. Housing competition is intense, especially in the city proper, and registering within 14 days of arrival is a legal requirement.",
      registrationLead:
        "After moving to Zurich, you must register at your local Personenmeldeamt within 14 days. The City of Zurich operates three main offices: Stadthaus (city centre), Oerlikon (north), and Schwamendingen (north-east). If you live in a suburban municipality such as Winterthur, Uster, or Dietikon, register at the local Einwohnerkontrolle instead.",
      registrationOfficeName: "Personenmeldeamt Zürich – Stadthaus",
      registrationOfficeAddress: "Stadthausquai 17, 8001 Zürich",
      registrationOfficeWebsite: "stadt-zuerich.ch/prd/de/index/bev/bev_reg.html",
      registrationDocs: [
        "Valid passport or national identity card",
        "Rental contract or written confirmation of your address",
        "Work permit or employment contract (if applicable)",
        "For Status S holders: Permit N card",
        "Family documents: marriage certificate, children's birth certificates",
        "Payment: CHF 20–30 registration fee (cash or card)",
      ],
      permitLead:
        "The Migrationsamt des Kantons Zürich handles all residence permit applications for Zurich canton. EU/EFTA citizens with a valid employment contract receive a B permit at the Personenmeldeamt on the same visit. Non-EU nationals require employer-led sponsorship and federal SEM approval before entering Switzerland. The Migrationsamt can advise on permit-category questions, extension timelines, and family reunification.",
      healthPremium: "~CHF 480/month",
      healthSubsidyInfo:
        "Apply for Prämienverbilligung (premium reduction) at sozialversicherungen.zh.ch. Single-person households with income up to approx. CHF 69,100/year may qualify. Applications are processed by SVA Zürich — submit by 31 March of the coverage year. To reduce premiums immediately: compare on priminfo.admin.ch, select a Telmed or HMO model, and raise your franchise to CHF 2,500 (saves up to CHF 150/month).",
      healthHospitalNote:
        "Main emergency hospitals: Universitätsspital Zürich (USZ) at Rämistrasse 100 (+41 44 255 11 11) and Stadtspital Triemli at Birmensdorferstrasse 497 (+41 44 416 11 11). For non-emergency GP visits, use the Healthpoint app or search ärzte.ch for English-speaking doctors.",
      courses: [
        {
          name: "HEKS Zürich – Sprachförderung",
          description:
            "Free German integration courses for Status S holders and recognized refugees. Multiple levels (A1–B1), small groups, Ukrainian-speaking staff available. Register at heks.ch/region/zurich.",
        },
        {
          name: "Volkshochschule Zürich (VHS)",
          description:
            "Subsidized German courses from A1 to C1. Prices from CHF 195 per course level, multiple intake dates per year. volkshochschule.ch",
        },
        {
          name: "Migros Klubschule Zürich",
          description:
            "Group German courses at locations across Zurich, from CHF 250 per course. Flexible schedules including evenings. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1,800–2,200 / month",
      housingPortals: ["homegate.ch", "immoscout24.ch", "comparis.ch/immobilien", "ronorp.net"],
      housingAidInfo:
        "Wohnversorgung Zürich manages subsidized housing — waitlists of 2–5 years. For urgent situations through Sozialhilfe, contact soziale-einrichtungen.ch. Many expats find housing faster via Facebook groups 'Zürich Wohnungen' and 'Expats in Zurich' or through employer-provided accommodation during the first months.",
      faq: [
        {
          q: "How long does registration take at the Personenmeldeamt in Zurich?",
          a: "Walk-in appointments are available at all three city offices. The registration itself takes 15–30 minutes. Your permit card arrives by post within 2–4 weeks. If you need a digital confirmation same day (e.g. for opening a bank account), ask staff for a Bestätigung der Anmeldung.",
        },
        {
          q: "What is the cheapest health insurance option in Zurich canton in 2026?",
          a: "With a CHF 2,500 franchise and a Telmed or HMO model, you can reduce the adult premium from ~CHF 480 to CHF 310–360/month. Compare all approved tariffs at priminfo.admin.ch — select canton 'Zürich', your age, and model. Switch by 30 November each year.",
        },
        {
          q: "Are there English or Ukrainian-speaking support services in Zurich?",
          a: "Yes. HEKS Zürich has Ukrainian-speaking case workers and runs free language courses. The Facebook group 'Українці у Цюриху' has 30,000+ members sharing housing tips, job openings, and practical advice. For English-speaking support, contact the International Welcome Centre Zurich (IWCZ) at internazionale.ch.",
        },
      ],
      blogLinks: [
        {
          href: "/en/blog/moving-to-zurich-guide",
          label: "Moving to Zurich: The Complete Expat Guide (2026)",
        },
        {
          href: "/en/blog/how-to-register-switzerland",
          label: "How to Register in Switzerland as a Foreigner",
        },
        {
          href: "/en/blog/work-permit-switzerland-non-eu-2026",
          label: "Work Permit Switzerland for Non-EU Citizens",
        },
      ],
      sectionRegistration: "First Steps After Arrival",
      sectionPermit: "Residence Permit",
      sectionHealth: "Health Insurance",
      sectionCourses: "German Language Courses",
      sectionHousing: "Finding Housing",
      sectionContacts: "Useful Contacts",
      sectionFaq: "Frequently Asked Questions",
      sectionOtherCantons: "Other Major Cantons",
      sectionOtherCantonsDesc: "Explore our newcomer guides for other Swiss cantons:",
      colOffice: "Office",
      colAddress: "Address",
      colPhone: "Phone",
      colWebsite: "Website",
      deadline: "Registration deadline: within 14 days of arrival.",
      requiredDocs: "Required documents:",
      avgPremium: "Average health insurance premium (2026, adult, standard):",
      avgRent: "Average 1-room apartment rent:",
    },
    uk: {
      metaTitle: "Переїзд до Цюриха: гід для новоприбулих 2026",
      metaDescription:
        "Повний гід для переїзду до Цюриха: реєстрація в Personenmeldeamt, дозвіл на проживання, медична страховка (~480 CHF/місяць), статус S, мовні курси та житло.",
      h1: "Путівник для новоприбулих: Цюрих",
      intro:
        "Цюрих — найбільше місто Швейцарії та її економічний центр. Тут проживає понад 440 000 людей, з яких близько 32% — іноземці. Кантон пропонує найвищий у світі рівень якості життя, розвинений ринок праці у фінансах, технологіях та фармацевтиці й ефективну систему державних послуг. Ринок житла дуже конкурентний, а реєстрація після переїзду є юридичним обов'язком.",
      registrationLead:
        "Після переїзду до Цюриха ви зобов'язані зареєструватися в Personenmeldeamt протягом 14 днів. У місті Цюрих працюють три головних офіси: Stadthaus (центр), Oerlikon (північ) та Schwamendingen (північний схід). Якщо ви живете в приміській общині — Вінтертур, Устер, Дітікон — реєструйтесь у місцевому Einwohnerkontrolle.",
      registrationOfficeName: "Personenmeldeamt Zürich – Stadthaus",
      registrationOfficeAddress: "Stadthausquai 17, 8001 Zürich",
      registrationOfficeWebsite: "stadt-zuerich.ch/prd/de/index/bev/bev_reg.html",
      registrationDocs: [
        "Дійсний паспорт або посвідчення особи",
        "Договір оренди або письмове підтвердження адреси проживання",
        "Трудовий договір або дозвіл на роботу (за наявності)",
        "Для власників статусу S: картка N",
        "Документи сім'ї: свідоцтво про шлюб, свідоцтва про народження дітей",
        "Оплата реєстраційного збору: CHF 20–30",
      ],
      permitLead:
        "Migrationsamt des Kantons Zürich займається всіма питаннями дозволів на проживання в кантоні. Громадяни ЄС/ЄЕФТ з трудовим договором отримують дозвіл B прямо в Personenmeldeamt. Громадяни третіх країн потребують спонсорства роботодавця та дозволу SEM.",
      permitStatusSNote:
        "Власники статусу S реєструються в Personenmeldeamt, пред'являючи картку N. Для питань виплат і соціальної підтримки звертайтесь до Sozialamt Kanton Zürich. Детальніше — у нашому повному гіді по статусу S.",
      healthPremium: "~480 CHF/місяць",
      healthSubsidyInfo:
        "Подавайте заяву на Prämienverbilligung (субсидія премій) на sozialversicherungen.zh.ch. У Цюриху право на субсидію мають одинокі особи з доходом до ~CHF 69 100/рік. Заявку обробляє SVA Zürich — подавайте до 31 березня. Щоб знизити премію одразу: перейдіть на модель Telmed або HMO і підвищте франшизу до CHF 2 500.",
      healthHospitalNote:
        "Основні лікарні: Університетська клініка Цюриха (USZ), Rämistrasse 100 (тел: +41 44 255 11 11) та Stadtspital Triemli, Birmensdorferstrasse 497 (тел: +41 44 416 11 11).",
      courses: [
        {
          name: "HEKS Zürich — мовні курси",
          description:
            "Безкоштовні курси німецької для власників статусу S та визнаних біженців. Рівні A1–B1, є україномовні консультанти. heks.ch/region/zurich",
        },
        {
          name: "Volkshochschule Zürich (VHS)",
          description:
            "Субсидовані курси від A1 до C1, від CHF 195 за рівень, кілька наборів на рік. volkshochschule.ch",
        },
        {
          name: "Migros Klubschule Zürich",
          description:
            "Групові курси на різних рівнях по всьому Цюриху, від CHF 250, включно з вечірніми. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1 800–2 200 / місяць",
      housingPortals: ["homegate.ch", "immoscout24.ch", "comparis.ch/immobilien", "ronorp.net"],
      housingAidInfo:
        "Wohnversorgung Zürich керує соціальним житлом — черга 2–5 років. При нагальній потребі через Sozialhilfe зверніться до soziale-einrichtungen.ch. Багато українців знаходять житло через Facebook-групи 'Українці у Цюриху' (30 000+ учасників) або 'Zürich Wohnungen'.",
      faq: [
        {
          q: "Скільки займає реєстрація в Personenmeldeamt Цюриха?",
          a: "Прийом без попереднього запису доступний у всіх трьох офісах. Сама процедура займає 15–30 хвилин. Картка дозволу надходить поштою через 2–4 тижні. Якщо потрібне підтвердження того ж дня — попросіть Bestätigung der Anmeldung.",
        },
        {
          q: "Яке найдешевше медичне страхування в Цюриху 2026?",
          a: "З франшизою CHF 2 500 і моделлю Telmed або HMO можна знизити премію з ~480 до CHF 310–360 на місяць. Порівнюйте тарифи на priminfo.admin.ch, виберіть кантон 'Zürich'. Переходьте не пізніше 30 листопада.",
        },
        {
          q: "Де отримати підтримку українською мовою у Цюриху?",
          a: "HEKS Zürich має україномовних консультантів і пропонує безкоштовні мовні курси. Facebook-група 'Українці у Цюриху' (30 000+ учасників) — найактивніша українська спільнота в місті. Також звертайтесь до HEKS та Caritas Zürich.",
        },
      ],
      blogLinks: [
        {
          href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
          label: "Статус S у Швейцарії: Повний гід для українців",
        },
        {
          href: "/uk/blog/yak-zareyestruvatysya-v-shveytcariyi",
          label: "Як зареєструватися у Швейцарії: покрокова інструкція",
        },
        {
          href: "/uk/blog/poshuk-roboty-shveytcariya-2026",
          label: "Пошук роботи у Швейцарії 2026",
        },
      ],
      sectionRegistration: "Перші кроки після приїзду",
      sectionPermit: "Дозвіл на проживання",
      sectionHealth: "Медична страховка",
      sectionCourses: "Мовні курси",
      sectionHousing: "Пошук житла",
      sectionContacts: "Корисні контакти",
      sectionFaq: "Часті запитання",
      sectionOtherCantons: "Інші великі кантони",
      sectionOtherCantonsDesc: "Перегляньте наші гіди для новоприбулих в інших кантонах:",
      colOffice: "Установа",
      colAddress: "Адреса",
      colPhone: "Телефон",
      colWebsite: "Сайт",
      deadline: "Строк реєстрації: протягом 14 днів після переїзду.",
      requiredDocs: "Необхідні документи:",
      avgPremium: "Середня премія медичного страхування (2026, дорослий, стандарт):",
      avgRent: "Середня оренда однокімнатної квартири:",
    },
  },

  geneva: {
    contacts: [
      {
        office: "Office cantonal de la population et des migrations (OCPM)",
        address: "Route de Chancy 88, 1213 Onex",
        phone: "+41 22 546 48 88",
        website: "ge.ch/ocpm",
      },
      {
        office: "Hospice Général (social support)",
        address: "Rue de Lausanne 82, 1202 Genève",
        phone: "+41 22 420 60 00",
        website: "hospicegeneral.ch",
      },
      {
        office: "Service des votations et élections / Commune register",
        address: "Rue de l'Hôtel-de-Ville 2, 1204 Genève",
        phone: "+41 22 418 20 00",
        website: "geneve.ch",
      },
      {
        office: "Hôpitaux Universitaires de Genève (HUG) — Emergency",
        address: "Rue Gabrielle-Perret-Gentil 4, 1205 Genève",
        phone: "+41 22 372 33 11",
        website: "hug.ch",
      },
    ],
    en: {
      metaTitle: "Moving to Geneva: Guide for Newcomers & Expats (2026)",
      metaDescription:
        "Complete expat guide to moving to Geneva: OCPM registration, B permit process, health insurance (avg CHF 560/month — Switzerland's highest), housing and French courses. 2026.",
      h1: "Guide for Newcomers: Geneva",
      intro:
        "Geneva is Switzerland's most international city, hosting the United Nations European Headquarters, WHO, UNHCR, ICRC, and over 200 international organizations. Foreign nationals make up approximately 40% of the canton's population. It is also Switzerland's most expensive canton for health insurance, with some of the highest rents in the country. Registration at OCPM is the first administrative step and must happen within 8 days for non-EU nationals.",
      registrationLead:
        "All newcomers to Geneva must register at the Office cantonal de la population et des migrations (OCPM). Non-EU/EFTA nationals must register within 8 days of arrival; EU/EFTA nationals have up to 3 months. Book an appointment in advance at ge.ch/ocpm — walk-in capacity is limited. OCPM also handles B and C permit issuance directly.",
      registrationOfficeName: "OCPM – Office cantonal de la population et des migrations",
      registrationOfficeAddress: "Route de Chancy 88, 1213 Onex",
      registrationOfficeWebsite: "ge.ch/ocpm",
      registrationDocs: [
        "Valid passport (non-EU) or national ID card (EU/EFTA)",
        "Rental contract or written accommodation confirmation",
        "Employment contract (for B permit applicants)",
        "Proof of financial resources or health insurance (for non-employed)",
        "Family documents: marriage certificate, children's birth certificates",
        "Passport photos (2–3)",
        "Registration fee: CHF 20–60",
      ],
      permitLead:
        "EU/EFTA citizens receive a B permit at OCPM with a valid employment contract — often issued on the same appointment. Non-EU nationals require employer sponsorship via the Service de l'emploi (OCIRT), then federal SEM approval, and a D visa from the Swiss embassy before arriving. Processing time for non-EU permits: 6–14 weeks. For family reunification, apply at OCPM with proof of relationship.",
      healthPremium: "~CHF 560/month",
      healthSubsidyInfo:
        "Geneva has the highest health insurance premiums in Switzerland. Significant savings are possible: switching to a Telmed or HMO model with a CHF 2,500 franchise can cut the premium to CHF 380–420/month. Apply for Réduction individuelle des primes (RIP / Prämienverbilligung) at social.ge.ch — Geneva's subsidies are among the most generous. Eligibility: single person income up to ~CHF 58,000/year.",
      healthHospitalNote:
        "Hôpitaux Universitaires de Genève (HUG) at Rue Gabrielle-Perret-Gentil 4 is the main public hospital and emergency centre (+41 22 372 33 11). For non-emergencies, use the Permanence médico-chirurgicale (PMC) for walk-in consultations. English-speaking GPs are widely available in Geneva.",
      courses: [
        {
          name: "Camarada – cours de français",
          description:
            "Free and low-cost French integration courses specifically designed for migrant women and families. Multiple levels, morning and afternoon sessions. camarada.ch",
        },
        {
          name: "CSP Genève – Intégration linguistique",
          description:
            "French courses subsidized by the canton, from A1 to B2. Priority given to Status S and permit holders. csp.ch",
        },
        {
          name: "Université Ouvrière de Genève (UOG)",
          description:
            "Affordable French language and integration courses open to all residents. Courses from CHF 100–250 per term. uog.ch",
        },
      ],
      housingAvgRent: "CHF 1,900–2,400 / month",
      housingPortals: ["homegate.ch", "anibis.ch", "immoscout24.ch", "Facebook: 'Logements à Genève'"],
      housingAidInfo:
        "Geneva has an extremely tight rental market (vacancy below 0.5%). Start your search before arriving. Consider living in the French border communes (Annemasse, Ferney-Voltaire) where rents are 30–50% lower and the Léman Express train reaches Geneva in 20–30 minutes. For emergency housing via Hospice Général, contact social.ge.ch.",
      faq: [
        {
          q: "Do I need to speak French to register at OCPM in Geneva?",
          a: "OCPM staff speak English and can assist you. However, all official forms and letters are in French. It's helpful to bring a French-speaking friend or use a translation app. A certified translator is not required for the initial registration appointment.",
        },
        {
          q: "Why is health insurance so expensive in Geneva, and how can I reduce it?",
          a: "Geneva's premiums are the highest in Switzerland due to higher healthcare costs in the region. To reduce costs: compare on priminfo.admin.ch, choose a Telmed model (saves 20–30%), raise your franchise to CHF 2,500, and apply for the RIP subsidy at social.ge.ch if your income qualifies.",
        },
        {
          q: "Can I work for an international organization in Geneva on a B permit?",
          a: "International organization staff typically receive a 'legitimation card' issued by the Swiss Federal Department of Foreign Affairs (DFAE) rather than a standard B permit. If you are locally recruited by an NGO or private company, a standard B permit applies. Contact OCPM for your specific situation.",
        },
      ],
      blogLinks: [
        {
          href: "/en/blog/moving-to-geneva-guide",
          label: "Moving to Geneva: The Complete Expat Guide (2026)",
        },
        {
          href: "/en/blog/swiss-tax-return-2026",
          label: "Swiss Tax Return 2026: Complete Guide for Expats",
        },
        {
          href: "/en/blog/how-to-find-job-switzerland-foreigner",
          label: "How to Find a Job in Switzerland as a Foreigner",
        },
      ],
      sectionRegistration: "First Steps After Arrival",
      sectionPermit: "Residence Permit",
      sectionHealth: "Health Insurance",
      sectionCourses: "French Language Courses",
      sectionHousing: "Finding Housing",
      sectionContacts: "Useful Contacts",
      sectionFaq: "Frequently Asked Questions",
      sectionOtherCantons: "Other Major Cantons",
      sectionOtherCantonsDesc: "Explore our newcomer guides for other Swiss cantons:",
      colOffice: "Office",
      colAddress: "Address",
      colPhone: "Phone",
      colWebsite: "Website",
      deadline: "Registration deadline: within 8 days (non-EU) or 3 months (EU/EFTA) of arrival.",
      requiredDocs: "Required documents:",
      avgPremium: "Average health insurance premium (2026, adult, standard) — highest in Switzerland:",
      avgRent: "Average 1-room apartment rent:",
    },
    uk: {
      metaTitle: "Переїзд до Женеви: гід для новоприбулих 2026",
      metaDescription:
        "Повний гід для переїзду до Женеви: реєстрація в OCPM, дозвіл B, медична страховка (~560 CHF/міс — найвища в Швейцарії), статус S, французькі курси та житло.",
      h1: "Путівник для новоприбулих: Женева",
      intro:
        "Женева — найміжнародніше місто Швейцарії: тут розміщені штаб-квартира ООН в Європі, ВООЗ, УВКБ ООН, МКЧХ та понад 200 міжнародних організацій. Іноземці становлять близько 40% населення кантону. Водночас Женева — найдорожчий кантон Швейцарії за медичним страхуванням і один із найдорожчих за орендою житла.",
      registrationLead:
        "Всі новоприбулі до Женеви реєструються в Office cantonal de la population et des migrations (OCPM). Громадяни поза ЄС/ЄЕФТ зобов'язані зареєструватися протягом 8 днів після прибуття; громадяни ЄС/ЄЕФТ мають до 3 місяців. Запис на прийом бажано зробити заздалегідь на ge.ch/ocpm.",
      registrationOfficeName: "OCPM – Office cantonal de la population et des migrations",
      registrationOfficeAddress: "Route de Chancy 88, 1213 Onex",
      registrationOfficeWebsite: "ge.ch/ocpm",
      registrationDocs: [
        "Дійсний паспорт (не ЄС) або посвідчення особи (ЄС/ЄЕФТ)",
        "Договір оренди або письмове підтвердження адреси",
        "Трудовий договір (для дозволу B)",
        "Картка N (для власників статусу S)",
        "Документи сім'ї: свідоцтво про шлюб, свідоцтва про народження дітей",
        "Фотографії (2–3 штуки)",
        "Реєстраційний збір: CHF 20–60",
      ],
      permitLead:
        "Громадяни ЄС/ЄЕФТ з трудовим договором отримують дозвіл B безпосередньо в OCPM. Громадяни третіх країн потребують спонсорства роботодавця через Service de l'emploi (OCIRT) та дозволу SEM. Термін опрацювання: 6–14 тижнів. Для возз'єднання сім'ї звертайтесь до OCPM.",
      permitStatusSNote:
        "Власники статусу S реєструються в OCPM, пред'являючи картку N. З питань фінансової підтримки та виплат звертайтесь до Hospice Général. Детальніше про статус S — у нашому повному гіді.",
      healthPremium: "~560 CHF/місяць",
      healthSubsidyInfo:
        "Женева — найдорожчий кантон за медичним страхуванням. Можна суттєво заощадити: модель Telmed або HMO з франшизою CHF 2 500 знижує премію до CHF 380–420/міс. Подавайте заяву на субсидію (RIP — Réduction individuelle des primes) на social.ge.ch. Женевські субсидії — одні з найщедріших у країні.",
      healthHospitalNote:
        "Головна лікарня — HUG (Hôpitaux Universitaires de Genève), Rue Gabrielle-Perret-Gentil 4 (тел: +41 22 372 33 11). Для невідкладних, але не екстрених ситуацій — Permanence médico-chirurgicale (PMC).",
      courses: [
        {
          name: "Camarada – cours de français",
          description:
            "Безкоштовні та доступні курси французької для мігрантів. Пріоритет — жінки та сім'ї. camarada.ch",
        },
        {
          name: "CSP Genève – Intégration linguistique",
          description:
            "Субсидовані кантоном курси французької від A1 до B2. Пріоритет для власників статусу S та дозволів. csp.ch",
        },
        {
          name: "Université Ouvrière de Genève (UOG)",
          description:
            "Доступні курси французької та інтеграції, відкриті для всіх жителів. Від CHF 100–250 за семестр. uog.ch",
        },
      ],
      housingAvgRent: "CHF 1 900–2 400 / місяць",
      housingPortals: ["homegate.ch", "anibis.ch", "immoscout24.ch", "Facebook: 'Logements à Genève'"],
      housingAidInfo:
        "Ринок житла Женеви — один із найнапруженіших у Швейцарії (рівень вакантних квартир нижче 0,5%). Розгляньте можливість жити у французьких прикордонних містах (Аннемас, Ферне-Вольтер) — там оренда на 30–50% нижча, а потяг Léman Express доїжджає до Женеви за 20–30 хвилин.",
      faq: [
        {
          q: "Чи потрібно знати французьку для реєстрації в OCPM?",
          a: "Персонал OCPM розмовляє англійською і може допомогти. Офіційні форми і листи — французькою. Бажано мати з собою франкомовного помічника або застосунок-перекладач. Офіційний перекладач для першої реєстрації не потрібен.",
        },
        {
          q: "Чому медичне страхування в Женеві найдорожче і як зекономити?",
          a: "Женева має найвищі медичні витрати в країні, що відображається на преміях. Зекономте: порівняйте тарифи на priminfo.admin.ch, оберіть модель Telmed або HMO, підвищте франшизу до CHF 2 500 та подайте заяву на субсидію RIP на social.ge.ch.",
        },
        {
          q: "Де отримати підтримку для українців у Женеві?",
          a: "Hospice Général надає соціальну підтримку власникам статусу S. CSP Genève та Camarada пропонують доступні мовні курси. Спільноти 'Українці Женева' та 'Українці Швейцарія' в Telegram активно допомагають з практичними питаннями.",
        },
      ],
      blogLinks: [
        {
          href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
          label: "Статус S у Швейцарії: Повний гід для українців",
        },
        {
          href: "/uk/blog/yak-zekonomyty-na-strakhovantsi-shveytcariya",
          label: "Як заощадити на медичному страхуванні у Швейцарії",
        },
        {
          href: "/uk/blog/poshuk-roboty-shveytcariya-2026",
          label: "Пошук роботи у Швейцарії 2026",
        },
      ],
      sectionRegistration: "Перші кроки після приїзду",
      sectionPermit: "Дозвіл на проживання",
      sectionHealth: "Медична страховка",
      sectionCourses: "Курси французької мови",
      sectionHousing: "Пошук житла",
      sectionContacts: "Корисні контакти",
      sectionFaq: "Часті запитання",
      sectionOtherCantons: "Інші великі кантони",
      sectionOtherCantonsDesc: "Перегляньте наші гіди для новоприбулих в інших кантонах:",
      colOffice: "Установа",
      colAddress: "Адреса",
      colPhone: "Телефон",
      colWebsite: "Сайт",
      deadline: "Строк реєстрації: 8 днів (не ЄС) або 3 місяці (ЄС/ЄЕФТ) після прибуття.",
      requiredDocs: "Необхідні документи:",
      avgPremium: "Середня премія медичного страхування (2026, дорослий, стандарт) — найвища в Швейцарії:",
      avgRent: "Середня оренда однокімнатної квартири:",
    },
  },

  "basel-stadt": {
    contacts: [
      {
        office: "Migrationsamt Basel-Stadt",
        address: "Spiegelgasse 12, 4051 Basel",
        phone: "+41 61 267 57 11",
        website: "bs.ch/migrationsamt",
      },
      {
        office: "Sozialhilfe Basel-Stadt",
        address: "Klybeckstrasse 15, 4005 Basel",
        phone: "+41 61 267 43 33",
        website: "sozialhilfe.bs.ch",
      },
      {
        office: "Einwohnerdienste / Bevölkerungsdienste",
        address: "Spiegelgasse 6, 4051 Basel",
        phone: "+41 61 267 55 00",
        website: "bs.ch/bev",
      },
      {
        office: "Universitätsspital Basel (USB)",
        address: "Spitalstrasse 21, 4031 Basel",
        phone: "+41 61 328 62 62",
        website: "unispital-basel.ch",
      },
    ],
    en: {
      metaTitle: "Moving to Basel: Guide for Newcomers & Expats (2026)",
      metaDescription:
        "Complete expat guide to moving to Basel-Stadt: registration, Migrationsamt, health insurance (avg CHF 510/month), pharma industry jobs, German courses and housing. 2026.",
      h1: "Guide for Newcomers: Basel-Stadt",
      intro:
        "Basel-Stadt is Switzerland's smallest canton by area but punches well above its weight — it is the global home of Novartis, Roche, and dozens of major pharmaceutical and chemical companies. With strong demand for international talent, Basel attracts professionals from around the world. Rents are more affordable than Zurich or Geneva, and the city's compact size makes it easy to navigate on foot or by tram.",
      registrationLead:
        "All newcomers to Basel-Stadt must register at the Bevölkerungsdienste (Einwohnerdienste) within 14 days of moving in. Appointments can be booked online or by phone. The Migrationsamt at Spiegelgasse 12 is the central authority for permits, extensions, and status changes.",
      registrationOfficeName: "Bevölkerungsdienste Basel-Stadt",
      registrationOfficeAddress: "Spiegelgasse 6, 4051 Basel",
      registrationOfficeWebsite: "bs.ch/bev",
      registrationDocs: [
        "Valid passport or national identity card",
        "Rental contract or accommodation confirmation",
        "Employment contract or permit documentation",
        "For Status S holders: Permit N card",
        "Family documents: marriage certificate, children's birth certificates",
        "Registration fee: approx. CHF 25",
      ],
      permitLead:
        "Residence permits for Basel-Stadt are issued by the Migrationsamt Basel-Stadt at Spiegelgasse 12. EU/EFTA citizens register at the Bevölkerungsdienste and a permit is issued automatically with proof of employment. Non-EU nationals follow the standard federal sponsorship process. Basel is home to many large international employers (Novartis, Roche, BASF) who routinely handle permit sponsorship.",
      healthPremium: "~CHF 510/month",
      healthSubsidyInfo:
        "Apply for Prämienverbilligung at baselland.ch or bs.ch — Basel-Stadt has its own administration. Check eligibility at the cantonal social insurance office. To reduce premiums, compare on priminfo.admin.ch and consider a Telmed model with CHF 2,500 franchise (saves up to CHF 140/month).",
      healthHospitalNote:
        "Main hospital: Universitätsspital Basel (USB) at Spitalstrasse 21 (+41 61 328 62 62). Felix Platter Hospital (+41 61 326 41 41) is another major facility. Emergency line: 144.",
      courses: [
        {
          name: "Volkshochschule beider Basel",
          description:
            "German courses for all levels, with subsidized rates for low-income participants. Extensive schedule including evenings and Saturdays. vhsbb.ch",
        },
        {
          name: "HEKS Basel – Sprachkurse",
          description:
            "Free German integration courses for Status S holders and refugees in the Basel-Stadt and Basel-Landschaft region. heks.ch/region/nordwestschweiz",
        },
        {
          name: "Migros Klubschule Basel",
          description:
            "Group German courses at all levels, multiple locations in the Basel area. From CHF 230 per course level. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1,500–1,900 / month",
      housingPortals: ["homegate.ch", "immoscout24.ch", "ronorp.net", "Facebook: 'Basel Wohnungen'"],
      housingAidInfo:
        "Basel offers more affordable rents than Zurich or Geneva, making it easier to find housing within a reasonable budget. Newly arrived Status S holders seeking temporary accommodation can contact the Sozialhilfe Basel-Stadt. Many pharmaceutical companies offer temporary housing to newly recruited employees — check your employer's relocation support.",
      faq: [
        {
          q: "Does Basel-Stadt have a large international expat community?",
          a: "Yes — approximately 36% of Basel-Stadt's population are foreign nationals, one of the highest proportions in Switzerland. English is widely spoken, particularly in the pharmaceutical and chemical industries. InterNations Basel hosts regular networking events for expats.",
        },
        {
          q: "How do I get to work in the pharma companies from Basel city?",
          a: "Both Novartis (Fabrikstrasse 2) and Roche (Grenzacherstrasse 124) campus sites are reachable by tram from the city centre in under 15 minutes. A monthly BVB transit pass for Basel-Stadt costs CHF 86.",
        },
        {
          q: "Is Basel-Stadt close to France and Germany?",
          a: "Yes — Basel is at the intersection of Switzerland, France, and Germany (the 'Dreiländereck'). German cities Freiburg and Mulhouse/Colmar in France are 30–45 minutes away. Many expats live in French Alsace or German Baden region where rents are lower and commute in daily.",
        },
      ],
      blogLinks: [
        {
          href: "/en/blog/swiss-residence-permit-guide",
          label: "Swiss Residence Permit B: Complete Guide for Expats",
        },
        {
          href: "/en/blog/how-to-register-switzerland",
          label: "How to Register in Switzerland as a Foreigner",
        },
        {
          href: "/en/blog/work-permit-switzerland-non-eu-2026",
          label: "Work Permit Switzerland for Non-EU Citizens (2026)",
        },
      ],
      sectionRegistration: "First Steps After Arrival",
      sectionPermit: "Residence Permit",
      sectionHealth: "Health Insurance",
      sectionCourses: "German Language Courses",
      sectionHousing: "Finding Housing",
      sectionContacts: "Useful Contacts",
      sectionFaq: "Frequently Asked Questions",
      sectionOtherCantons: "Other Major Cantons",
      sectionOtherCantonsDesc: "Explore our newcomer guides for other Swiss cantons:",
      colOffice: "Office",
      colAddress: "Address",
      colPhone: "Phone",
      colWebsite: "Website",
      deadline: "Registration deadline: within 14 days of arrival.",
      requiredDocs: "Required documents:",
      avgPremium: "Average health insurance premium (2026, adult, standard):",
      avgRent: "Average 1-room apartment rent:",
    },
    uk: {
      metaTitle: "Переїзд до Базеля: гід для новоприбулих 2026",
      metaDescription:
        "Повний гід для переїзду до Базеля: реєстрація, Migrationsamt, медична страховка (~510 CHF/міс), фармацевтична галузь, статус S, мовні курси та житло.",
      h1: "Путівник для новоприбулих: Базель-Штадт",
      intro:
        "Базель-Штадт — найменший кантон Швейцарії за площею, але один із найпотужніших за економічним значенням. Тут розміщені штаб-квартири Novartis, Roche та десятків провідних фармацевтичних і хімічних компаній. Оренда житла тут доступніша, ніж у Цюриху чи Женеві, а компактний розмір міста робить його зручним для щоденного життя.",
      registrationLead:
        "Всі новоприбулі до Базель-Штадту реєструються у Bevölkerungsdienste протягом 14 днів після переїзду. Запис можливий онлайн або по телефону. Питання дозволів — у Migrationsamt Basel-Stadt за адресою Spiegelgasse 12.",
      registrationOfficeName: "Bevölkerungsdienste Basel-Stadt",
      registrationOfficeAddress: "Spiegelgasse 6, 4051 Basel",
      registrationOfficeWebsite: "bs.ch/bev",
      registrationDocs: [
        "Дійсний паспорт або посвідчення особи",
        "Договір оренди або підтвердження адреси",
        "Трудовий договір або документи про підставу перебування",
        "Для власників статусу S: картка N",
        "Документи сім'ї: свідоцтво про шлюб, свідоцтва про народження дітей",
        "Реєстраційний збір: ~CHF 25",
      ],
      permitLead:
        "Дозволи на проживання у Базель-Штадті видає Migrationsamt Basel-Stadt (Spiegelgasse 12). Громадяни ЄС/ЄЕФТ з трудовим договором отримують дозвіл B автоматично. Для громадян поза ЄС потрібне спонсорство роботодавця (Novartis, Roche та інші великі компанії регулярно оформлюють дозволи).",
      permitStatusSNote:
        "Власники статусу S звертаються до Sozialhilfe Basel-Stadt для підтримки та до Bevölkerungsdienste для реєстрації. Детальніше — у нашому гіді по статусу S.",
      healthPremium: "~510 CHF/місяць",
      healthSubsidyInfo:
        "Заявка на Prämienverbilligung подається до Canton Basel-Stadt. Перевірте право на субсидію та порівняйте тарифи на priminfo.admin.ch. Модель Telmed або HMO з франшизою CHF 2 500 зменшить премію приблизно на CHF 130–140 на місяць.",
      healthHospitalNote:
        "Головна лікарня: Universitätsspital Basel (USB), Spitalstrasse 21 (тел: +41 61 328 62 62). Швидка допомога: 144.",
      courses: [
        {
          name: "Volkshochschule beider Basel",
          description:
            "Курси німецької для всіх рівнів, субсидовані для малозабезпечених. Вечірні та суботні групи. vhsbb.ch",
        },
        {
          name: "HEKS Basel – Sprachkurse",
          description:
            "Безкоштовні курси для власників статусу S та біженців у регіоні Базель. heks.ch/region/nordwestschweiz",
        },
        {
          name: "Migros Klubschule Basel",
          description: "Групові курси всіх рівнів у кількох локаціях, від CHF 230 за рівень. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1 500–1 900 / місяць",
      housingPortals: ["homegate.ch", "immoscout24.ch", "ronorp.net", "Facebook: 'Basel Wohnungen'"],
      housingAidInfo:
        "Базель пропонує доступнішу оренду порівняно з Цюрихом і Женевою. Власники статусу S можуть звернутися до Sozialhilfe Basel-Stadt щодо тимчасового житла. Багато фармацевтичних компаній надають тимчасове житло новим співробітникам — дізнайтесь у роботодавця.",
      faq: [
        {
          q: "Чи велика міжнародна спільнота в Базелі?",
          a: "Так. Близько 36% населення Базель-Штадту — іноземці, один із найвищих показників у Швейцарії. Англійська широко вживана у фарм- і хімічній галузях. InterNations Basel проводить регулярні заходи для експатів.",
        },
        {
          q: "Де шукати роботу у фармацевтичному секторі Базеля?",
          a: "Novartis і Roche публікують вакансії на своїх сайтах. Також pharmajobs.ch та LinkedIn активно використовуються для пошуку в Basel BioValley — одному з найбільших фармацевтичних кластерів у світі.",
        },
        {
          q: "Де отримати підтримку для українців у Базелі?",
          a: "HEKS Basel пропонує безкоштовні мовні курси та консультації для власників статусу S. Telegram-група 'Українці Базель' та Caritas Basel-Stadt — активні ресурси підтримки.",
        },
      ],
      blogLinks: [
        {
          href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
          label: "Статус S у Швейцарії: Повний гід для українців",
        },
        {
          href: "/uk/blog/medychne-strakhuvannya-shveytcariya",
          label: "Медичне страхування у Швейцарії для іноземців",
        },
        {
          href: "/uk/blog/poshuk-roboty-u-shveytcariyi",
          label: "Пошук роботи у Швейцарії",
        },
      ],
      sectionRegistration: "Перші кроки після приїзду",
      sectionPermit: "Дозвіл на проживання",
      sectionHealth: "Медична страховка",
      sectionCourses: "Мовні курси",
      sectionHousing: "Пошук житла",
      sectionContacts: "Корисні контакти",
      sectionFaq: "Часті запитання",
      sectionOtherCantons: "Інші великі кантони",
      sectionOtherCantonsDesc: "Перегляньте наші гіди для новоприбулих в інших кантонах:",
      colOffice: "Установа",
      colAddress: "Адреса",
      colPhone: "Телефон",
      colWebsite: "Сайт",
      deadline: "Строк реєстрації: протягом 14 днів після переїзду.",
      requiredDocs: "Необхідні документи:",
      avgPremium: "Середня премія медичного страхування (2026, дорослий, стандарт):",
      avgRent: "Середня оренда однокімнатної квартири:",
    },
  },

  bern: {
    contacts: [
      {
        office: "Migrationsdienst des Kantons Bern (MIDI)",
        address: "Ostermundigenstrasse 99B, 3006 Bern",
        phone: "+41 31 633 56 11",
        website: "be.ch/migration",
      },
      {
        office: "Sozialamt Kanton Bern",
        address: "Münstergasse 45, 3011 Bern",
        phone: "+41 31 636 50 50",
        website: "be.ch/sozialamt",
      },
      {
        office: "Einwohnergemeinde Bern – Einwohnerdienste",
        address: "Predigergasse 5, 3011 Bern",
        phone: "+41 31 321 61 61",
        website: "bern.ch/einwohnerdienste",
      },
      {
        office: "Inselspital Bern – Emergency",
        address: "Freiburgstrasse 18, 3010 Bern",
        phone: "+41 31 632 21 11",
        website: "insel.ch",
      },
    ],
    en: {
      metaTitle: "Moving to Bern: Guide for Newcomers & Expats (2026)",
      metaDescription:
        "Expat guide to moving to Bern: registration at Einwohnerdienste, MIDI migration office, health insurance (avg CHF 470/month), housing and German courses. Updated 2026.",
      h1: "Guide for Newcomers: Bern",
      intro:
        "Bern is Switzerland's federal capital and a UNESCO World Heritage Site, known for its medieval arcades, bear parks, and unhurried pace compared to Zurich. Home to federal government institutions, international organizations, and a thriving university city atmosphere, Bern attracts both civil servants and students. Rents are below Zurich levels, making it an attractive option for newcomers.",
      registrationLead:
        "After arriving in Bern city, register at the Einwohnerdienste Bern within 14 days. If you live in a commune outside the city (e.g. Köniz, Ostermundigen, Muri bei Bern), register at that commune's Einwohnerkontrolle. Permit questions and extensions are handled separately by the Migrationsdienst des Kantons Bern (MIDI).",
      registrationOfficeName: "Einwohnerdienste Bern",
      registrationOfficeAddress: "Predigergasse 5, 3011 Bern",
      registrationOfficeWebsite: "bern.ch/einwohnerdienste",
      registrationDocs: [
        "Valid passport or national identity card",
        "Rental contract or accommodation confirmation",
        "Employment contract or proof of income",
        "For Status S holders: Permit N card",
        "Family documents: marriage certificate, children's birth certificates",
        "Registration fee: approx. CHF 25–35",
      ],
      permitLead:
        "The Migrationsdienst des Kantons Bern (MIDI) at Ostermundigenstrasse 99B handles all residence permit processes. EU/EFTA citizens are registered at the Einwohnerdienste and their permit issued automatically. Non-EU nationals require the standard employer sponsorship and SEM federal approval process before arriving.",
      healthPremium: "~CHF 470/month",
      healthSubsidyInfo:
        "Apply for Prämienverbilligung at be.ch/praemienverbilligung. Single-person households with income up to approximately CHF 65,000/year may qualify. The Sozialversicherungsanstalt Bern processes applications. Compare premiums at priminfo.admin.ch — Telmed and HMO models with CHF 2,500 franchise can reduce the premium to around CHF 300–340/month.",
      healthHospitalNote:
        "Main hospital: Inselspital Bern at Freiburgstrasse 18 (+41 31 632 21 11) — one of Switzerland's largest university hospitals. Lindenhofspital (+41 31 300 88 11) is another major facility. Emergency line: 144.",
      courses: [
        {
          name: "BUAS (Berner Fachhochschule) – Deutschkurse",
          description:
            "German language courses for newcomers, including integration courses subsidized by the canton. bfh.ch",
        },
        {
          name: "Caritas Bern – Sprachkurse",
          description:
            "Free and affordable German integration courses for newcomers with low income, Status S holders, and refugees. caritas-bern.ch",
        },
        {
          name: "Migros Klubschule Bern",
          description:
            "German courses from A1 to C1 at multiple Bern locations, from CHF 220 per course level. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1,400–1,800 / month",
      housingPortals: ["homegate.ch", "immoscout24.ch", "comparis.ch/immobilien", "immobilien.ch"],
      housingAidInfo:
        "Bern offers more accessible housing than Zurich, though competition in the city centre is still significant. The city-run Wohnbaugenossenschaften (housing cooperatives) provide subsidized housing — long waitlists apply. For temporary housing, contact the Sozialamt Kanton Bern. Newcomers sometimes find short-term furnished rooms on Ronorp.net or Flatfox.ch.",
      faq: [
        {
          q: "Is Bern a good city for English speakers?",
          a: "Bern is predominantly German-speaking. English proficiency is common among younger professionals and in the federal and international sector, but daily life — shops, bureaucracy, neighbours — largely operates in Bernese German. Learning High German (Hochdeutsch) is strongly recommended.",
        },
        {
          q: "How do I commute within and around Bern?",
          a: "Bern's public transport (Bernmobil — trams and buses) is excellent. A monthly city pass costs approx. CHF 78. The SBB mainline station (Bern Hauptbahnhof) connects to Zurich (58 min), Geneva (1h45) and Basel (55 min). S-Bahn covers suburbs. The city is also highly cycle-friendly.",
        },
        {
          q: "Are there international schools in Bern for expat families?",
          a: "Yes — the International School of Berne (ISB) in Gümligenand the École Française de Berne are the main options. Swiss public schools teach in German but are required to accept all resident children regardless of language level — integration support is provided.",
        },
      ],
      blogLinks: [
        {
          href: "/en/blog/how-to-register-switzerland",
          label: "How to Register in Switzerland as a Foreigner",
        },
        {
          href: "/en/blog/swiss-tax-return-2026",
          label: "Swiss Tax Return 2026: Complete Guide for Expats",
        },
        {
          href: "/en/blog/best-expat-apps-switzerland",
          label: "Best Apps for Expats in Switzerland (2026)",
        },
      ],
      sectionRegistration: "First Steps After Arrival",
      sectionPermit: "Residence Permit",
      sectionHealth: "Health Insurance",
      sectionCourses: "German Language Courses",
      sectionHousing: "Finding Housing",
      sectionContacts: "Useful Contacts",
      sectionFaq: "Frequently Asked Questions",
      sectionOtherCantons: "Other Major Cantons",
      sectionOtherCantonsDesc: "Explore our newcomer guides for other Swiss cantons:",
      colOffice: "Office",
      colAddress: "Address",
      colPhone: "Phone",
      colWebsite: "Website",
      deadline: "Registration deadline: within 14 days of arrival.",
      requiredDocs: "Required documents:",
      avgPremium: "Average health insurance premium (2026, adult, standard):",
      avgRent: "Average 1-room apartment rent:",
    },
    uk: {
      metaTitle: "Переїзд до Берна: гід для новоприбулих 2026",
      metaDescription:
        "Повний гід для переїзду до Берна: реєстрація в Einwohnerdienste, MIDI, медична страховка (~470 CHF/місяць), статус S, мовні курси та пошук житла.",
      h1: "Путівник для новоприбулих: Берн",
      intro:
        "Берн — федеральна столиця Швейцарії та пам'ятка ЮНЕСКО, відома середньовічними аркадами та повільнішим темпом порівняно з Цюрихом. Тут розміщені федеральні урядові установи, міжнародні організації та активне університетське місто. Ціни на оренду помірніші, ніж у Цюриху, що робить Берн привабливим для новоприбулих.",
      registrationLead:
        "Після переїзду до Берна реєструйтесь в Einwohnerdienste Bern протягом 14 днів. Якщо ви живете в передмісті (Кьоніц, Остермундіген, Мурі-бай-Берн) — реєструйтесь у місцевому Einwohnerkontrolle тієї общини. Питання дозволів — у MIDI.",
      registrationOfficeName: "Einwohnerdienste Bern",
      registrationOfficeAddress: "Predigergasse 5, 3011 Bern",
      registrationOfficeWebsite: "bern.ch/einwohnerdienste",
      registrationDocs: [
        "Дійсний паспорт або посвідчення особи",
        "Договір оренди або підтвердження адреси",
        "Трудовий договір або підтвердження доходу",
        "Для власників статусу S: картка N",
        "Документи сім'ї: свідоцтво про шлюб, свідоцтва про народження дітей",
        "Реєстраційний збір: ~CHF 25–35",
      ],
      permitLead:
        "Migrationsdienst des Kantons Bern (MIDI) займається питаннями дозволів. Громадяни ЄС/ЄЕФТ з трудовим договором отримують дозвіл B автоматично. Для громадян поза ЄС потрібне спонсорство роботодавця та дозвіл SEM.",
      permitStatusSNote:
        "Власники статусу S реєструються в Einwohnerdienste, пред'являючи картку N. Для питань виплат — Sozialamt Kanton Bern. Детальніше про статус S — у нашому гіді.",
      healthPremium: "~470 CHF/місяць",
      healthSubsidyInfo:
        "Заявка на Prämienverbilligung — на be.ch/praemienverbilligung. Право мають одинокі особи з доходом до ~CHF 65 000/рік. Порівнюйте тарифи на priminfo.admin.ch. Модель Telmed або HMO з франшизою CHF 2 500 знизить премію до ~CHF 300–340 на місяць.",
      healthHospitalNote:
        "Головна лікарня: Inselspital Bern, Freiburgstrasse 18 (тел: +41 31 632 21 11). Швидка допомога: 144.",
      courses: [
        {
          name: "Caritas Bern – Sprachkurse",
          description:
            "Безкоштовні курси для власників статусу S, біженців та малозабезпечених. caritas-bern.ch",
        },
        {
          name: "BUAS – Deutschkurse",
          description:
            "Курси інтеграції, субсидовані кантоном. bfh.ch",
        },
        {
          name: "Migros Klubschule Bern",
          description: "Від A1 до C1, від CHF 220 за рівень, кілька локацій у місті. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1 400–1 800 / місяць",
      housingPortals: ["homegate.ch", "immoscout24.ch", "flatfox.ch", "ronorp.net"],
      housingAidInfo:
        "Берн доступніший за Цюрих та Женеву. Субсидоване житло від Wohnbaugenossenschaften — черга кілька років. Для тимчасового житла — Sozialamt Kanton Bern. Кімнати та квартири на короткий термін — Ronorp.net та Flatfox.ch.",
      faq: [
        {
          q: "Чи є в Берні велика українська спільнота?",
          a: "Так. У Берні та регіоні є кілька організацій підтримки для українців: Caritas Bern, HEKS та федеральні соціальні служби. Telegram-групи 'Українці Берн' та 'Українці Швейцарія' допомагають з практичними питаннями.",
        },
        {
          q: "Як пересуватися між Берном та іншими містами?",
          a: "Залізниця SBB — основний вид транспорту. Цюрих — 58 хвилин, Женева — 1 год 45 хв, Базель — 55 хвилин. Місячний квиток Bernmobil на місто — ~CHF 78. S-Bahn охоплює передмістя.",
        },
        {
          q: "Де в Берні знайти англомовного лікаря?",
          a: "Inselspital Bern має міжнародний відділ з англомовними лікарями. Для пошуку GP — Zuweiser.ch або ärzte.ch з фільтром 'English'. Багато лікарів у центрі Берна розмовляють англійською.",
        },
      ],
      blogLinks: [
        {
          href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
          label: "Статус S у Швейцарії: Повний гід для українців",
        },
        {
          href: "/uk/blog/medychne-strakhuvannya-shveytcariya",
          label: "Медичне страхування у Швейцарії для іноземців",
        },
        {
          href: "/uk/blog/yak-zareyestruvatysya-v-shveytcariyi",
          label: "Як зареєструватися у Швейцарії",
        },
      ],
      sectionRegistration: "Перші кроки після приїзду",
      sectionPermit: "Дозвіл на проживання",
      sectionHealth: "Медична страховка",
      sectionCourses: "Мовні курси",
      sectionHousing: "Пошук житла",
      sectionContacts: "Корисні контакти",
      sectionFaq: "Часті запитання",
      sectionOtherCantons: "Інші великі кантони",
      sectionOtherCantonsDesc: "Перегляньте наші гіди для новоприбулих в інших кантонах:",
      colOffice: "Установа",
      colAddress: "Адреса",
      colPhone: "Телефон",
      colWebsite: "Сайт",
      deadline: "Строк реєстрації: протягом 14 днів після переїзду.",
      requiredDocs: "Необхідні документи:",
      avgPremium: "Середня премія медичного страхування (2026, дорослий, стандарт):",
      avgRent: "Середня оренда однокімнатної квартири:",
    },
  },

  vaud: {
    contacts: [
      {
        office: "Service de la population (SPOP)",
        address: "Avenue de Beaulieu 19, 1014 Lausanne",
        phone: "+41 21 316 41 11",
        website: "vd.ch/spop",
      },
      {
        office: "Service social Lausanne",
        address: "Avenue Jomini 14, 1004 Lausanne",
        phone: "+41 21 315 75 75",
        website: "lausanne.ch/social",
      },
      {
        office: "Contrôle des habitants Lausanne",
        address: "Place de la Riponne 10, 1014 Lausanne",
        phone: "+41 21 315 33 00",
        website: "lausanne.ch/habitant",
      },
      {
        office: "Centre Hospitalier Universitaire Vaudois (CHUV)",
        address: "Rue du Bugnon 46, 1011 Lausanne",
        phone: "+41 21 314 11 11",
        website: "chuv.ch",
      },
    ],
    en: {
      metaTitle: "Moving to Vaud (Lausanne): Guide for Newcomers & Expats (2026)",
      metaDescription:
        "Complete expat guide to moving to Vaud and Lausanne: SPOP registration, B permit, health insurance (~CHF 500/month), French courses, Lake Geneva housing. 2026.",
      h1: "Guide for Newcomers: Vaud (Lausanne)",
      intro:
        "Vaud is a large, French-speaking canton on the shores of Lake Geneva, with Lausanne as its vibrant capital. Lausanne hosts the International Olympic Committee (IOC), the Court of Arbitration for Sport, several major international companies, and the prestigious EPFL (École Polytechnique Fédérale de Lausanne). The canton offers stunning lake and mountain scenery, a dynamic cultural scene, and a more relaxed pace than Geneva — at somewhat lower cost.",
      registrationLead:
        "Newcomers to Lausanne register at the Contrôle des habitants within 14 days of arriving. Other Vaud communes have their own offices — check your commune's website. The Service de la population (SPOP) at Avenue de Beaulieu 19 in Lausanne handles all cantonal permit matters, renewals, and status changes.",
      registrationOfficeName: "Contrôle des habitants de Lausanne",
      registrationOfficeAddress: "Place de la Riponne 10, 1014 Lausanne",
      registrationOfficeWebsite: "lausanne.ch/habitant",
      registrationDocs: [
        "Valid passport (non-EU) or national ID card (EU/EFTA)",
        "Rental contract or written accommodation confirmation",
        "Employment contract (for B permit)",
        "For Status S holders: Permit N card",
        "Family documents: marriage certificate, children's birth certificates",
        "Registration fee: approx. CHF 20–40",
      ],
      permitLead:
        "All residence permit processing for Vaud canton is handled by the Service de la population (SPOP). EU/EFTA citizens with a valid employment contract register at the Contrôle des habitants and receive a B permit. Non-EU nationals require the standard federal sponsorship process. SPOP also handles extensions, family reunification, and changes of cantonal status.",
      healthPremium: "~CHF 500/month",
      healthSubsidyInfo:
        "Apply for Subsides d'assurance maladie (premium reductions) at vd.ch/subsides. Vaud has relatively generous income thresholds — a single person earning up to approx. CHF 60,000/year may qualify. The Service des assurances sociales et de l'hébergement (SASH) administers subsidies. Compare premiums at priminfo.admin.ch — Telmed models in Vaud save approximately 20–25% vs. standard.",
      healthHospitalNote:
        "Main hospital: CHUV (Centre Hospitalier Universitaire Vaudois) at Rue du Bugnon 46 (+41 21 314 11 11) — one of Switzerland's five university hospitals. Clinique Bois-Cerf and Clinique Cecil are major private facilities in Lausanne. Emergency line: 144.",
      courses: [
        {
          name: "ÉLAN – Cours de français",
          description:
            "Free French integration courses for permit holders and Status S residents in the Vaud region. Various levels, mornings and afternoons. elan-vd.ch",
        },
        {
          name: "Lire et Écrire Vaud",
          description:
            "French literacy and integration courses for newcomers with basic language skills. Free for qualified participants. lire-et-ecrire.ch/vaud",
        },
        {
          name: "OSEO Vaud – Intégration",
          description:
            "French courses and professional integration support for migrants. Priority for Status S holders and permit holders. oseo-vd.ch",
        },
      ],
      housingAvgRent: "CHF 1,600–2,000 / month (Lausanne)",
      housingPortals: ["homegate.ch", "immoscout24.ch", "anibis.ch", "Facebook: 'Lausanne Logements'"],
      housingAidInfo:
        "Lausanne's housing market is competitive but less extreme than Geneva. Suburban communes like Renens, Prilly, Crissier, and Morges offer lower rents (CHF 1,400–1,700) with excellent tram and bus connections to Lausanne. Students can try EPFL housing or Unigestion residences. For emergency housing support, contact the Service social Lausanne.",
      faq: [
        {
          q: "Do I need to speak French to live in Vaud?",
          a: "French is the official language of Vaud. English is widely spoken in international organizations, EPFL/UNIL, and tourism-related work, but daily life — administration, shopping, neighbours, local jobs — operates in French. Investing in French from day one is essential for integration.",
        },
        {
          q: "What is the IOC and how does working there affect my permit?",
          a: "The International Olympic Committee headquartered in Lausanne employs internationally recruited staff who typically receive a legitimation card from the Swiss DFAE rather than a standard permit. If you are locally recruited at an IOC-adjacent company, a standard B permit applies.",
        },
        {
          q: "How is transport between Lausanne and Geneva?",
          a: "Lausanne to Geneva by direct IC train takes 33–40 minutes. The TL (Lausanne public transit) monthly pass costs approx. CHF 76. The M1 and M2 metro lines connect the lake area to the university and train station. Many Vaud residents work in Geneva and commute daily.",
        },
      ],
      blogLinks: [
        {
          href: "/en/blog/moving-to-geneva-guide",
          label: "Moving to Geneva: The Complete Expat Guide (2026)",
        },
        {
          href: "/en/blog/how-to-register-switzerland",
          label: "How to Register in Switzerland as a Foreigner",
        },
        {
          href: "/en/blog/swiss-tax-return-2026",
          label: "Swiss Tax Return 2026: Complete Guide for Expats",
        },
      ],
      sectionRegistration: "First Steps After Arrival",
      sectionPermit: "Residence Permit",
      sectionHealth: "Health Insurance",
      sectionCourses: "French Language Courses",
      sectionHousing: "Finding Housing",
      sectionContacts: "Useful Contacts",
      sectionFaq: "Frequently Asked Questions",
      sectionOtherCantons: "Other Major Cantons",
      sectionOtherCantonsDesc: "Explore our newcomer guides for other Swiss cantons:",
      colOffice: "Office",
      colAddress: "Address",
      colPhone: "Phone",
      colWebsite: "Website",
      deadline: "Registration deadline: within 14 days of arrival.",
      requiredDocs: "Required documents:",
      avgPremium: "Average health insurance premium (2026, adult, standard):",
      avgRent: "Average 1-room apartment rent in Lausanne:",
    },
    uk: {
      metaTitle: "Переїзд до Во (Лозанна): гід для новоприбулих 2026",
      metaDescription:
        "Повний гід для переїзду до кантону Во та Лозанни: реєстрація в SPOP, дозвіл B, медична страховка (~500 CHF/міс), статус S, курси французької та житло.",
      h1: "Путівник для новоприбулих: Кантон Во (Лозанна)",
      intro:
        "Кантон Во — великий франкомовний кантон на берегах Женевського озера з Лозанною як столицею. Тут розміщені Міжнародний олімпійський комітет (МОК), EPFL та низка великих міжнародних компаній. Кантон пропонує чудові краєвиди та динамічне культурне життя при дещо нижчих витратах, ніж у Женеві.",
      registrationLead:
        "Новоприбулі до Лозанни реєструються в Contrôle des habitants протягом 14 днів. В інших общинах Во — у відповідних комунальних офісах. SPOP (Service de la population) в Лозанні займається всіма питаннями кантональних дозволів.",
      registrationOfficeName: "Contrôle des habitants de Lausanne",
      registrationOfficeAddress: "Place de la Riponne 10, 1014 Lausanne",
      registrationOfficeWebsite: "lausanne.ch/habitant",
      registrationDocs: [
        "Дійсний паспорт (не ЄС) або посвідчення особи (ЄС/ЄЕФТ)",
        "Договір оренди або підтвердження адреси",
        "Трудовий договір (для дозволу B)",
        "Для власників статусу S: картка N",
        "Документи сім'ї: свідоцтво про шлюб, свідоцтва дітей",
        "Реєстраційний збір: ~CHF 20–40",
      ],
      permitLead:
        "Дозволи в кантоні Во видає SPOP. Громадяни ЄС/ЄЕФТ з трудовим договором реєструються в Contrôle des habitants і отримують дозвіл B. Для громадян поза ЄС — стандартна федеральна процедура спонсорства.",
      permitStatusSNote:
        "Власники статусу S реєструються в Contrôle des habitants та звертаються до SASH або Service social для підтримки. Детальніше — у нашому гіді по статусу S.",
      healthPremium: "~500 CHF/місяць",
      healthSubsidyInfo:
        "Заявка на субсидії (Subsides d'assurance maladie) — на vd.ch/subsides. Во пропонує щедрі субсидії: одинокі особи з доходом до ~CHF 60 000/рік можуть мати право. Для економії: модель Telmed на priminfo.admin.ch зменшить премію на 20–25%.",
      healthHospitalNote:
        "Головна лікарня: CHUV (Centre Hospitalier Universitaire Vaudois), Rue du Bugnon 46 (тел: +41 21 314 11 11). Швидка допомога: 144.",
      courses: [
        {
          name: "ÉLAN – Cours de français",
          description:
            "Безкоштовні курси французької для власників дозволів та статусу S у кантоні Во. elan-vd.ch",
        },
        {
          name: "OSEO Vaud – Intégration",
          description:
            "Курси французької та підтримка у пошуку роботи для мігрантів. Пріоритет для власників статусу S. oseo-vd.ch",
        },
        {
          name: "Lire et Écrire Vaud",
          description:
            "Курси французької грамотності та інтеграції. Безкоштовно для eligible учасників. lire-et-ecrire.ch/vaud",
        },
      ],
      housingAvgRent: "CHF 1 600–2 000 / місяць (Лозанна)",
      housingPortals: ["homegate.ch", "immoscout24.ch", "anibis.ch", "Facebook: 'Lausanne Logements'"],
      housingAidInfo:
        "Лозанна менш напружена, ніж Женева. Передмістя Ренан, Прій, Кріс'є та Морж пропонують нижчі ціни (CHF 1 400–1 700) з хорошим транспортом до центру. Для тимчасового житла — Service social Lausanne.",
      faq: [
        {
          q: "Чи обов'язково знати французьку для проживання у Во?",
          a: "Так. Французька — офіційна мова кантону. У міжнародних організаціях та EPFL англійська поширена, але щоденне життя — адміністрація, магазини, сусіди — французьке. Мовні курси бажано розпочати одразу після приїзду.",
        },
        {
          q: "Як добратися з Лозанни до Женеви?",
          a: "Прямим IC-потягом — 33–40 хвилин. Місячний квиток TL (Лозаннський транспорт) — ~CHF 76. Метро M2 з'єднує берег озера з вокзалом та університетом.",
        },
        {
          q: "Де шукати підтримку для українців у Лозанні та кантоні Во?",
          a: "OSEO Vaud та Caritas Vaud надають підтримку власникам статусу S. ÉLAN пропонує безкоштовні курси французької. Telegram-спільноти 'Українці Лозанна' та 'Українці Швейцарія' активно обмінюються порадами.",
        },
      ],
      blogLinks: [
        {
          href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
          label: "Статус S у Швейцарії: Повний гід для українців",
        },
        {
          href: "/uk/blog/yak-zekonomyty-na-strakhovantsi-shveytcariya",
          label: "Як заощадити на медичному страхуванні у Швейцарії",
        },
        {
          href: "/uk/blog/poshuk-roboty-shveytcariya-2026",
          label: "Пошук роботи у Швейцарії 2026",
        },
      ],
      sectionRegistration: "Перші кроки після приїзду",
      sectionPermit: "Дозвіл на проживання",
      sectionHealth: "Медична страховка",
      sectionCourses: "Курси французької мови",
      sectionHousing: "Пошук житла",
      sectionContacts: "Корисні контакти",
      sectionFaq: "Часті запитання",
      sectionOtherCantons: "Інші великі кантони",
      sectionOtherCantonsDesc: "Перегляньте наші гіди для новоприбулих в інших кантонах:",
      colOffice: "Установа",
      colAddress: "Адреса",
      colPhone: "Телефон",
      colWebsite: "Сайт",
      deadline: "Строк реєстрації: протягом 14 днів після переїзду.",
      requiredDocs: "Необхідні документи:",
      avgPremium: "Середня премія медичного страхування (2026, дорослий, стандарт):",
      avgRent: "Середня оренда однокімнатної квартири у Лозанні:",
    },
  },

  lucerne: {
    contacts: [
      {
        office: "Dienststelle Asyl- und Flüchtlingswesen (DAF)",
        address: "Morgartenstrasse 3, 6002 Luzern",
        phone: "+41 41 228 70 60",
        website: "lu.ch/asyl",
      },
      {
        office: "Dienststelle Soziales und Gesellschaft (DISG)",
        address: "Rösslimattstrasse 37, 6002 Luzern",
        phone: "+41 41 228 68 00",
        website: "lu.ch/soziales",
      },
      {
        office: "Einwohnerkontrolle Stadt Luzern",
        address: "Hirschengraben 17, 6002 Luzern",
        phone: "+41 41 208 81 81",
        website: "stadtluzern.ch/einwohner",
      },
      {
        office: "Luzerner Kantonsspital (LUKS) – Emergency",
        address: "Spitalstrasse 1, 6000 Luzern 16",
        phone: "+41 41 205 11 11",
        website: "luks.ch",
      },
    ],
    en: {
      metaTitle: "Moving to Lucerne: Guide for Newcomers & Expats (2026)",
      metaDescription:
        "Expat guide to moving to Lucerne: registration at Einwohnerkontrolle, DAF migration office, health insurance (~CHF 430/month — one of lowest in Switzerland), housing and German courses. 2026.",
      h1: "Guide for Newcomers: Lucerne",
      intro:
        "Lucerne is one of Switzerland's most beautiful cities, set on the shores of Lake Lucerne surrounded by the Alps. It combines a thriving tourism economy with a growing service sector, and is conveniently central — equidistant from Zurich, Bern, and Basel. Health insurance premiums here are among the lowest in Switzerland, and rents are more moderate than in the major cities, making it an attractive option for budget-conscious newcomers.",
      registrationLead:
        "Newcomers to Lucerne city register at the Einwohnerkontrolle Stadt Luzern within 14 days. For other communes in the canton, register at the local Gemeindeamt. The cantonal authority for asylum seekers and refugees (DAF — Dienststelle Asyl- und Flüchtlingswesen) at Morgartenstrasse 3 handles Status S and other protection-status registrations at the cantonal level.",
      registrationOfficeName: "Einwohnerkontrolle Stadt Luzern",
      registrationOfficeAddress: "Hirschengraben 17, 6002 Luzern",
      registrationOfficeWebsite: "stadtluzern.ch/einwohner",
      registrationDocs: [
        "Valid passport or national identity card",
        "Rental contract or accommodation confirmation",
        "Employment contract or proof of income",
        "For Status S holders: Permit N card",
        "Family documents: marriage certificate, children's birth certificates",
        "Registration fee: approx. CHF 25–35",
      ],
      permitLead:
        "Residence permits for Lucerne canton are issued through the Dienststelle Asyl- und Flüchtlingswesen (DAF) for protection-status holders, and through the cantonal migration authority (Migrations- und Bürgerrechtsdienst) for other permit types. EU/EFTA citizens with employment contracts are processed quickly. Non-EU permit holders follow the standard federal SEM process.",
      healthPremium: "~CHF 430/month",
      healthSubsidyInfo:
        "Lucerne offers one of the lower health insurance premiums in Switzerland. To reduce further: switch to a Telmed or HMO model with CHF 2,500 franchise (savings: CHF 120–150/month). Apply for Prämienverbilligung at lu.ch/praemienverbilligung — single-person households with income up to approx. CHF 60,000/year may qualify. SVA Luzern processes applications.",
      healthHospitalNote:
        "Main hospital: Luzerner Kantonsspital (LUKS) at Spitalstrasse 1 (+41 41 205 11 11). LUKS Wolhusen and Sursee are regional facilities. Emergency number: 144.",
      courses: [
        {
          name: "Volkshochschule Luzern (VHS LU)",
          description:
            "German courses for all levels, affordable rates with subsidies for low-income participants. Extensive timetable including evenings. vhsluzern.ch",
        },
        {
          name: "Caritas Luzern – Deutschkurse",
          description:
            "Free German integration courses for low-income newcomers, Status S holders, and refugees. Caritas Luzern operates courses at multiple city locations. caritas-luzern.ch",
        },
        {
          name: "Migros Klubschule Luzern",
          description:
            "German courses from A1 to C1 at two Lucerne locations. Group courses from CHF 210. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1,300–1,700 / month",
      housingPortals: ["homegate.ch", "immoscout24.ch", "flatfox.ch", "comparis.ch/immobilien"],
      housingAidInfo:
        "Lucerne offers more accessible rents than Zurich or Geneva. The tourist-heavy city centre commands a premium — nearby communes like Kriens, Emmen, Horw, and Meggen offer lower rents (CHF 1,100–1,500) with good bus and S-Bahn connections. The DISG social services assist eligible residents with housing support.",
      faq: [
        {
          q: "Is Lucerne a good base for working in Zurich?",
          a: "Yes — Lucerne to Zurich HB takes approximately 45 minutes by direct IC train. Many Lucerne residents commute to Zurich daily. The combination of lower Lucerne rents and Zurich salaries is a popular strategy for expats.",
        },
        {
          q: "How is tourism affecting housing availability in Lucerne?",
          a: "Lucerne's strong short-term rental market (Airbnb, holiday apartments) reduces available long-term housing stock in the city centre. Focus your search on residential districts such as Littau, Reussbühl, and Würzenbach, or the nearby communes mentioned above.",
        },
        {
          q: "What are the main employment sectors in Lucerne canton?",
          a: "Tourism and hospitality, healthcare (LUKS is one of the largest employers), education (University of Lucerne, HSLU), trade, and regional services. Lucerne is also home to several insurance companies and has growing IT and fintech sectors.",
        },
      ],
      blogLinks: [
        {
          href: "/en/blog/how-to-register-switzerland",
          label: "How to Register in Switzerland as a Foreigner",
        },
        {
          href: "/en/blog/best-expat-apps-switzerland",
          label: "Best Apps for Expats in Switzerland (2026)",
        },
        {
          href: "/en/blog/swiss-tax-return-2026",
          label: "Swiss Tax Return 2026: Complete Guide for Expats",
        },
      ],
      sectionRegistration: "First Steps After Arrival",
      sectionPermit: "Residence Permit",
      sectionHealth: "Health Insurance",
      sectionCourses: "German Language Courses",
      sectionHousing: "Finding Housing",
      sectionContacts: "Useful Contacts",
      sectionFaq: "Frequently Asked Questions",
      sectionOtherCantons: "Other Major Cantons",
      sectionOtherCantonsDesc: "Explore our newcomer guides for other Swiss cantons:",
      colOffice: "Office",
      colAddress: "Address",
      colPhone: "Phone",
      colWebsite: "Website",
      deadline: "Registration deadline: within 14 days of arrival.",
      requiredDocs: "Required documents:",
      avgPremium: "Average health insurance premium (2026, adult, standard) — one of lowest in Switzerland:",
      avgRent: "Average 1-room apartment rent:",
    },
    uk: {
      metaTitle: "Переїзд до Люцерна: гід для новоприбулих 2026",
      metaDescription:
        "Повний гід для переїзду до Люцерна: реєстрація в Einwohnerkontrolle, DAF, медична страховка (~430 CHF/міс — одна з найнижчих у Швейцарії), статус S та пошук житла.",
      h1: "Путівник для новоприбулих: Люцерн",
      intro:
        "Люцерн — одне з найкрасивіших міст Швейцарії на березі Фірвальдштетського озера в оточенні Альп. Тут розвинений туризм, сфера послуг і охорона здоров'я. Місто розташоване в центрі країни: до Цюриха, Берна та Базеля — приблизно однакова відстань. Страхові премії в Люцерні — одні з найнижчих у Швейцарії, а оренда помірніша, ніж у великих містах.",
      registrationLead:
        "Новоприбулі до Люцерна реєструються в Einwohnerkontrolle Stadt Luzern протягом 14 днів. В інших общинах кантону — у місцевому Gemeindeamt. Питання статусу S і захисту — у DAF (Dienststelle Asyl- und Flüchtlingswesen) за адресою Morgartenstrasse 3.",
      registrationOfficeName: "Einwohnerkontrolle Stadt Luzern",
      registrationOfficeAddress: "Hirschengraben 17, 6002 Luzern",
      registrationOfficeWebsite: "stadtluzern.ch/einwohner",
      registrationDocs: [
        "Дійсний паспорт або посвідчення особи",
        "Договір оренди або підтвердження адреси",
        "Трудовий договір або підтвердження доходу",
        "Для власників статусу S: картка N",
        "Документи сім'ї: свідоцтво про шлюб, свідоцтва дітей",
        "Реєстраційний збір: ~CHF 25–35",
      ],
      permitLead:
        "Дозволи на рівні кантону Люцерн — через DAF (для статусу S та захисту) та кантональну міграційну службу (для інших типів). Громадяни ЄС/ЄЕФТ з трудовим договором отримують дозвіл B швидко. Для громадян поза ЄС — стандартна федеральна процедура через SEM.",
      permitStatusSNote:
        "Власники статусу S звертаються до DAF (Dienststelle Asyl- und Flüchtlingswesen) та до DISG (Dienststelle Soziales und Gesellschaft) для соціальної підтримки. Детальніше — у нашому гіді по статусу S.",
      healthPremium: "~430 CHF/місяць",
      healthSubsidyInfo:
        "Люцерн — один із найдоступніших кантонів за медичними преміями. Додаткова економія: модель Telmed або HMO з франшизою CHF 2 500 зменшить премію на CHF 120–150 на місяць. Заявка на Prämienverbilligung — на lu.ch/praemienverbilligung.",
      healthHospitalNote:
        "Головна лікарня: Luzerner Kantonsspital (LUKS), Spitalstrasse 1 (тел: +41 41 205 11 11). Швидка допомога: 144.",
      courses: [
        {
          name: "Caritas Luzern – Deutschkurse",
          description:
            "Безкоштовні курси для власників статусу S, біженців та малозабезпечених. Кілька локацій у місті. caritas-luzern.ch",
        },
        {
          name: "Volkshochschule Luzern (VHS LU)",
          description:
            "Курси від A1 до C1, субсидовані ставки для малозабезпечених. vhsluzern.ch",
        },
        {
          name: "Migros Klubschule Luzern",
          description:
            "Від A1 до C1, дві локації в Люцерні, від CHF 210 за рівень. migros-klubschule.ch",
        },
      ],
      housingAvgRent: "CHF 1 300–1 700 / місяць",
      housingPortals: ["homegate.ch", "immoscout24.ch", "flatfox.ch", "comparis.ch/immobilien"],
      housingAidInfo:
        "Люцерн доступніший за Цюрих та Женеву. Туристичний центр дорожчий; сусідні общини Кріенс, Еммен, Горв пропонують нижчу оренду (CHF 1 100–1 500) з хорошим транспортом до центру. Для підтримки — DISG Luzern.",
      faq: [
        {
          q: "Чи зручно їздити з Люцерна до Цюриха на роботу?",
          a: "Так. Прямий IC-потяг Люцерн–Цюрих Hauptbahnhof — близько 45 хвилин. Комбінація доступнішої оренди в Люцерні та цюрихських зарплат — популярна стратегія серед експатів.",
        },
        {
          q: "Де знайти підтримку для українців у Люцерні?",
          a: "DAF (Dienststelle Asyl- und Flüchtlingswesen) та Caritas Luzern надають підтримку власникам статусу S. Telegram-групи 'Українці Люцерн' та 'Українці Швейцарія' — активні спільноти з порадами.",
        },
        {
          q: "Чи є в Люцерні можливості для працевлаштування?",
          a: "Так: туризм і готельна справа, охорона здоров'я (LUKS — великий роботодавець), освіта (Університет Люцерна, HSLU), торгівля та страхування. Для IT-спеціалістів часто вигідніше їздити до Цюриха або працювати віддалено.",
        },
      ],
      blogLinks: [
        {
          href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
          label: "Статус S у Швейцарії: Повний гід для українців",
        },
        {
          href: "/uk/blog/yak-zareyestruvatysya-v-shveytcariyi",
          label: "Як зареєструватися у Швейцарії",
        },
        {
          href: "/uk/blog/vartist-zhyttya-u-shveytcariyi",
          label: "Вартість життя у Швейцарії",
        },
      ],
      sectionRegistration: "Перші кроки після приїзду",
      sectionPermit: "Дозвіл на проживання",
      sectionHealth: "Медична страховка",
      sectionCourses: "Мовні курси",
      sectionHousing: "Пошук житла",
      sectionContacts: "Корисні контакти",
      sectionFaq: "Часті запитання",
      sectionOtherCantons: "Інші великі кантони",
      sectionOtherCantonsDesc: "Перегляньте наші гіди для новоприбулих в інших кантонах:",
      colOffice: "Установа",
      colAddress: "Адреса",
      colPhone: "Телефон",
      colWebsite: "Сайт",
      deadline: "Строк реєстрації: протягом 14 днів після переїзду.",
      requiredDocs: "Необхідні документи:",
      avgPremium: "Середня премія медичного страхування (2026, дорослий, стандарт) — одна з найнижчих у Швейцарії:",
      avgRent: "Середня оренда однокімнатної квартири:",
    },
  },
};

// Slugs of the 6 priority cantons for cross-linking
export const PRIORITY_CANTON_SLUGS = ["zurich", "geneva", "basel-stadt", "bern", "vaud", "lucerne"] as const;

// Human-readable names per locale for cross-link labels
export const PRIORITY_CANTON_NAMES: Record<string, { en: string; uk: string; de: string }> = {
  zurich: { en: "Zurich", uk: "Цюрих", de: "Zürich" },
  geneva: { en: "Geneva", uk: "Женева", de: "Genf" },
  "basel-stadt": { en: "Basel", uk: "Базель", de: "Basel" },
  bern: { en: "Bern", uk: "Берн", de: "Bern" },
  vaud: { en: "Vaud", uk: "Во", de: "Waadt" },
  lucerne: { en: "Lucerne", uk: "Люцерн", de: "Luzern" },
};
