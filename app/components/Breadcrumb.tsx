import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const BASE_URL = "https://www.sweezy.world";

function toSchemaUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function toHref(url: string) {
  if (url.startsWith(BASE_URL)) {
    const pathname = url.slice(BASE_URL.length);
    return pathname || "/";
  }

  return url;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toSchemaUrl(item.url),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-current opacity-55">
        <ol className="flex flex-wrap items-center gap-2 list-none p-0">
          {items.map((item, index) => (
            <li key={`${item.url}-${index}`} className="flex items-center gap-2">
              {index < items.length - 1 ? (
                <>
                  <Link href={toHref(item.url)} className="transition-opacity hover:opacity-60">
                    {item.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              ) : (
                <span aria-current="page" className="opacity-75">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
