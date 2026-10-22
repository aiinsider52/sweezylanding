export type UkrainianService = {
  slug: string;
  name: string;
  category: string;
  canton: string;
  city: string;
  street: string;
  postalCode: string;
  website: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  summary: string;
  ukrainianConnection: string;
  checkedAt: string;
  services: { title: string; description: string; source: string }[];
  sources: { name: string; url: string }[];
};

export const ukrainianServices: UkrainianService[] = [
  {
    slug: "classic-car-die-garage",
    name: "Classic Car die Garage GmbH",
    category: "Автосервіс",
    canton: "Тургау",
    city: "Roggwil TG",
    street: "St. Gallerstrasse 29",
    postalCode: "9325",
    website: "https://classiccardiegarage.ch/",
    phone: "+41712786060",
    phoneDisplay: "+41 71 278 60 60",
    email: "info@classiccardiegarage.ch",
    summary: "Обслуговування легкових автомобілів і роботи з олдтаймерами в Roggwil, кантон Тургау.",
    ukrainianConnection: "За інформацією, наданою редакції Sweezy, у гаражі працюють українці. Можливість запису й пояснення ремонту українською уточніть безпосередньо в гаражі.",
    checkedAt: "2026-10-22",
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
];

export function getUkrainianService(slug: string) {
  return ukrainianServices.find((service) => service.slug === slug);
}

export function servicePath(service: UkrainianService) {
  return `/uk/services/${service.slug}`;
}

export function serviceDirections(service: UkrainianService) {
  const address = `${service.street}, ${service.postalCode} ${service.city}, Switzerland`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function serviceSchema(service: UkrainianService) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `https://www.sweezy.world${servicePath(service)}#business`,
    name: service.name,
    url: service.website,
    mainEntityOfPage: `https://www.sweezy.world${servicePath(service)}`,
    description: service.summary,
    telephone: service.phone,
    email: service.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: service.street,
      postalCode: service.postalCode,
      addressLocality: "Roggwil",
      addressRegion: "Thurgau",
      addressCountry: "CH",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Послуги гаража",
      itemListElement: service.services.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.title, url: item.source } })),
    },
  };
}
