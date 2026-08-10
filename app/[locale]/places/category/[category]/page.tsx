import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildLocaleAlternates, BASE_URL } from "../../../../../lib/alternates";
import { isLocale } from "../../../../../lib/blog";
import { PLACE_CATEGORIES, categoryCopy, placesByCategory, type PlaceCategory } from "../../../../../data/place-hubs";
import { PlaceHubPage } from "../../PlaceHubPage";

export function generateStaticParams(){return ["en","uk","de"].flatMap(locale=>PLACE_CATEGORIES.map(category=>({locale,category})));}
export function generateMetadata({params}:{params:{locale:string;category:string}}):Metadata{if(!isLocale(params.locale)||!PLACE_CATEGORIES.includes(params.category as PlaceCategory))return{};const copy=categoryCopy(params.category as PlaceCategory,params.locale);const path=`/${params.locale}/places/category/${params.category}`;return{title:`${copy.title} in Switzerland | Sweezy`,description:copy.description,alternates:buildLocaleAlternates(params.locale,`/places/category/${params.category}`),openGraph:{title:copy.title,description:copy.description,url:`${BASE_URL}${path}`}};}
export default function Page({params}:{params:{locale:string;category:string}}){if(!isLocale(params.locale)||!PLACE_CATEGORIES.includes(params.category as PlaceCategory))notFound();const copy=categoryCopy(params.category as PlaceCategory,params.locale);return <PlaceHubPage locale={params.locale} title={copy.title} description={copy.description} places={placesByCategory(params.category as PlaceCategory)}/>;}
