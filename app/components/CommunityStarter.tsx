"use client";

import { useRef, useState } from "react";
import type { Locale } from "../../lib/i18n";
import { FACEBOOK_COMMUNITY_URL } from "../../lib/links";
import { SweezyCompanion } from "./SweezyCompanion";
import styles from "./CommunityStarter.module.css";

const COPY = {
  uk: {
    eyebrow: "ВАШ ПЕРШИЙ ДОПИС", title: "Почнімо з «привіт».",
    body: "Не знаєте, що написати? Оберіть заготовку, додайте свої деталі й поділіться нею у Facebook-групі.",
    steps: [["Оберіть тему", "Знайомство, запитання, ваш досвід або ідея для зустрічі."], ["Додайте контекст", "Місто й конкретне запитання допоможуть іншим краще вас зрозуміти."], ["Поділіться у групі", "Скопіюйте текст, відкрийте Facebook і опублікуйте його за правилами групи."]],
    label: "Оберіть заготовку", editor: "Відредагуйте свій допис", badge: "ЧЕРНЕТКА, ЯКУ МОЖНА ЗМІНИТИ",
    copy: "Скопіювати текст", copied: "Скопійовано. Тепер можна вставити текст у свій допис.", failed: "Текст виділено. Скопіюйте його вручну через меню або Ctrl/Cmd + C.",
    open: "Відкрити Facebook-групу", privacy: "Чернетка залишається на цій сторінці. Ми її не зберігаємо й не публікуємо. Не додавайте чутливі дані.",
    templates: [
      { label: "Знайомство", text: "Привіт! Я [ім’я], зараз живу в [місто / кантон].\n\nБудую своє життя у Швейцарії та буду радий / рада новим знайомствам. Цікавлюся [ваші інтереси].\n\nХто ще з нашого міста? Давайте знайомитися 👋" },
      { label: "Шукаю пораду", text: "Привіт! Підкажіть, будь ласка, хто має досвід із [тема]?\n\nЯ в [місто / кантон]. Моя ситуація: [коротко опишіть контекст без персональних документів]. Уже перевірив / перевірила [джерело або крок].\n\nХочу зрозуміти: [одне конкретне запитання]. Буду вдячний / вдячна за досвід і посилання на джерела." },
      { label: "Ділюся досвідом", text: "Привіт! Хочу поділитися досвідом про [тема] у [місто / кантон].\n\nМоя ситуація: [короткий контекст]. Мені допомогло [що саме ви зробили].\n\nКорисне джерело: [посилання]. Це мій особистий досвід — у вашій ситуації умови можуть відрізнятися." },
      { label: "Ідея для зустрічі", text: "Привіт, [місто]! Хтось хоче разом [прогулятися / випити кави / дослідити нове місце]?\n\nПропоную [день і час] у [публічне місце]. Ідея проста: познайомитися й приємно провести час.\n\nЯкщо цікаво — напишіть у коментарях, домовимося про деталі ☕" },
    ],
  },
  en: {
    eyebrow: "YOUR FIRST POST", title: "Start with a hello.",
    body: "Not sure what to write? Choose a starting point, add your details and share it in the Facebook group.",
    steps: [["Choose a topic", "An introduction, a question, your experience or an idea for meeting up."], ["Add some context", "Your city and a specific question help others understand your situation."], ["Share in the group", "Copy the text, open Facebook and publish it following the group rules."]],
    label: "Choose a starting point", editor: "Edit your post", badge: "AN EDITABLE DRAFT",
    copy: "Copy text", copied: "Copied. You can now paste the text into your post.", failed: "Text selected. Copy it manually using the menu or Ctrl/Cmd + C.",
    open: "Open Facebook group", privacy: "Your draft stays on this page. We do not save or publish it. Leave out sensitive personal information.",
    templates: [
      { label: "Say hello", text: "Hi! I’m [name], currently living in [city / canton].\n\nI’m building my life in Switzerland and would love to meet new people. I’m interested in [your interests].\n\nWho else lives nearby? Let’s say hello 👋" },
      { label: "Ask a question", text: "Hi! Has anyone had experience with [topic]?\n\nI’m in [city / canton]. My situation: [brief context, without personal documents]. I have already checked [source or step].\n\nMy specific question is: [one clear question]. I’d appreciate your experience and links to useful sources." },
      { label: "Share experience", text: "Hi! I’d like to share my experience with [topic] in [city / canton].\n\nMy situation: [brief context]. What helped me: [what you did].\n\nUseful source: [link]. This is my personal experience; your circumstances and requirements may differ." },
      { label: "Meet up", text: "Hi, [city]! Anyone up for [a walk / coffee / exploring somewhere new]?\n\nHow about [day and time] at [public place]? A chance to meet new people and spend some time together.\n\nIf you’re interested, leave a comment and we can agree on the details ☕" },
    ],
  },
  de: {
    eyebrow: "DEIN ERSTER BEITRAG", title: "Beginnen wir mit Hallo.",
    body: "Du weißt nicht, was du schreiben sollst? Wähle eine Vorlage, ergänze deine Angaben und teile sie in der Facebook-Gruppe.",
    steps: [["Wähle ein Thema", "Eine Vorstellung, eine Frage, deine Erfahrung oder eine Idee für ein Treffen."], ["Gib etwas Kontext", "Deine Stadt und eine konkrete Frage helfen anderen, dich besser zu verstehen."], ["Teile deinen Beitrag", "Kopiere den Text, öffne Facebook und veröffentliche ihn nach den Gruppenregeln."]],
    label: "Wähle eine Vorlage", editor: "Bearbeite deinen Beitrag", badge: "EIN ENTWURF ZUM ANPASSEN",
    copy: "Text kopieren", copied: "Kopiert. Du kannst den Text jetzt in deinen Beitrag einfügen.", failed: "Text markiert. Kopiere ihn über das Menü oder mit Strg/Cmd + C.",
    open: "Facebook-Gruppe öffnen", privacy: "Dein Entwurf bleibt auf dieser Seite. Wir speichern und veröffentlichen ihn nicht. Keine sensiblen persönlichen Angaben ergänzen.",
    templates: [
      { label: "Hallo sagen", text: "Hallo! Ich bin [Name] und lebe in [Stadt / Kanton].\n\nIch baue mir ein Leben in der Schweiz auf und freue mich über neue Kontakte. Ich interessiere mich für [deine Interessen].\n\nWer wohnt auch in der Nähe? Lernen wir uns kennen 👋" },
      { label: "Frage stellen", text: "Hallo! Hat jemand Erfahrung mit [Thema]?\n\nIch bin in [Stadt / Kanton]. Meine Situation: [kurzer Kontext ohne persönliche Dokumente]. Ich habe bereits [Quelle oder Schritt] geprüft.\n\nMeine konkrete Frage: [eine klare Frage]. Über Erfahrungen und hilfreiche Quellen würde ich mich freuen." },
      { label: "Erfahrung teilen", text: "Hallo! Ich möchte meine Erfahrung mit [Thema] in [Stadt / Kanton] teilen.\n\nMeine Situation: [kurzer Kontext]. Mir hat geholfen: [was du gemacht hast].\n\nHilfreiche Quelle: [Link]. Das ist meine persönliche Erfahrung; deine Voraussetzungen können anders sein." },
      { label: "Treffen planen", text: "Hallo, [Stadt]! Hat jemand Lust auf [einen Spaziergang / Kaffee / einen Ausflug]?\n\nMein Vorschlag: [Tag und Uhrzeit] bei [öffentlicher Ort]. Einfach kennenlernen und gemeinsam eine gute Zeit verbringen.\n\nBei Interesse schreibt einen Kommentar, dann stimmen wir die Details ab ☕" },
    ],
  },
} as const;

