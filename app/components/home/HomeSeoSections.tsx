import type { Locale } from "../../../lib/i18n";

type SectionCopy = {
  whyTitle: string;
  whyItems: Array<{ title: string; text: string }>;
  featuresTitle: string;
  featuresLead: string;
  featuresItems: Array<{ title: string; text: string }>;
  faqTitle: string;
  faqItems: Array<{ question: string; answer: string }>;
};

const COPY: Record<Locale, SectionCopy> = {
  en: {
    whyTitle: "Why Switzerland newcomers choose Sweezy",
    whyItems: [
      {
        title: "Swiss bureaucracy feels fragmented",
        text: "When you move to Switzerland, permits, health insurance, address registration, banking, and daily admin often start at the same time. Many newcomers struggle because the process is spread across cantonal rules, municipal offices, and unfamiliar deadlines.",
      },
      {
        title: "Sweezy turns admin into clear next steps",
        text: "Instead of searching dozens of websites, Sweezy organizes relocation into practical steps you can actually follow. You see what to do first, which documents matter, and how to move through registration, insurance, and settling in with more confidence.",
      },
      {
        title: "Support in your language",
        text: "Newcomers understand difficult processes faster when information is available in familiar language. Sweezy is designed for English, Ukrainian, and German speakers, so guides, checklists, and explanations stay easier to read and easier to act on.",
      },
    ],
    featuresTitle: "What you can do with Sweezy",
    featuresLead:
      "Sweezy is built for people who want practical help with life in Switzerland, not vague relocation advice. The app combines multiple tools in one place so newcomers can understand Swiss bureaucracy and actually complete the next step. You can follow step-by-step guides for permits, registration, insurance, banking, taxes, and daily setup tasks. Interactive checklists help you keep track of documents, appointments, and deadlines. The service map helps you find nearby offices, clinics, banks, and essential services. The marketplace highlights vetted providers who support expats in Switzerland. For people preparing for work, the CV builder helps create a profile that better matches expectations in the Swiss job market.",
    featuresItems: [
      {
        title: "Guides and checklists",
        text: "Use structured instructions and interactive task tracking for permits, Anmeldung, insurance, and more.",
      },
      {
        title: "Map and trusted services",
        text: "Discover nearby offices and vetted providers without wasting time on random search results.",
      },
      {
        title: "Career preparation",
        text: "Build a Swiss-style CV and prepare for the local job market in a more organized way.",
      },
    ],
    faqTitle: "Common questions newcomers have",
    faqItems: [
      {
        question: "Do I need a permit to live in Switzerland?",
        answer:
          "In most cases, yes. The exact permit depends on your nationality, the reason for your stay, and how long you plan to remain in Switzerland. EU/EFTA citizens and non-EU nationals follow different rules, and permits are often linked to work, study, or family reunification. Sweezy helps newcomers understand the order of steps before and after arrival.",
      },
      {
        question: "How does Swiss health insurance work?",
        answer:
          "Swiss health insurance is mandatory for most residents. After moving, you usually need to choose a basic health insurance plan within a short deadline, often within three months of arrival, and coverage is applied retroactively. Premiums vary by canton, insurer, and deductible, so newcomers need practical comparison support as well as a reminder of deadlines.",
      },
      {
        question: "How do I register my address in Switzerland?",
        answer:
          "After moving into an apartment or temporary accommodation, you normally register your address with the local municipality or residents office. The exact process depends on the canton and commune, but you will often need your passport or ID, residence documents, rental agreement, and sometimes employment paperwork. Missing the registration deadline can create avoidable problems later.",
      },
      {
        question: "What is Status S for Ukrainian refugees?",
        answer:
          "Status S is a protection status in Switzerland created for people fleeing war, including many Ukrainians. It allows eligible people to stay in the country without going through the regular asylum process in the same way as other categories. Because rights and procedures can change, newcomers should always check official guidance alongside practical tools that explain what to do next.",
      },
      {
        question: "Is Sweezy free to use?",
        answer:
          "Sweezy includes a free experience that helps newcomers start understanding life in Switzerland with essential guidance and practical structure. Some advanced features may expand over time, but the goal is to make the first phase of relocation easier, clearer, and less stressful for people who need reliable orientation in a new country.",
      },
    ],
  },
  uk: {
    whyTitle: "Чому новоприбулі до Швейцарії обирають Sweezy",
    whyItems: [
      {
        title: "Швейцарська бюрократія складна",
        text: "Після переїзду до Швейцарії люди часто одночасно стикаються з permit, медичним страхуванням, реєстрацією адреси, банком і десятками дрібних адміністративних рішень. Проблема в тому, що правила розкидані між кантоном, громадою та різними офіційними сайтами.",
      },
      {
        title: "Sweezy розкладає все на кроки",
        text: "Замість хаотичного пошуку інформації Sweezy показує зрозумілий порядок дій. Ви бачите, що робити спочатку, які документи потрібні, які дедлайни не можна пропустити і як рухатися від реєстрації до страховки та повсякденного облаштування.",
      },
      {
        title: "Інформація вашою мовою",
        text: "Складні процеси набагато легше проходити, коли пояснення доступні знайомою мовою. Саме тому Sweezy підтримує English, Ukrainian та German, щоб гайди, чеклісти й підказки були зрозумілими та корисними з першого дня.",
      },
    ],
    featuresTitle: "Що можна робити в Sweezy",
    featuresLead:
      "Sweezy створений для людей, яким потрібна не абстрактна інформація про переїзд, а реальна допомога з життям у Швейцарії. У застосунку зібрані інструменти, які допомагають зрозуміти бюрократію та закривати конкретні завдання. Ви можете проходити покрокові гайди по permits, реєстрації, страхуванню, банкінгу, податках і базових життєвих питаннях. Інтерактивні чеклісти допомагають не загубити документи, дедлайни та appointments. Карта сервісів показує офіси, клініки, банки й корисні місця поруч. Маркетплейс допомагає знайти перевірених провайдерів для експатів у Швейцарії. А CV builder допомагає підготувати резюме під швейцарський ринок праці.",
    featuresItems: [
      {
        title: "Гайди та чеклісти",
        text: "Працюйте з чіткими інструкціями і відстежуйте прогрес по permits, Anmeldung, страховці та інших справах.",
      },
      {
        title: "Карта і перевірені сервіси",
        text: "Знаходьте потрібні офіси поруч і користуйтеся vetted providers замість випадкових пошукових результатів.",
      },
      {
        title: "Підготовка до роботи",
        text: "Створюйте CV у швейцарському форматі та готуйтеся до локального job market більш структуровано.",
      },
    ],
    faqTitle: "Поширені питання новоприбулих",
    faqItems: [
      {
        question: "Чи потрібен дозвіл, щоб жити у Швейцарії?",
        answer:
          "У більшості випадків так. Конкретний тип permit залежить від громадянства, причини перебування і тривалості проживання. Для громадян ЄС/ЄАВТ та для людей з-за меж ЄС правила відрізняються, а сам дозвіл часто пов'язаний з роботою, навчанням або возз'єднанням сім'ї. Тому важливо не лише читати правила, а й розуміти послідовність дій.",
      },
      {
        question: "Як працює медичне страхування у Швейцарії?",
        answer:
          "Базове медичне страхування у Швейцарії є обов'язковим для більшості резидентів. Після переїзду зазвичай потрібно обрати страховку протягом обмеженого терміну, часто до трьох місяців, а покриття може діяти заднім числом від дати приїзду. Через різні тарифи, франшизи та кантональні відмінності новоприбулим важливо швидко розібратися в системі.",
      },
      {
        question: "Як зареєструвати адресу у Швейцарії?",
        answer:
          "Після заселення зазвичай потрібно звернутися до місцевої Gemeinde, commune або residents office і зареєструвати своє проживання. Найчастіше потрібні паспорт або ID, договір оренди, документи на підставу перебування і інколи контракт на роботу. У різних кантонах та громадах процедура трохи відрізняється, тому завжди варто перевіряти локальні правила.",
      },
      {
        question: "Що таке статус S для українців?",
        answer:
          "Статус S у Швейцарії був створений для людей, які тікають від війни, зокрема для багатьох українців. Він дає право на тимчасовий захист і доступ до певних механізмів підтримки без проходження стандартної процедури притулку в тому самому форматі. Але умови, права й практичні кроки можуть змінюватися, тому важливо звірятися з офіційними джерелами.",
      },
      {
        question: "Sweezy безкоштовний?",
        answer:
          "Sweezy дає можливість безкоштовно почати орієнтуватися в житті у Швейцарії, отримати базову структуру, зрозуміти наступні кроки та не загубитися в бюрократичному процесі. Надалі окремі можливості можуть розширюватися, але головна ідея застосунку полягає в тому, щоб зробити старт у новій країні простішим і зрозумілішим.",
      },
    ],
  },
  de: {
    whyTitle: "Warum Neuzuzuger in der Schweiz Sweezy wählen",
    whyItems: [
      {
        title: "Schweizer Bürokratie ist komplex",
        text: "Wer in die Schweiz zieht, muss oft gleichzeitig Anmeldung, Aufenthaltsbewilligung, Krankenversicherung, Bankkonto und viele kleine Verwaltungsschritte organisieren. Genau das überfordert viele Neuzuzuger, weil kantonale Regeln, Gemeindeverfahren und Fristen nicht an einem Ort gebündelt sind.",
      },
      {
        title: "Sweezy macht daraus klare Schritte",
        text: "Sweezy ordnet den Umzug in eine verständliche Reihenfolge. Statt Informationen aus vielen Quellen zusammenzusuchen, sehen Nutzer, welcher Schritt zuerst kommt, welche Dokumente gebraucht werden und wie man Anmeldung, Versicherung und Alltag in der Schweiz strukturierter angeht.",
      },
      {
        title: "Verständlich in Ihrer Sprache",
        text: "Komplexe Prozesse lassen sich leichter bewältigen, wenn die Erklärungen in vertrauter Sprache vorliegen. Sweezy ist für English, Ukrainian und German aufgebaut, damit Guides, Checklisten und praktische Hinweise für neue Bewohner der Schweiz leichter verständlich bleiben.",
      },
    ],
    featuresTitle: "Was Sie mit Sweezy tun können",
    featuresLead:
      "Sweezy richtet sich an Menschen, die beim Start in der Schweiz konkrete Hilfe brauchen und nicht nur allgemeine Relocation-Tipps. Die App bündelt mehrere Werkzeuge an einem Ort, damit Neuzuzuger Schweizer Bürokratie besser verstehen und Aufgaben wirklich erledigen können. Sie können Schritt-für-Schritt-Guides zu Bewilligungen, Anmeldung, Krankenversicherung, Banking, Steuern und Alltagsorganisation nutzen. Interaktive Checklisten helfen dabei, Dokumente, Fristen und Termine im Blick zu behalten. Die Service Map zeigt relevante Stellen, Kliniken, Banken und andere wichtige Services in Ihrer Nähe. Im Marketplace finden Sie vetted providers für Expats in der Schweiz. Zusätzlich unterstützt der CV Builder dabei, einen Lebenslauf zu erstellen, der besser zum Schweizer Arbeitsmarkt passt.",
    featuresItems: [
      {
        title: "Guides und Checklisten",
        text: "Arbeiten Sie mit klaren Anleitungen und verfolgen Sie Fortschritte bei Anmeldung, Versicherung und Bewilligungen.",
      },
      {
        title: "Karte und geprüfte Services",
        text: "Finden Sie nahegelegene Stellen und vertrauenswürdige Anbieter, statt sich nur auf zufällige Suchergebnisse zu verlassen.",
      },
      {
        title: "Karrierevorbereitung",
        text: "Erstellen Sie einen Swiss-style CV und bereiten Sie sich strukturierter auf den lokalen Arbeitsmarkt vor.",
      },
    ],
    faqTitle: "Häufige Fragen von Neuzuzugern",
    faqItems: [
      {
        question: "Brauche ich eine Bewilligung, um in der Schweiz zu leben?",
        answer:
          "In den meisten Fällen ja. Welche Bewilligung Sie brauchen, hängt von Ihrer Staatsangehörigkeit, vom Zweck des Aufenthalts und von der geplanten Aufenthaltsdauer ab. Für EU/EFTA-Bürger und für Personen aus Drittstaaten gelten unterschiedliche Regeln. Oft ist die Bewilligung mit Arbeit, Studium oder Familiennachzug verbunden, weshalb eine klare Reihenfolge der Schritte sehr wichtig ist.",
      },
      {
        question: "Wie funktioniert die Schweizer Krankenversicherung?",
        answer:
          "Die Grundversicherung ist für die meisten Einwohner in der Schweiz obligatorisch. Nach dem Umzug muss in der Regel innerhalb einer begrenzten Frist, häufig innerhalb von drei Monaten, eine Krankenversicherung gewählt werden. Die Deckung gilt oft rückwirkend ab dem Zuzugsdatum. Weil Prämien, Franchise und Kanton Unterschiede machen, brauchen viele Expats nicht nur Informationen, sondern praktische Orientierung.",
      },
      {
        question: "Wie melde ich meine Adresse in der Schweiz an?",
        answer:
          "Nach dem Einzug müssen Sie sich normalerweise bei der Gemeinde oder beim Einwohneramt anmelden. Welche Unterlagen verlangt werden, hängt von Kanton und Gemeinde ab, typischerweise jedoch Pass oder ID, Mietvertrag, Aufenthaltsunterlagen und teilweise ein Arbeitsvertrag. Wer diese Anmeldung verspätet erledigt, riskiert unnötige Folgeprobleme bei weiteren administrativen Schritten.",
      },
      {
        question: "Was ist Status S für ukrainische Geflüchtete?",
        answer:
          "Status S ist ein Schutzstatus in der Schweiz für Menschen, die vor Krieg fliehen, darunter viele Ukrainerinnen und Ukrainer. Er ermöglicht einen schnelleren Zugang zu Schutz und bestimmten Rechten, ohne dass das Verfahren in allen Punkten dem regulären Asylprozess entspricht. Da sich praktische Abläufe und Vorgaben ändern können, sollten offizielle Informationen immer mit aktuellen Hilfsmitteln kombiniert werden.",
      },
      {
        question: "Ist Sweezy kostenlos nutzbar?",
        answer:
          "Sweezy bietet einen einfachen Einstieg, damit Neuzuzuger die ersten wichtigen Schritte in der Schweiz klarer verstehen und strukturierter planen können. Ziel ist es, den Start in einem neuen Land weniger stressig zu machen und wichtige Informationen leichter zugänglich zu halten. Einzelne Funktionen können sich weiterentwickeln, aber der praktische Nutzen für den Einstieg steht im Mittelpunkt.",
      },
    ],
  },
};

export function getHomeSeoCopy(locale: Locale) {
  return COPY[locale];
}

export function buildHomeFaqSchema(locale: Locale) {
  const copy = getHomeSeoCopy(locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function HomeSeoSections({ locale }: { locale: Locale }) {
  const copy = getHomeSeoCopy(locale);

  return (
    <div className="bg-dark-900 text-white">
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-18">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.whyTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {copy.whyItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-18">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.featuresTitle}</h2>
        <p className="mt-6 max-w-4xl text-base leading-8 text-white/65">{copy.featuresLead}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {copy.featuresItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-18">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.faqTitle}</h2>
        <div className="mt-8 space-y-6">
          {copy.faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-xl font-semibold tracking-tight">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
