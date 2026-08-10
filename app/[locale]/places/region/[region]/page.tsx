import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "../../../../../lib/alternates";
import { isLocale } from "../../../../../lib/blog";
import { placeRegions, placesByRegion } from "../../../../../data/place-hubs";
import { PlaceHubPage } from "../../PlaceHubPage";

export function generateStaticParams(){return ["en","uk","de"].flatMap(locale=>placeRegions().map(region=>({locale,region})));}
export function generateMetadata({params}:{params:{locale:string;region:string}}):Metadata{if(!isLocale(params.locale))return{};const places=placesByRegion(params.region);if(!places.length)return{};const title=places[0].region[params.locale].split(" · ")[0];const description=params.locale==="uk"?`Що подивитися у регіоні ${title}: перевірені місця, маршрути та практичні поради.`:params.locale==="de"?`Sehenswürdigkeiten in ${title}: Orte, Routen und praktische Reisetipps.`:`What to see in ${title}: selected places, routes and practical planning tips.`;return{title:`${title} travel guide | Sweezy`,description,alternates:{canonical:`${BASE_URL}/${params.locale}/places/region/${params.region}`}};}
export default function Page({params}:{params:{locale:string;region:string}}){if(!isLocale(params.locale))notFound();const places=placesByRegion(params.region);if(!places.length)notFound();const title=places[0].region[params.locale].split(" · ")[0];const description=params.locale==="uk"?`Добірка місць у регіоні ${title} з маршрутами, сезонністю, транспортом і практичними порадами.`:params.locale==="de"?`Ausgewählte Orte in ${title} mit Routen, Saison, Anreise und praktischen Tipps.`:`Selected places in ${title} with routes, seasons, transport and practical tips.`;return <PlaceHubPage locale={params.locale} title={title} description={description} places={places}/>;}