export function CommunityStarter({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const [selected, setSelected] = useState(0);
  const [text, setText] = useState<string>(copy.templates[0].text);
  const [status, setStatus] = useState("");
  const editor = useRef<HTMLTextAreaElement>(null);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(copy.copied);
    } catch {
      editor.current?.focus();
      editor.current?.select();
      setStatus(copy.failed);
    }
  }

  return <section className={styles.starter} aria-labelledby="community-starter-title">
    <div className={styles.intro}>
      <div className={styles.titleRow}><div><p className={styles.eyebrow}>{copy.eyebrow}</p><h2 id="community-starter-title">{copy.title}</h2></div><SweezyCompanion locale={locale} pose="post-writer" className={styles.writer} sizes="140px" /></div><p className={styles.body}>{copy.body}</p>
      <ol className={styles.steps}>{copy.steps.map(([title, body], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
    </div>
    <div className={styles.composer}>
      <fieldset className={styles.templates}><legend>{copy.label}</legend><div>{copy.templates.map((template, index) => <button key={template.label} type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); setText(template.text); setStatus(""); }}>{template.label}</button>)}</div></fieldset>
      <div className={styles.editorHead}><label htmlFor="community-post-draft">{copy.editor}</label><span>{copy.badge}</span></div>
      <textarea id="community-post-draft" ref={editor} value={text} onChange={event => { setText(event.target.value); setStatus(""); }} rows={7} spellCheck aria-describedby="community-draft-privacy" />
      <div className={styles.actions}><button type="button" disabled={!text.trim()} onClick={copyText}>{copy.copy}<span aria-hidden="true">⧉</span></button><a href={FACEBOOK_COMMUNITY_URL} target="_blank" rel="noreferrer noopener" data-placement="community-starter">{copy.open}<span aria-hidden="true">↗</span></a></div>
      <p className={styles.status} role="status">{status}</p>
      <p id="community-draft-privacy" className={styles.privacy}>{copy.privacy}</p>
    </div>
  </section>;
}
