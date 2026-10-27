import { BASE_URL } from "../../lib/alternates";
import { ukrainianServices, servicePath } from "../../data/ukrainian-services";
import { CITY_SLUGS, dachCities } from "../../lib/dach-cities";
import { COUNTRIES, DACH_TOPICS } from "../../data/dach";

export const dynamic = "force-static";

const content = `# Sweezy

> Sweezy provides practical, source-backed guidance for newcomers and Ukrainians in Switzerland, Germany and Austria (DACH). Website languages are Ukrainian, English and German; language does not determine country. Existing canton and Swiss Status S articles apply to Switzerland only.

## DACH country guides

${["uk", "en", "de"].flatMap(locale => [
  `- [Choose a DACH country (${locale})](${BASE_URL}/${locale}/countries)`,
  ...COUNTRIES.map(country => `- [${country} guide (${locale})](${BASE_URL}/${locale}/countries/${country})`),
  ...["germany", "austria"].flatMap(country => DACH_TOPICS.map(topic => `- [${country}: ${topic} (${locale})](${BASE_URL}/${locale}/countries/${country}/${topic})`)),
  ...CITY_SLUGS.map(city => `- [${city}: local newcomer guide (${locale})](${BASE_URL}/${locale}/countries/${dachCities[city].country}/cities/${city})`),
  `- [Free country-specific informational PDF guides (${locale})](${BASE_URL}/${locale}/resources)`,
]).join("\n")}

Country guides distinguish address registration, residence status, permission to work, qualifications and business registration. They publish the source-check date, official source links and visible FAQs. No quoted external expert review or guaranteed immigration outcome is claimed. Support resources distinguish an official online directory from an in-person advice service.

## Primary knowledge hubs

- [Ukrainian Sweezy homepage](${BASE_URL}/uk)
- [Ukrainian Switzerland guides](${BASE_URL}/uk/blog)
- [Complete Status S guide for Ukrainians](${BASE_URL}/uk/blog/status-s-shveytcariya-povnyy-gid)
- [Verified Status S updates tracker](${BASE_URL}/uk/status-s-updates)
- [Status S after March 2027](${BASE_URL}/uk/blog/status-s-pislya-bereznya-2027)
- [Finding work in Switzerland for Ukrainians](${BASE_URL}/uk/blog/poshuk-roboty-shveytcariya-2026)
- [Moving to Switzerland checklist](${BASE_URL}/uk/blog/pereizd-do-shveytcariyi-chekist)
- [Swiss canton guides in Ukrainian](${BASE_URL}/uk/guides)
- [Jobs in Switzerland](${BASE_URL}/uk/jobs)
- [Places to visit in Switzerland](${BASE_URL}/uk/places)
- [Oeschinen Lake practical guide](${BASE_URL}/uk/places/oeschinen-lake)
- [Rhine Falls practical guide](${BASE_URL}/uk/places/rhine-falls)
- [Mount Rigi practical guide](${BASE_URL}/uk/places/mount-rigi)
- [Lavaux Vineyard Terraces practical guide](${BASE_URL}/uk/places/lavaux-vineyards)
- [Lake Murten practical guide](${BASE_URL}/uk/places/lake-murten)
- [Bern Old Town practical guide](${BASE_URL}/uk/places/bern-old-town)
- [Plan a trip in Switzerland](${BASE_URL}/uk/planning)
- [Sweezy community on Telegram and Facebook](${BASE_URL}/uk/community)

## Ukrainian services and business

- [Compare business routes across Switzerland, Germany and Austria (Ukrainian)](${BASE_URL}/uk/blog/biznes-dach-dlya-ukrayintsiv)
- [Verified published service details in Germany](${BASE_URL}/uk/services/country/germany)
- [Verified published service details in Austria](${BASE_URL}/uk/services/country/austria)
- [Swiss services](${BASE_URL}/uk/services/country/switzerland)

- [Ukrainian services directory in Switzerland, Germany and Austria](${BASE_URL}/uk/services)
${ukrainianServices.map((service) => `- [${service.name} — ${service.category}, ${service.city}](${BASE_URL}${servicePath(service)})`).join("\n")}
- [How to find Ukrainian services in Switzerland](${BASE_URL}/uk/blog/ukrayinski-posluhy-shveytcariya)
- [Ukrainian services in Zurich: photography, beauty and school](${BASE_URL}/uk/blog/ukrayinski-posluhy-zurich)
- [Booking car service in Thurgau](${BASE_URL}/uk/blog/ukrayinskyy-avtoservis-thurgau)
- [Starting a business in Switzerland as a Ukrainian](${BASE_URL}/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv)
- [Self-employment with Status S](${BASE_URL}/uk/blog/samozaynyatist-status-s-shveytcariya)
- [Einzelfirma versus GmbH](${BASE_URL}/uk/blog/einzelfirma-chy-gmbh-shveytcariya)
- [Business communities in Switzerland](${BASE_URL}/uk/blog/biznes-spilnoty-shveytcariya)
- [Interactive first-week steps and informational PDF guide](${BASE_URL}/uk/starter-kit)
- [Eight Swiss places: interactive wish list and free travel PDF](${BASE_URL}/uk/swiss-bucket-list)

## English resources

- [English Sweezy homepage](${BASE_URL}/en)
- [English Switzerland guides](${BASE_URL}/en/blog)
- [Moving to Zurich guide](${BASE_URL}/en/guides/zurich)
- [Swiss tax return 2026](${BASE_URL}/en/blog/swiss-tax-return-2026)
- [Swiss tax system for expats](${BASE_URL}/en/blog/swiss-tax-system-expats)
- [Aletsch Glacier travel guide](${BASE_URL}/en/places/aletsch-glacier)
- [Ruinaulta Rhine Gorge travel guide](${BASE_URL}/en/places/ruinaulta)
- [Creux du Van travel guide](${BASE_URL}/en/places/creux-du-van)
- [Lavaux Vineyard Terraces travel guide](${BASE_URL}/en/places/lavaux-vineyards)
- [Lake Murten travel guide](${BASE_URL}/en/places/lake-murten)
- [Bern Old Town travel guide](${BASE_URL}/en/places/bern-old-town)
- [Switzerland travel planning guide](${BASE_URL}/en/planning)

## Editorial information

- [About Sweezy](${BASE_URL}/en/about)
- [English editorial standards](${BASE_URL}/en/editorial)
- [Ukrainian editorial standards](${BASE_URL}/uk/editorial)
- [Sweezy editorial team](${BASE_URL}/en/authors/sweezy-team)
- [Support and corrections](${BASE_URL}/support)
- [XML sitemap](${BASE_URL}/sitemap.xml)

## Citation notes

Service profiles distinguish a published Ukrainian language, Ukrainian origin, Ukrainian translation services and community recommendations. Ukrainian origin alone does not establish a service language. Sources and check dates are provided on each profile; contact the provider to confirm appointments and terms.

Sweezy is a secondary practical guide, not a government authority. Time-sensitive pages identify official federal, cantonal or municipal sources. Important personal decisions should be confirmed with the responsible authority or a qualified professional.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
