import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../lib/alternates";
import { destinationImage, travelDestinations } from "../../../data/travel-destinations";
import { isLocale } from "../../../lib/blog";
import type { Locale } from "../../../lib/i18n";
import { PlacesCinematicJourney } from "./PlacesCinematicJourney";
import { PlacesCatalog } from "./PlacesCatalog";
import styles from "./travel.module.css";

const COPY: Record<Locale,{title:string;description:string;eyebrow:string;places:string;open:string;season:string;filters:string[]}>={
 en:{title:"Beautiful places in Switzerland",description:"A practical travel guide to mountains, lakes, cities and natural landmarks across Switzerland — with routes, seasons, transport and local tips.",eyebrow:"SWEEZY FIELD GUIDE · SWITZERLAND",places:"curated places",open:"Open travel guide",season:"Best time",filters:["All places","Mountains","Lakes","Nature","Culture"]},
 uk:{title:"Красиві місця Швейцарії",description:"Практичний путівник горами, озерами, містами та природними пам'ятками Швейцарії — з маршрутами, сезонами, транспортом і локальними порадами.",eyebrow:"ПУТІВНИК SWEEZY · ШВЕЙЦАРІЯ",places:"перевірених місць",open:"Відкрити путівник",season:"Коли їхати",filters:["Усі місця","Гори","Озера","Природа","Культура"]},
 de:{title:"Schöne Orte in der Schweiz",description:"Praktischer Reiseführer zu Bergen, Seen, Städten und Naturwundern der Schweiz — mit Routen, Reisezeit, Verkehr und lokalen Tipps.",eyebrow:"SWEEZY FIELD GUIDE · SCHWEIZ",places:"kuratierte Orte",open:"Reiseführer öffnen",season:"Beste Zeit",filters:["Alle Orte","Berge","Seen","Natur","Kultur"]}
};

export function generateStaticParams(){return [{locale:"en"},{locale:"uk"},{locale:"de"}]}
export async function generateMetadata({params}:{params:{locale:string}}):Promise<Metadata>{if(!isLocale(params.locale))return{};const c=COPY[params.locale];const suffix=params.locale==="uk"?"путівник Sweezy":params.locale==="de"?"Sweezy Reiseführer":"Sweezy travel guide";return{title:`${c.title} — ${suffix}`,description:c.description,keywords:params.locale==="uk"?["красиві місця Швейцарії","куди поїхати у Швейцарії","що подивитися у Швейцарії","пам'ятки Швейцарії","путівник Швейцарією"]:["beautiful places Switzerland","places to visit Switzerland","Switzerland travel guide","Swiss attractions"],alternates:buildLocaleAlternates(params.locale,"/places"),openGraph:{title:c.title,description:c.description,url:`${BASE_URL}/${params.locale}/places`,images:[{url:destinationImage(travelDestinations[0]),width:1122,height:1402,alt:travelDestinations[0].alt[params.locale][0]}]}}}

export default function PlacesPage({params}:{params:{locale:string}}){if(!isLocale(params.locale))notFound();const locale=params.locale;const c=COPY[locale];const collection={"@context":"https://schema.org","@type":"CollectionPage",name:c.title,description:c.description,url:`${BASE_URL}/${locale}/places`,mainEntity:{"@type":"ItemList",itemListElement:travelDestinations.map((place,index)=>({"@type":"ListItem",position:index+1,url:`${BASE_URL}/${locale}/places/${place.slug}`,name:place.title[locale]}))}};return <main lang={locale} className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collection).replace(/</g,"\\u003c")}}/><PlacesCinematicJourney locale={locale} title={c.title} description={c.description} eyebrow={c.eyebrow} count={travelDestinations.length} countLabel={c.places}/><div id="places-catalog" className={styles.shell}><div className={styles.catalogHead}><p className={styles.eyebrow}>{c.eyebrow}</p><h2>{c.title}</h2><p>{c.description}</p></div><PlacesCatalog locale={locale} destinations={travelDestinations} labels={c.filters} openLabel={c.open}/></div></main>}
