import type { ShopProduct } from "./shop";
import type { ShopStory } from "./shop-stories";
import type { Locale } from "../lib/i18n";

// Descriptions of the visible reference variant; purchasing records remain private.
export const AUTUMN_SHOP_PRODUCTS: ShopProduct[] = [
  {
    "slug": "matterhorn-sunset-tote",
    "sku": "SW-029",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Шоппер Matterhorn Sunset",
        "description": "Кремовий шоппер із широкими ручками, чорним краєм і принтом гір, сосен та помаранчевого сонця. На зображенні — написи SWITZERLAND та ALPS · EUROPE. Декор — плоский друк; розміри й матеріал уточнюються.",
        "alt": "Кремовий шоппер із чорними краями ручок, горами, зеленими соснами та помаранчевим сонцем"
      },
      "en": {
        "name": "Matterhorn Sunset tote",
        "description": "A cream tote with broad handles, black binding and a mountain, pine and orange-sun print. The visible lettering reads SWITZERLAND and ALPS · EUROPE. Flat print; dimensions and material need confirmation.",
        "alt": "Cream tote with black handle binding, mountains, green pines and an orange sun"
      },
      "de": {
        "name": "Matterhorn Sunset Tasche",
        "description": "Cremefarbene Tasche mit breiten Henkeln, schwarzer Einfassung und einem Druck aus Bergen, Tannen und orangefarbener Sonne. Sichtbare Schriftzüge: SWITZERLAND und ALPS · EUROPE. Flacher Druck; Maße und Material sind zu klären.",
        "alt": "Cremefarbene Tasche mit schwarzer Henkeleinfassung, Bergen, grünen Tannen und orangefarbener Sonne"
      }
    },
    "appearance": {
      "label": {
        "uk": "Кремовий, зелений, помаранчевий і чорний",
        "en": "Cream, green, orange and black",
        "de": "Creme, Grün, Orange und Schwarz"
      },
      "swatches": [
        "#e6ddc7",
        "#36594b",
        "#cd853c",
        "#161716"
      ]
    }
  },
  {
    "slug": "swiss-heritage-bedding",
    "sku": "SW-030",
    "category": "home",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Постіль Swiss Heritage",
        "description": "Кремова постіль із графітовим колажем швейцарських символів: гори, потяги, годинники, фондю, сир і квіти. Референс показує принт на покривній частині та подушках; склад набору, розміри й матеріал потрібно уточнити.",
        "alt": "Кремова постіль із графітовим принтом швейцарських гір, потягів, годинників, сиру та едельвейсів"
      },
      "en": {
        "name": "Swiss Heritage bedding",
        "description": "Cream bedding with a graphite collage of Swiss mountains, trains, watches, fondue, cheese and flowers. The reference shows printed bedding and pillow fronts; set contents, dimensions and material need confirmation.",
        "alt": "Cream bedding with graphite Swiss mountain, train, watch, cheese and edelweiss illustrations"
      },
      "de": {
        "name": "Swiss Heritage Bettwäsche",
        "description": "Cremefarbene Bettwäsche mit einer graphitfarbenen Collage aus Schweizer Bergen, Zügen, Uhren, Fondue, Käse und Blumen. Die Vorlage zeigt bedruckte Bettwäsche und Kissenfronten; Lieferumfang, Maße und Material sind zu bestätigen.",
        "alt": "Cremefarbene Bettwäsche mit graphitfarbenen Schweizer Berg-, Zug-, Uhren-, Käse- und Edelweißmotiven"
      }
    },
    "appearance": {
      "label": {
        "uk": "Кремовий із графітовим принтом",
        "en": "Cream with graphite print",
        "de": "Creme mit graphitfarbenem Druck"
      },
      "swatches": [
        "#e6dfcd",
        "#4d5550"
      ]
    }
  },
  {
    "slug": "swiss-edelweiss-red-crop-top",
    "sku": "SW-031",
    "category": "clothing",
    "flatPrint": true,
    "modelView": true,
    "copy": {
      "uk": {
        "name": "Кроп-футболка Edelweiss Red",
        "description": "Червона обтисла футболка вкороченого крою, з короткими рукавами та круглою горловиною. Спереду — білий принт гір, квітки й напис Switzerland. Розміри та склад тканини уточнюються.",
        "alt": "Червона коротка футболка з білими горами, квіткою та написом Switzerland спереду"
      },
      "en": {
        "name": "Edelweiss Red cropped T-shirt",
        "description": "A fitted red cropped T-shirt with short sleeves and a crew neck. The front has a white mountain-and-flower graphic and Switzerland lettering. Sizes and fabric composition need confirmation.",
        "alt": "Red cropped T-shirt with white mountains, a flower and Switzerland lettering on the front"
      },
      "de": {
        "name": "Edelweiss Red Crop-T-Shirt",
        "description": "Figurbetontes rotes Crop-T-Shirt mit kurzen Ärmeln und Rundhalsausschnitt. Vorne ein weißes Berg- und Blumenmotiv mit Switzerland-Schriftzug. Größen und Stoffzusammensetzung sind zu klären.",
        "alt": "Rotes Crop-T-Shirt mit weißen Bergen, Blume und Switzerland-Schriftzug vorne"
      }
    },
    "appearance": {
      "label": {
        "uk": "Червоний із білим принтом",
        "en": "Red with white print",
        "de": "Rot mit weißem Druck"
      },
      "swatches": [
        "#c91b35",
        "#f8f4e9"
      ]
    }
  },
  {
    "slug": "interlaken-grey-shirt",
    "sku": "SW-032",
    "category": "clothing",
    "flatPrint": true,
    "modelView": true,
    "copy": {
      "uk": {
        "name": "Футболка Interlaken Grey",
        "description": "Світло-сіра футболка з круглою горловиною й кольоровим принтом Інтерлакена: жовтий потяг, озеро, шале, гори та едельвейси. На референсі рукави підгорнуті, низ зав’язано збоку; склад тканини й розміри уточнюються.",
        "alt": "Світло-сіра футболка з жовтим потягом, горами, едельвейсами та написами Switzerland і Interlaken"
      },
      "en": {
        "name": "Interlaken Grey T-shirt",
        "description": "A light grey crew-neck T-shirt with an Interlaken print: yellow train, lake, chalet, mountains and edelweiss. The reference styles the sleeves rolled and hem knotted at the side; fabric composition and sizes need confirmation.",
        "alt": "Light grey T-shirt with a yellow train, mountains, edelweiss and Switzerland / Interlaken lettering"
      },
      "de": {
        "name": "Interlaken Grey T-Shirt",
        "description": "Hellgraues Rundhals-T-Shirt mit Interlaken-Motiv: gelber Zug, See, Chalet, Berge und Edelweiß. In der Vorlage sind die Ärmel umgeschlagen und der Saum seitlich geknotet; Stoffzusammensetzung und Größen sind zu klären.",
        "alt": "Hellgraues T-Shirt mit gelbem Zug, Bergen, Edelweiß und Switzerland-/Interlaken-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Світло-сірий із кольоровим принтом",
        "en": "Light grey with multicolour print",
        "de": "Hellgrau mit mehrfarbigem Druck"
      },
      "swatches": [
        "#bfc0bd",
        "#d3a23d",
        "#3d594a"
      ]
    }
  },
  {
    "slug": "alpine-flowers-pink-long-sleeve",
    "sku": "SW-033",
    "category": "clothing",
    "flatPrint": true,
    "modelView": true,
    "copy": {
      "uk": {
        "name": "Лонгслів Alpine Flowers Pink",
        "description": "Рожевий обтислий лонгслів із круглою горловиною та довгими рукавами. Принт поєднує гору, ліс, два шале, стежку й квіти під білим написом Switzerland. Розміри й склад тканини уточнюються.",
        "alt": "Рожевий лонгслів із горами, двома шале, червоно-білими квітами й написом Switzerland"
      },
      "en": {
        "name": "Alpine Flowers Pink long-sleeve top",
        "description": "A fitted pink long-sleeve crew-neck top. Its print combines a mountain, forest, two chalets, a path and flowers beneath white Switzerland script. Sizes and fabric composition need confirmation.",
        "alt": "Pink long-sleeve top with mountains, two chalets, red and white flowers and Switzerland lettering"
      },
      "de": {
        "name": "Alpine Flowers Pink Langarmshirt",
        "description": "Figurbetontes rosa Langarmshirt mit Rundhalsausschnitt. Das Motiv verbindet Berg, Wald, zwei Chalets, Weg und Blumen unter weißem Switzerland-Schriftzug. Größen und Stoffzusammensetzung sind zu klären.",
        "alt": "Rosa Langarmshirt mit Bergen, zwei Chalets, roten und weißen Blumen und Switzerland-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Рожевий із зеленим, білим і червоним принтом",
        "en": "Pink with green, white and red print",
        "de": "Rosa mit grünem, weißem und rotem Druck"
      },
      "swatches": [
        "#d79fbb",
        "#355048",
        "#f4efdf",
        "#cd5a5c"
      ]
    }
  },
  {
    "slug": "swiss-alps-red-long-sleeve",
    "sku": "SW-034",
    "category": "clothing",
    "flatPrint": true,
    "modelView": true,
    "copy": {
      "uk": {
        "name": "Лонгслів Swiss Alps Red",
        "description": "Червоний лонгслів вільнішого крою з круглою горловиною. Спереду — білий напис SWISS ALPS, гірський краєвид із відображенням і рукописне Switzerland. Розміри та склад тканини потрібно уточнити.",
        "alt": "Червоний лонгслів із білими горами, відображенням лісу та написами Swiss Alps і Switzerland"
      },
      "en": {
        "name": "Swiss Alps Red long-sleeve top",
        "description": "A relaxed red long-sleeve crew-neck top. The front has white SWISS ALPS lettering, a mountain scene with reflected trees and Switzerland script. Sizes and fabric composition need confirmation.",
        "alt": "Red long-sleeve top with white mountains, a reflected forest and Swiss Alps / Switzerland lettering"
      },
      "de": {
        "name": "Swiss Alps Red Langarmshirt",
        "description": "Locker geschnittenes rotes Langarmshirt mit Rundhalsausschnitt. Vorne weißer SWISS ALPS-Schriftzug, Bergmotiv mit gespiegelten Bäumen und Switzerland-Schreibschrift. Größen und Stoffzusammensetzung sind zu klären.",
        "alt": "Rotes Langarmshirt mit weißen Bergen, gespiegeltem Wald und Swiss Alps-/Switzerland-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Червоний із білим принтом",
        "en": "Red with white print",
        "de": "Rot mit weißem Druck"
      },
      "swatches": [
        "#a62837",
        "#f6f0df"
      ]
    }
  },
  {
    "slug": "basel-quilted-tote",
    "sku": "SW-035",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Шоппер Basel Skyline",
        "description": "Кремовий стьобаний шоппер із широкими ручками, чорним силуетом Базеля та написами BASEL і SWITZERLAND. Малюнок — плоский друк, не вишивка; розташування принта на ручках може відрізнятися. Матеріал і розміри уточнюються.",
        "alt": "Кремовий стьобаний шоппер із чорним силуетом Базеля, широкими ручками та написом Basel Switzerland"
      },
      "en": {
        "name": "Basel Skyline quilted tote",
        "description": "A cream quilted tote with broad handles, a black Basel skyline and BASEL / SWITZERLAND lettering. The motif is a flat print, not embroidery; placement on the handles may vary. Material and dimensions need confirmation.",
        "alt": "Cream quilted tote with a black Basel skyline, broad handles and Basel Switzerland lettering"
      },
      "de": {
        "name": "Basel Skyline Stepp-Tasche",
        "description": "Cremefarbene Stepp-Tasche mit breiten Henkeln, schwarzer Basler Skyline und BASEL-/SWITZERLAND-Schriftzug. Flach gedrucktes Motiv, keine Stickerei; die Platzierung auf den Henkeln kann variieren. Material und Maße sind zu klären.",
        "alt": "Cremefarbene Stepp-Tasche mit schwarzer Basler Skyline, breiten Henkeln und Basel Switzerland-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Кремовий із чорним принтом",
        "en": "Cream with black print",
        "de": "Creme mit schwarzem Druck"
      },
      "swatches": [
        "#dfdac9",
        "#171716"
      ]
    }
  }
];

