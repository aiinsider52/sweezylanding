import type { Locale } from "../lib/i18n";

type KitCopy = {
  title: string; intro: string; badge: string; open: string; download: string;
  progress: string; reset: string; saved: string; unavailable: string; note: string;
  next: string; app: string; sources: string; days: { title: string; tasks: string[] }[];
};

export const firstWeek: Record<Locale, KitCopy> = {
  uk: {
    title: "Перші 7 днів у Швейцарії",
    intro: "14 практичних кроків: документи, адреса, страховка та перші побутові справи. Один план, який можна взяти із собою.",
    badge: "БЕЗКОШТОВНИЙ СТАРТОВИЙ НАБІР", open: "Відкрити чеклист", download: "Завантажити PDF",
    progress: "виконано", reset: "Скинути позначки", saved: "Позначки збережені лише в цьому браузері.",
    unavailable: "Браузер не дозволяє зберегти позначки. Вони діють до закриття сторінки.",
    note: "Це рекомендований порядок, не юридичні строки. Термінові вимоги вашої громади та статусу мають пріоритет. Для Status S спочатку уточніть призначення кантону й уже організоване покриття у відповідальної служби.",
    next: "Ваш наступний крок", app: "Перейти до Sweezy", sources: "Офіційні джерела",
    days: [
      {title: "Документи під рукою", tasks: ["Зібрати паспорт, документи про перебування та підтвердження житла.", "Записати дату прибуття, адресу та контакт відповідальної служби."]},
      {title: "Своя громада", tasks: ["Знайти офіційний сайт громади та її відділ реєстрації мешканців.", "Уточнити строк, запис і перелік документів для своєї ситуації; забронювати прийом."]},
      {title: "Медична страховка", tasks: ["З'ясувати, чи вже є базове покриття і хто його організовує.", "Якщо обираєте самостійно: порівняти премії в Priminfo й записати свій строк оформлення."]},
      {title: "Зв'язок і дорога", tasks: ["Порівняти мобільні тарифи: повна ціна, строк договору, розірвання.", "Перевірити маршрут до роботи або служби та відповідний транспортний квиток."]},
      {title: "Платежі й бюджет", tasks: ["Попросити банк надати перелік документів і повну вартість рахунку.", "Записати витрати на житло, страховку, харчування й транспорт; залишити резерв."]},
      {title: "Робота та родина", tasks: ["Перед роботою уточнити своє право на працю та необхідну процедуру.", "За потреби звернутися до громади щодо школи, догляду за дітьми чи мовних курсів."]},
      {title: "Нічого не загубити", tasks: ["Зібрати підтвердження заяв, прийомів і контактів в одну папку.", "Перенести всі підтверджені строки в календар і обрати наступні три справи."]},
    ],
  },
  en: {
    title: "Your first 7 days in Switzerland",
    intro: "14 practical steps for documents, registration, insurance and everyday essentials. One plan to take with you.",
    badge: "FREE STARTER KIT", open: "Open checklist", download: "Download PDF",
    progress: "completed", reset: "Reset checklist", saved: "Ticks are saved only in this browser.",
    unavailable: "Your browser cannot save ticks. They last until you close this page.",
    note: "This is a suggested order, not legal deadlines. Urgent requirements for your municipality and residence status come first. With Status S, check your canton assignment and any existing insurance arrangements with your responsible service first.",
    next: "Your next step", app: "Continue with Sweezy", sources: "Official sources",
    days: [
      {title: "Documents together", tasks: ["Gather your passport, residence documents and proof of accommodation.", "Write down your arrival date, address and responsible office contact."]},
      {title: "Your municipality", tasks: ["Find your municipality's official website and residents registration office.", "Confirm your deadline, appointment and required documents; book if needed."]},
      {title: "Health insurance", tasks: ["Check whether basic cover already exists and who arranges it.", "If choosing your own policy, compare premiums in Priminfo and record your enrolment deadline."]},
      {title: "Phone and transport", tasks: ["Compare mobile plans: total cost, contract term and cancellation.", "Check your route to work or appointments and the appropriate travel ticket."]},
      {title: "Payments and budget", tasks: ["Ask your bank for its document checklist and full account fees.", "List housing, insurance, food and transport costs; allow a reserve."]},
      {title: "Work and family", tasks: ["Before starting work, confirm your right to work and required procedure.", "Ask your municipality about school, childcare or language classes if needed."]},
      {title: "Keep track", tasks: ["Collect application receipts, appointment details and contacts in one folder.", "Add confirmed deadlines to your calendar and choose your next three tasks."]},
    ],
  },
  de: {
    title: "Ihre ersten 7 Tage in der Schweiz",
    intro: "14 praktische Schritte für Dokumente, Anmeldung, Versicherung und Alltag. Ein Plan zum Mitnehmen.",
    badge: "KOSTENLOSES STARTPAKET", open: "Checkliste öffnen", download: "PDF herunterladen",
    progress: "erledigt", reset: "Markierungen zurücksetzen", saved: "Markierungen bleiben nur in diesem Browser gespeichert.",
    unavailable: "Ihr Browser kann die Markierungen nicht speichern. Sie gelten bis zum Schliessen der Seite.",
    note: "Dies ist eine empfohlene Reihenfolge, keine gesetzliche Frist. Dringende Vorgaben Ihrer Gemeinde und Ihres Aufenthaltsstatus haben Vorrang. Klären Sie mit Status S zuerst die Kantonszuweisung und bestehenden Versicherungsschutz mit der zuständigen Stelle.",
    next: "Ihr nächster Schritt", app: "Weiter mit Sweezy", sources: "Offizielle Quellen",
    days: [
      {title: "Dokumente sammeln", tasks: ["Pass, Aufenthaltsunterlagen und Wohnungsnachweis bereitlegen.", "Ankunftsdatum, Adresse und Kontakt der zuständigen Stelle notieren."]},
      {title: "Ihre Gemeinde", tasks: ["Offizielle Website der Gemeinde und Einwohneramt finden.", "Frist, Termin und benötigte Unterlagen für Ihre Situation klären; bei Bedarf Termin buchen."]},
      {title: "Krankenversicherung", tasks: ["Prüfen, ob eine Grundversicherung besteht und wer sie organisiert.", "Bei eigener Wahl: Prämien in Priminfo vergleichen und Anmeldefrist notieren."]},
      {title: "Telefon und Verkehr", tasks: ["Mobilfunktarife vergleichen: Gesamtkosten, Laufzeit und Kündigung.", "Weg zur Arbeit oder Behörde und passendes Ticket prüfen."]},
      {title: "Zahlungen und Budget", tasks: ["Bei der Bank Unterlagenliste und vollständige Kontogebühren anfragen.", "Kosten für Wohnen, Versicherung, Essen und Verkehr auflisten; Reserve einplanen."]},
      {title: "Arbeit und Familie", tasks: ["Vor Arbeitsbeginn Arbeitsberechtigung und nötiges Verfahren klären.", "Bei Bedarf die Gemeinde zu Schule, Kinderbetreuung oder Sprachkursen kontaktieren."]},
      {title: "Den Überblick behalten", tasks: ["Bestätigungen, Termine und Kontakte in einem Ordner sammeln.", "Bestätigte Fristen im Kalender eintragen und die nächsten drei Aufgaben auswählen."]},
    ],
  },
};

export const kitSources = [
  {name: "ch.ch / Moving to Switzerland", href: "https://www.ch.ch/en/foreign-nationals-in-switzerland/living-in-switzerland/moving-to-switzerland/"},
  {name: "BAG / Health insurance", href: "https://www.bag.admin.ch/en/health-insurance-requirement-to-obtain-insurance-for-persons-resident-in-switzerland"},
  {name: "Priminfo", href: "https://www.priminfo.admin.ch/"},
  {name: "SEM / Ukraine", href: "https://www.sem.admin.ch/sem/en/home/sem/aktuell/ukraine-hilfe.html"},
];
