"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { destinationImage, type TravelDestination } from "../../../data/travel-destinations";
import type { Locale } from "../../../lib/i18n";
import styles from "./travel.module.css";

type Category = "all" | TravelDestination["category"];
const categories: Category[] = ["all", "mountains", "lakes", "nature", "culture"];

export function PlacesCatalog({locale,destinations,labels,openLabel}:{locale:Locale;destinations:TravelDestination[];labels:string[];openLabel:string}) {
  const [activeCategory,setActiveCategory]=useState<Category>("all");
  const filtered=useMemo(()=>activeCategory==="all"?destinations:destinations.filter(place=>place.category===activeCategory),[activeCategory,destinations]);
  const resultLabel=locale==="uk"?`Знайдено: ${filtered.length}`:locale==="de"?`${filtered.length} Orte`:`${filtered.length} places`;

  return <>
    <div className={styles.filters} aria-label={locale==="uk"?"Категорії місць":locale==="de"?"Ortskategorien":"Place categories"}>
      {categories.map((category,index)=><button key={category} type="button" className={activeCategory===category?styles.filterActive:undefined} aria-pressed={activeCategory===category} onClick={()=>setActiveCategory(category)}><span>{labels[index]}</span><small>{category==="all"?destinations.length:destinations.filter(place=>place.category===category).length}</small></button>)}
    </div>
    <p className={styles.resultsStatus} aria-live="polite">{resultLabel}</p>
    <div className={styles.grid}>{filtered.map((place,index)=><Link key={place.slug} href={`/${locale}/places/${place.slug}`} className={styles.card}><div className={styles.media}><Image src={destinationImage(place)} alt={place.alt[locale][0]} fill priority={index<2} sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 40vw"/></div><div className={styles.copy}><div className={`${styles.meta} ${styles.eyebrow}`}><span>{place.region[locale]}</span><span>{String(index+1).padStart(2,"0")}</span></div><h2>{place.title[locale]}</h2><p>{place.summary[locale]}</p><span className={styles.open}>{openLabel}<span aria-hidden>↗</span></span></div></Link>)}</div>
  </>;
}