export const AUTUMN_SHOP_STORIES: Record<string, Record<Locale, ShopStory>> = {
  "matterhorn-sunset-tote": {
    "uk": {
      "tagline": "Гірський захід сонця, який можна взяти із собою.",
      "story": "Кремовий шоппер із широкими ручками, чорним краєм і принтом гір, сосен та помаранчевого сонця. На зображенні — написи SWITZERLAND та ALPS · EUROPE. Декор — плоский друк; розміри й матеріал уточнюються.",
      "highlights": [
        "Кремовий, зелений, помаранчевий і чорний",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Міська прогулянка",
        "Образ для подорожі",
        "Подарунок із настроєм"
      ]
    },
    "en": {
      "tagline": "A mountain sunset to take with you.",
      "story": "A cream tote with broad handles, black binding and a mountain, pine and orange-sun print. The visible lettering reads SWITZERLAND and ALPS · EUROPE. Flat print; dimensions and material need confirmation.",
      "highlights": [
        "Cream, green, orange and black",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "City stroll",
        "Travel look",
        "Thoughtful gift"
      ]
    },
    "de": {
      "tagline": "Ein Bergsonnenuntergang zum Mitnehmen.",
      "story": "Cremefarbene Tasche mit breiten Henkeln, schwarzer Einfassung und einem Druck aus Bergen, Tannen und orangefarbener Sonne. Sichtbare Schriftzüge: SWITZERLAND und ALPS · EUROPE. Flacher Druck; Maße und Material sind zu klären.",
      "highlights": [
        "Creme, Grün, Orange und Schwarz",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Stadtbummel",
        "Reise-Look",
        "Geschenk mit Charakter"
      ]
    }
  },
  "swiss-heritage-bedding": {
    "uk": {
      "tagline": "Маленькі швейцарські історії для дому.",
      "story": "Кремова постіль із графітовим колажем швейцарських символів: гори, потяги, годинники, фондю, сир і квіти. Референс показує принт на покривній частині та подушках; склад набору, розміри й матеріал потрібно уточнити.",
      "highlights": [
        "Кремовий із графітовим принтом",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Затишний ранок",
        "Дім із характером",
        "Подарунок для дому"
      ]
    },
    "en": {
      "tagline": "Little Swiss stories for home.",
      "story": "Cream bedding with a graphite collage of Swiss mountains, trains, watches, fondue, cheese and flowers. The reference shows printed bedding and pillow fronts; set contents, dimensions and material need confirmation.",
      "highlights": [
        "Cream with graphite print",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "A slow morning",
        "Home with character",
        "Gift for the home"
      ]
    },
    "de": {
      "tagline": "Kleine Schweizer Geschichten für zu Hause.",
      "story": "Cremefarbene Bettwäsche mit einer graphitfarbenen Collage aus Schweizer Bergen, Zügen, Uhren, Fondue, Käse und Blumen. Die Vorlage zeigt bedruckte Bettwäsche und Kissenfronten; Lieferumfang, Maße und Material sind zu bestätigen.",
      "highlights": [
        "Creme mit graphitfarbenem Druck",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Gemütlicher Morgen",
        "Zuhause mit Charakter",
        "Geschenk fürs Zuhause"
      ]
    }
  },
  "swiss-edelweiss-red-crop-top": {
    "uk": {
      "tagline": "Червоний акцент із швейцарським настроєм.",
      "story": "Червона обтисла футболка вкороченого крою, з короткими рукавами та круглою горловиною. Спереду — білий принт гір, квітки й напис Switzerland. Розміри та склад тканини уточнюються.",
      "highlights": [
        "Червоний із білим принтом",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Міська прогулянка",
        "Образ для подорожі",
        "Подарунок із настроєм"
      ]
    },
    "en": {
      "tagline": "A red accent with Swiss spirit.",
      "story": "A fitted red cropped T-shirt with short sleeves and a crew neck. The front has a white mountain-and-flower graphic and Switzerland lettering. Sizes and fabric composition need confirmation.",
      "highlights": [
        "Red with white print",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "City stroll",
        "Travel look",
        "Thoughtful gift"
      ]
    },
    "de": {
      "tagline": "Ein roter Akzent mit Schweizer Gefühl.",
      "story": "Figurbetontes rotes Crop-T-Shirt mit kurzen Ärmeln und Rundhalsausschnitt. Vorne ein weißes Berg- und Blumenmotiv mit Switzerland-Schriftzug. Größen und Stoffzusammensetzung sind zu klären.",
      "highlights": [
        "Rot mit weißem Druck",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Stadtbummel",
        "Reise-Look",
        "Geschenk mit Charakter"
      ]
    }
  },
  "interlaken-grey-shirt": {
    "uk": {
      "tagline": "Улюблений альпійський маршрут на футболці.",
      "story": "Світло-сіра футболка з круглою горловиною й кольоровим принтом Інтерлакена: жовтий потяг, озеро, шале, гори та едельвейси. На референсі рукави підгорнуті, низ зав’язано збоку; склад тканини й розміри уточнюються.",
      "highlights": [
        "Світло-сірий із кольоровим принтом",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Міська прогулянка",
        "Образ для подорожі",
        "Подарунок із настроєм"
      ]
    },
    "en": {
      "tagline": "Your favourite Alpine route on a tee.",
      "story": "A light grey crew-neck T-shirt with an Interlaken print: yellow train, lake, chalet, mountains and edelweiss. The reference styles the sleeves rolled and hem knotted at the side; fabric composition and sizes need confirmation.",
      "highlights": [
        "Light grey with multicolour print",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "City stroll",
        "Travel look",
        "Thoughtful gift"
      ]
    },
    "de": {
      "tagline": "Deine liebste Alpenroute auf einem Shirt.",
      "story": "Hellgraues Rundhals-T-Shirt mit Interlaken-Motiv: gelber Zug, See, Chalet, Berge und Edelweiß. In der Vorlage sind die Ärmel umgeschlagen und der Saum seitlich geknotet; Stoffzusammensetzung und Größen sind zu klären.",
      "highlights": [
        "Hellgrau mit mehrfarbigem Druck",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Stadtbummel",
        "Reise-Look",
        "Geschenk mit Charakter"
      ]
    }
  },
  "alpine-flowers-pink-long-sleeve": {
    "uk": {
      "tagline": "Квіти, шале й гори в одному образі.",
      "story": "Рожевий обтислий лонгслів із круглою горловиною та довгими рукавами. Принт поєднує гору, ліс, два шале, стежку й квіти під білим написом Switzerland. Розміри й склад тканини уточнюються.",
      "highlights": [
        "Рожевий із зеленим, білим і червоним принтом",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Міська прогулянка",
        "Образ для подорожі",
        "Подарунок із настроєм"
      ]
    },
    "en": {
      "tagline": "Flowers, chalets and mountains in one look.",
      "story": "A fitted pink long-sleeve crew-neck top. Its print combines a mountain, forest, two chalets, a path and flowers beneath white Switzerland script. Sizes and fabric composition need confirmation.",
      "highlights": [
        "Pink with green, white and red print",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "City stroll",
        "Travel look",
        "Thoughtful gift"
      ]
    },
    "de": {
      "tagline": "Blumen, Chalets und Berge in einem Look.",
      "story": "Figurbetontes rosa Langarmshirt mit Rundhalsausschnitt. Das Motiv verbindet Berg, Wald, zwei Chalets, Weg und Blumen unter weißem Switzerland-Schriftzug. Größen und Stoffzusammensetzung sind zu klären.",
      "highlights": [
        "Rosa mit grünem, weißem und rotem Druck",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Stadtbummel",
        "Reise-Look",
        "Geschenk mit Charakter"
      ]
    }
  },
  "swiss-alps-red-long-sleeve": {
    "uk": {
      "tagline": "Альпійський характер у глибокому червоному.",
      "story": "Червоний лонгслів вільнішого крою з круглою горловиною. Спереду — білий напис SWISS ALPS, гірський краєвид із відображенням і рукописне Switzerland. Розміри та склад тканини потрібно уточнити.",
      "highlights": [
        "Червоний із білим принтом",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Міська прогулянка",
        "Образ для подорожі",
        "Подарунок із настроєм"
      ]
    },
    "en": {
      "tagline": "Alpine character in a rich red.",
      "story": "A relaxed red long-sleeve crew-neck top. The front has white SWISS ALPS lettering, a mountain scene with reflected trees and Switzerland script. Sizes and fabric composition need confirmation.",
      "highlights": [
        "Red with white print",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "City stroll",
        "Travel look",
        "Thoughtful gift"
      ]
    },
    "de": {
      "tagline": "Alpiner Charakter in sattem Rot.",
      "story": "Locker geschnittenes rotes Langarmshirt mit Rundhalsausschnitt. Vorne weißer SWISS ALPS-Schriftzug, Bergmotiv mit gespiegelten Bäumen und Switzerland-Schreibschrift. Größen und Stoffzusammensetzung sind zu klären.",
      "highlights": [
        "Rot mit weißem Druck",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Stadtbummel",
        "Reise-Look",
        "Geschenk mit Charakter"
      ]
    }
  },
  "basel-quilted-tote": {
    "uk": {
      "tagline": "Графічний Базель для щоденних маршрутів.",
      "story": "Кремовий стьобаний шоппер із широкими ручками, чорним силуетом Базеля та написами BASEL і SWITZERLAND. Малюнок — плоский друк, не вишивка; розташування принта на ручках може відрізнятися. Матеріал і розміри уточнюються.",
      "highlights": [
        "Кремовий із чорним принтом",
        "Малюнок, видимий на референсі",
        "Розміри та характеристики уточнюються перед замовленням"
      ],
      "moments": [
        "Міська прогулянка",
        "Образ для подорожі",
        "Подарунок із настроєм"
      ]
    },
    "en": {
      "tagline": "Graphic Basel for everyday journeys.",
      "story": "A cream quilted tote with broad handles, a black Basel skyline and BASEL / SWITZERLAND lettering. The motif is a flat print, not embroidery; placement on the handles may vary. Material and dimensions need confirmation.",
      "highlights": [
        "Cream with black print",
        "Design shown in the reference",
        "Dimensions and specifications confirmed before ordering"
      ],
      "moments": [
        "City stroll",
        "Travel look",
        "Thoughtful gift"
      ]
    },
    "de": {
      "tagline": "Grafisches Basel für tägliche Wege.",
      "story": "Cremefarbene Stepp-Tasche mit breiten Henkeln, schwarzer Basler Skyline und BASEL-/SWITZERLAND-Schriftzug. Flach gedrucktes Motiv, keine Stickerei; die Platzierung auf den Henkeln kann variieren. Material und Maße sind zu klären.",
      "highlights": [
        "Creme mit schwarzem Druck",
        "Motiv wie in der Vorlage",
        "Maße und Eigenschaften werden vor der Bestellung geklärt"
      ],
      "moments": [
        "Stadtbummel",
        "Reise-Look",
        "Geschenk mit Charakter"
      ]
    }
  }
};
