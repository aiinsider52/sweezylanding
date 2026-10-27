import type { ShopProduct } from "./shop";

// Public editorial descriptions of the observed variant; supplier records stay private.
export const EXTENDED_SHOP_PRODUCTS: ShopProduct[] = [
  {
    "slug": "fondue-drawstring-bag",
    "sku": "SW-010",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Рюкзак-мішок Fondue Stories",
        "description": "Рюкзак-мішок із чорними шнурами та кольоровим принтом: фондю, хліб, сир, едельвейси й гори. Угорі — напис Switzerland.",
        "alt": "Чорно-червоний рюкзак-мішок із принтом фондю, гір та написом Switzerland"
      },
      "en": {
        "name": "Fondue Stories drawstring bag",
        "description": "A drawstring bag with black cords and a colourful fondue, bread, cheese, edelweiss and mountain print, with Switzerland lettering at the top.",
        "alt": "Drawstring bag with black cords, red fondue print, mountains and Switzerland lettering"
      },
      "de": {
        "name": "Fondue Stories Turnbeutel",
        "description": "Turnbeutel mit schwarzen Kordeln und farbigem Motiv aus Fondue, Brot, Käse, Edelweiß und Bergen. Oben steht Switzerland.",
        "alt": "Turnbeutel mit schwarzen Kordeln, rotem Fondue-Motiv, Bergen und Switzerland-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Червоний і кремовий принт, чорні шнури",
        "en": "Red and cream print, black cords",
        "de": "Rot-cremefarbenes Motiv, schwarze Kordeln"
      },
      "swatches": [
        "#8b1719",
        "#e9d4a3",
        "#171717"
      ]
    }
  },
  {
    "slug": "swiss-icons-tote",
    "sku": "SW-011",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Шоппер Swiss Icons",
        "description": "Світлий шоппер із чорними ручками, великим написом SWITZERLAND та колажем із потяга, годинників, гір, шале й швейцарських хрестів. Принт плоский 2D.",
        "alt": "Світлий шоппер із чорними ручками, червоним потягом, годинниками й написом SWITZERLAND"
      },
      "en": {
        "name": "Swiss Icons tote",
        "description": "A light tote with black handles, large SWITZERLAND lettering and a collage of a train, watches, mountains, a chalet and Swiss crosses. Flat 2D print.",
        "alt": "Light tote with black handles, a red train, watches and SWITZERLAND lettering"
      },
      "de": {
        "name": "Swiss Icons Stofftasche",
        "description": "Helle Tasche mit schwarzen Henkeln, großem SWITZERLAND-Schriftzug und einer Collage aus Zug, Uhren, Bergen, Chalet und Schweizer Kreuzen. Flacher 2D-Druck.",
        "alt": "Helle Tasche mit schwarzen Henkeln, rotem Zug, Uhren und SWITZERLAND-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Світло-бежевий, чорні ручки",
        "en": "Light beige, black handles",
        "de": "Hellbeige, schwarze Henkel"
      },
      "swatches": [
        "#ded8c8",
        "#202020",
        "#a5262a"
      ]
    }
  },
  {
    "slug": "edelweiss-black-mug",
    "sku": "SW-012",
    "category": "cups",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Горнятко Edelweiss Black",
        "description": "Чорне горнятко з ручкою праворуч, білим зображенням гір, написом SWITZERLAND і квіткою едельвейса. Об’єм і матеріал потрібно уточнити.",
        "alt": "Чорне горнятко з білими горами, едельвейсом і написом SWITZERLAND"
      },
      "en": {
        "name": "Edelweiss Black mug",
        "description": "A black mug with its handle on the right, white mountains, SWITZERLAND lettering and an edelweiss flower. Capacity and material need confirmation.",
        "alt": "Black mug with white mountains, edelweiss and SWITZERLAND lettering"
      },
      "de": {
        "name": "Edelweiss Black Tasse",
        "description": "Schwarze Tasse mit Henkel rechts, weißen Bergen, SWITZERLAND-Schriftzug und Edelweißblüte. Volumen und Material sind zu bestätigen.",
        "alt": "Schwarze Tasse mit weißen Bergen, Edelweiß und SWITZERLAND-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Чорний із білим принтом",
        "en": "Black with white print",
        "de": "Schwarz mit weißem Druck"
      },
      "swatches": [
        "#111111",
        "#f4f2e8"
      ]
    }
  },
  {
    "slug": "swiss-map-white-shirt",
    "sku": "SW-013",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Футболка Swiss Map 1291",
        "description": "Біла футболка з червоною картою Швейцарії, написами SWITZERLAND та EST 1291 на спині. Референс також показує малий принт на грудях; розміри та склад тканини уточнюються.",
        "alt": "Спинка білої футболки з червоною картою Швейцарії та написами SWITZERLAND, EST 1291"
      },
      "en": {
        "name": "Swiss Map 1291 T-shirt",
        "description": "A white T-shirt with a red Switzerland map and SWITZERLAND / EST 1291 back print. The reference also shows a small chest print; sizes and fabric composition need confirmation.",
        "alt": "Back of a white T-shirt with a red Switzerland map and SWITZERLAND, EST 1291 print"
      },
      "de": {
        "name": "Swiss Map 1291 T-Shirt",
        "description": "Weißes T-Shirt mit roter Schweizkarte und SWITZERLAND / EST 1291 auf dem Rücken. Die Vorlage zeigt auch einen kleinen Brustdruck; Größen und Stoffzusammensetzung sind zu klären.",
        "alt": "Rückseite eines weißen T-Shirts mit roter Schweizkarte und SWITZERLAND, EST 1291-Aufdruck"
      }
    },
    "appearance": {
      "label": {
        "uk": "Білий із червоним принтом",
        "en": "White with red print",
        "de": "Weiß mit rotem Druck"
      },
      "swatches": [
        "#f4f3ef",
        "#9a2528"
      ]
    }
  },
  {
    "slug": "swiss-peaks-white-hoodie",
    "sku": "SW-014",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Худі Swiss Peaks White",
        "description": "Біле худі з капюшоном, чорним контуром гір і великим написом SWITZERLAND на спині. На зображеннях показано саме спинку. Розміри й матеріал уточнюються.",
        "alt": "Спинка білого худі з чорним контуром гір і написом SWITZERLAND"
      },
      "en": {
        "name": "Swiss Peaks White hoodie",
        "description": "A white hoodie with a black mountain outline and large SWITZERLAND back print. Images show the back of the garment. Sizes and material need confirmation.",
        "alt": "Back of a white hoodie with black mountain outlines and SWITZERLAND lettering"
      },
      "de": {
        "name": "Swiss Peaks White Hoodie",
        "description": "Weißer Hoodie mit schwarzem Bergumriss und großem SWITZERLAND-Rückenaufdruck. Die Bilder zeigen die Rückseite. Größen und Material sind zu klären.",
        "alt": "Rückseite eines weißen Hoodies mit schwarzem Bergumriss und SWITZERLAND-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Білий із чорним принтом",
        "en": "White with black print",
        "de": "Weiß mit schwarzem Druck"
      },
      "swatches": [
        "#f5f4ef",
        "#161616"
      ]
    }
  },
  {
    "slug": "zurich-black-crossbody",
    "sku": "SW-015",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Сумка Zurich Original",
        "description": "Чорна вертикальна сумка через плече з блискавкою, чорним ременем і кремовим принтом із силуетом міста та написами ORIGINAL, ZÜRICH, SWITZERLAND.",
        "alt": "Чорна сумка через плече з кремовим силуетом міста й написами ORIGINAL, ZÜRICH, SWITZERLAND"
      },
      "en": {
        "name": "Zurich Original crossbody bag",
        "description": "A black vertical crossbody bag with a zipper, black strap and cream city-skyline print with ORIGINAL, ZÜRICH and SWITZERLAND lettering.",
        "alt": "Black crossbody bag with a cream skyline and ORIGINAL, ZÜRICH, SWITZERLAND lettering"
      },
      "de": {
        "name": "Zurich Original Umhängetasche",
        "description": "Schwarze hochformatige Umhängetasche mit Reißverschluss, schwarzem Gurt und cremefarbenem Stadtmotiv mit ORIGINAL, ZÜRICH und SWITZERLAND.",
        "alt": "Schwarze Umhängetasche mit cremefarbener Skyline und ORIGINAL, ZÜRICH, SWITZERLAND-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Чорний із кремовим принтом",
        "en": "Black with cream print",
        "de": "Schwarz mit cremefarbenem Druck"
      },
      "swatches": [
        "#171717",
        "#e9dfc6"
      ]
    }
  },
  {
    "slug": "swiss-1848-beige-hoodie",
    "sku": "SW-016",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Худі Swiss 1848 Beige",
        "description": "Бежеве худі з капюшоном, шнурами та кишенею спереду. Чорний принт поєднує SWITZERLAND, 1848, гірський малюнок і напис SCHWEIZ.",
        "alt": "Перед бежевого худі з чорними горами й написами SWITZERLAND, 1848, SCHWEIZ"
      },
      "en": {
        "name": "Swiss 1848 Beige hoodie",
        "description": "A beige pullover hoodie with drawstrings and a front pocket. Its black print combines SWITZERLAND, 1848, mountains and SCHWEIZ.",
        "alt": "Front of a beige hoodie with black mountains and SWITZERLAND, 1848, SCHWEIZ lettering"
      },
      "de": {
        "name": "Swiss 1848 Beige Hoodie",
        "description": "Beiger Kapuzenpullover mit Kordeln und Fronttasche. Schwarzer Aufdruck mit SWITZERLAND, 1848, Bergmotiv und SCHWEIZ.",
        "alt": "Vorderseite eines beigen Hoodies mit schwarzen Bergen und SWITZERLAND, 1848, SCHWEIZ-Aufdruck"
      }
    },
    "appearance": {
      "label": {
        "uk": "Бежевий із чорним принтом",
        "en": "Beige with black print",
        "de": "Beige mit schwarzem Druck"
      },
      "swatches": [
        "#e5d5b6",
        "#171717"
      ]
    }
  },
  {
    "slug": "helvetica-navy-hoodie",
    "sku": "SW-017",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Худі Helvetica Navy",
        "description": "Темно-синє худі з білим принтом на спині: SWITZERLAND, Confoederatio Helvetica, гірські вершини, 1848 і SCHWEIZ. Референс також показує малий принт спереду.",
        "alt": "Спинка темно-синього худі з білими горами й написом Confoederatio Helvetica"
      },
      "en": {
        "name": "Helvetica Navy hoodie",
        "description": "A navy hoodie with a white back print: SWITZERLAND, Confoederatio Helvetica, mountain peaks, 1848 and SCHWEIZ. The reference also shows a small front print.",
        "alt": "Back of a navy hoodie with white mountains and Confoederatio Helvetica lettering"
      },
      "de": {
        "name": "Helvetica Navy Hoodie",
        "description": "Dunkelblauer Hoodie mit weißem Rückenmotiv: SWITZERLAND, Confoederatio Helvetica, Berge, 1848 und SCHWEIZ. Die Vorlage zeigt auch einen kleinen Frontdruck.",
        "alt": "Rückseite eines dunkelblauen Hoodies mit weißen Bergen und Confoederatio Helvetica-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Темно-синій із білим принтом",
        "en": "Navy with white print",
        "de": "Dunkelblau mit weißem Druck"
      },
      "swatches": [
        "#20234b",
        "#f5f3e8"
      ]
    }
  },
  {
    "slug": "switzerland-calling-black-shirt",
    "sku": "SW-018",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Футболка Switzerland Is Calling",
        "description": "Чорна футболка з білим написом Switzerland is calling and I must go, червоною літерою S та малюнком літака, сердець і зірок. Принт спереду.",
        "alt": "Перед чорної футболки з написом Switzerland is calling, червоною S і білим літаком"
      },
      "en": {
        "name": "Switzerland Is Calling T-shirt",
        "description": "A black T-shirt with white Switzerland is calling and I must go lettering, a red S, an airplane, hearts and stars. Front print.",
        "alt": "Front of a black T-shirt with Switzerland is calling lettering, a red S and white airplane"
      },
      "de": {
        "name": "Switzerland Is Calling T-Shirt",
        "description": "Schwarzes T-Shirt mit weißem Switzerland is calling and I must go-Schriftzug, rotem S, Flugzeug, Herzen und Sternen. Frontdruck.",
        "alt": "Vorderseite eines schwarzen T-Shirts mit Switzerland is calling-Aufdruck, rotem S und weißem Flugzeug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Чорний із білим і червоним принтом",
        "en": "Black with white and red print",
        "de": "Schwarz mit weiß-rotem Druck"
      },
      "swatches": [
        "#171717",
        "#f3f1e8",
        "#a4252a"
      ]
    }
  },
  {
    "slug": "swiss-weekender-bag",
    "sku": "SW-019",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Сумка Swiss Weekender",
        "description": "Кремова дорожня сумка з коричневим ременем, двоколірними ручками, передньою кишенею на блискавці й нижнім відділенням. Білий принт — гора та SWITZERLAND.",
        "alt": "Кремова дорожня сумка з коричневим ременем, чорними вставками та білим гірським принтом"
      },
      "en": {
        "name": "Swiss Weekender bag",
        "description": "A cream travel bag with a brown shoulder strap, two-tone handles, a front zip pocket and lower compartment. White mountain and SWITZERLAND print.",
        "alt": "Cream travel bag with a brown strap, black webbing sections and white mountain print"
      },
      "de": {
        "name": "Swiss Weekender Reisetasche",
        "description": "Cremefarbene Reisetasche mit braunem Schultergurt, zweifarbigen Henkeln, vorderer Reißverschlusstasche und unterem Fach. Weißer Berg- und SWITZERLAND-Aufdruck.",
        "alt": "Cremefarbene Reisetasche mit braunem Gurt, schwarzen Gurtabschnitten und weißem Bergmotiv"
      }
    },
    "appearance": {
      "label": {
        "uk": "Кремовий, коричневий ремінь, чорні вставки",
        "en": "Cream, brown strap, black accents",
        "de": "Creme, brauner Gurt, schwarze Akzente"
      },
      "swatches": [
        "#e6e2d7",
        "#715132",
        "#1a1a1a"
      ]
    }
  },
  {
    "slug": "swiss-burgundy-ringer-shirt",
    "sku": "SW-020",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Футболка Swiss Burgundy Ringer",
        "description": "Біла футболка з бордовою горловиною та облямівкою рукавів, темними смугами на плечах і круглим бордовим принтом SWITZERLAND зі швейцарським прапором.",
        "alt": "Біла футболка з бордовою облямівкою і круглим принтом SWITZERLAND зі швейцарським прапором"
      },
      "en": {
        "name": "Swiss Burgundy Ringer T-shirt",
        "description": "A white T-shirt with burgundy neck and sleeve trim, dark shoulder stripes and a circular burgundy SWITZERLAND print with a Swiss flag.",
        "alt": "White T-shirt with burgundy trim and a round SWITZERLAND Swiss-flag print"
      },
      "de": {
        "name": "Swiss Burgundy Ringer T-Shirt",
        "description": "Weißes T-Shirt mit bordeauxfarbenem Hals- und Ärmelabschluss, dunklen Schulterstreifen und rundem SWITZERLAND-Motiv mit Schweizer Flagge.",
        "alt": "Weißes T-Shirt mit bordeauxfarbenen Abschlüssen und rundem SWITZERLAND-Motiv mit Schweizer Flagge"
      }
    },
    "appearance": {
      "label": {
        "uk": "Білий із бордовими деталями",
        "en": "White with burgundy details",
        "de": "Weiß mit bordeauxfarbenen Details"
      },
      "swatches": [
        "#f3f1eb",
        "#721d32",
        "#151515"
      ]
    }
  },
  {
    "slug": "edelweiss-black-wallet",
    "sku": "SW-021",
    "category": "accessories",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Гаманець Edelweiss Black",
        "description": "Чорний гаманець із блискавкою, застібкою із золотистою зіркою та темним принтом із горами, едельвейсом і SWITZERLAND. На візуалізаціях — лише гаманець; матеріал уточнюється.",
        "alt": "Чорний гаманець із темним гірським принтом, блискавкою та золотистою застібкою-зіркою"
      },
      "en": {
        "name": "Edelweiss Black wallet",
        "description": "A black zip wallet with a gold-coloured star snap and dark mountain, edelweiss and SWITZERLAND design. Visuals show the wallet alone; material needs confirmation.",
        "alt": "Black wallet with a dark mountain print, zipper and gold-coloured star snap"
      },
      "de": {
        "name": "Edelweiss Black Geldbörse",
        "description": "Schwarze Reißverschluss-Geldbörse mit goldfarbenem Sternknopf und dunklem Berg-, Edelweiß- und SWITZERLAND-Motiv. Die Visualisierungen zeigen nur die Geldbörse; Material ist zu klären.",
        "alt": "Schwarze Geldbörse mit dunklem Bergmotiv, Reißverschluss und goldfarbenem Sternknopf"
      }
    },
    "appearance": {
      "label": {
        "uk": "Чорний, золотиста фурнітура",
        "en": "Black, gold-coloured hardware",
        "de": "Schwarz, goldfarbene Beschläge"
      },
      "swatches": [
        "#171717",
        "#bfa84f"
      ]
    }
  },
  {
    "slug": "swiss-sky-blue-polo",
    "sku": "SW-022",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Поло Swiss Sky Blue",
        "description": "Білий верх із короткими рукавами, світло-блакитним коміром, V-подібним вирізом і блакитною облямівкою рукавів. На грудях — малий чорний принт гір і SWITZERLAND.",
        "alt": "Біле поло зі світло-блакитним коміром, облямівкою рукавів і малим гірським принтом"
      },
      "en": {
        "name": "Swiss Sky Blue polo top",
        "description": "A white short-sleeve top with a sky-blue collar, V opening and blue sleeve trim. Small black mountain and SWITZERLAND print on the chest.",
        "alt": "White polo-style top with a sky-blue collar, sleeve trim and small mountain print"
      },
      "de": {
        "name": "Swiss Sky Blue Poloshirt",
        "description": "Weißes Kurzarmoberteil mit hellblauem Kragen, V-Ausschnitt und blauem Ärmelabschluss. Kleiner schwarzer Berg- und SWITZERLAND-Aufdruck auf der Brust.",
        "alt": "Weißes Poloshirt mit hellblauem Kragen, Ärmelabschluss und kleinem Bergmotiv"
      }
    },
    "appearance": {
      "label": {
        "uk": "Білий зі світло-блакитними деталями",
        "en": "White with sky-blue details",
        "de": "Weiß mit hellblauen Details"
      },
      "swatches": [
        "#f3f1e9",
        "#a1ccdf",
        "#111111"
      ]
    }
  },
  {
    "slug": "swiss-cream-crossbody",
    "sku": "SW-023",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Сумка Swiss Cream Crossbody",
        "description": "Невелика кремова сумка через плече із золотистою фурнітурою, широким ременем із ромбами та чорним принтом гір і SWITZERLAND. Розміри та матеріал уточнюються.",
        "alt": "Кремова сумка через плече з ромбовим ременем, золотистою фурнітурою й чорним гірським принтом"
      },
      "en": {
        "name": "Swiss Cream crossbody bag",
        "description": "A small cream crossbody bag with gold-coloured hardware, a wide diamond-patterned strap and black mountain and SWITZERLAND print. Dimensions and material need confirmation.",
        "alt": "Cream crossbody bag with a diamond-patterned strap, gold-coloured hardware and black mountain print"
      },
      "de": {
        "name": "Swiss Cream Umhängetasche",
        "description": "Kleine cremefarbene Umhängetasche mit goldfarbenen Beschlägen, breitem Gurt mit Rautenmuster und schwarzem Berg- und SWITZERLAND-Aufdruck. Maße und Material sind zu klären.",
        "alt": "Cremefarbene Umhängetasche mit Rautengurt, goldfarbenen Beschlägen und schwarzem Bergmotiv"
      }
    },
    "appearance": {
      "label": {
        "uk": "Кремовий із бежевим ременем",
        "en": "Cream with a beige strap",
        "de": "Creme mit beigem Gurt"
      },
      "swatches": [
        "#e8e0ce",
        "#bda986",
        "#b59a50"
      ]
    }
  },
  {
    "slug": "switzerland-calling-black-hoodie",
    "sku": "SW-024",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Худі Switzerland Is Calling",
        "description": "Чорне худі з принтом на спині: Switzerland is calling and I must go, червона літера S, літак, серця й зірки. Розміри та склад тканини уточнюються.",
        "alt": "Спинка чорного худі з білим написом Switzerland is calling, червоною S та літаком"
      },
      "en": {
        "name": "Switzerland Is Calling hoodie",
        "description": "A black hoodie with a back print of Switzerland is calling and I must go, a red S, airplane, hearts and stars. Sizes and fabric composition need confirmation.",
        "alt": "Back of a black hoodie with white Switzerland is calling lettering, a red S and airplane"
      },
      "de": {
        "name": "Switzerland Is Calling Hoodie",
        "description": "Schwarzer Hoodie mit Rückenaufdruck Switzerland is calling and I must go, rotem S, Flugzeug, Herzen und Sternen. Größen und Stoffzusammensetzung sind zu klären.",
        "alt": "Rückseite eines schwarzen Hoodies mit weißem Switzerland is calling-Aufdruck, rotem S und Flugzeug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Чорний із білим і червоним принтом",
        "en": "Black with white and red print",
        "de": "Schwarz mit weiß-rotem Druck"
      },
      "swatches": [
        "#171717",
        "#f3f0e6",
        "#a42c30"
      ]
    }
  },
  {
    "slug": "lugano-pink-long-sleeve",
    "sku": "SW-025",
    "category": "clothing",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Лонгслів Lugano Pink",
        "description": "Рожевий верх із довгими рукавами й круглою горловиною. Спереду — світлі написи EST 1291, LUGANO, SWITZERLAND, тонкі лінії та мала червона зірка.",
        "alt": "Рожевий лонгслів зі світлим написом LUGANO, EST 1291 та малою червоною зіркою"
      },
      "en": {
        "name": "Lugano Pink long-sleeve top",
        "description": "A pink long-sleeve crewneck top with light EST 1291, LUGANO and SWITZERLAND lettering, fine line accents and a small red star on the front.",
        "alt": "Pink long-sleeve top with light LUGANO and EST 1291 lettering and a small red star"
      },
      "de": {
        "name": "Lugano Pink Langarmshirt",
        "description": "Rosafarbenes Langarmoberteil mit Rundhalsausschnitt. Vorn helle Schriftzüge EST 1291, LUGANO, SWITZERLAND, feine Linien und ein kleiner roter Stern.",
        "alt": "Rosafarbenes Langarmshirt mit hellem LUGANO- und EST 1291-Aufdruck sowie kleinem rotem Stern"
      }
    },
    "appearance": {
      "label": {
        "uk": "Рожевий зі світлим принтом",
        "en": "Pink with light print",
        "de": "Rosa mit hellem Druck"
      },
      "swatches": [
        "#cf8eae",
        "#f4eccc",
        "#b72d2a"
      ]
    }
  },
  {
    "slug": "alpine-village-throw",
    "sku": "SW-026",
    "category": "home",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Плед Alpine Village",
        "description": "Плед із кольоровим альпійським краєвидом: засніжені вершини, дерев’яні шале, зелені луки, звивиста стежка та корови. Розмір і склад тканини уточнюються.",
        "alt": "Плед із синіми засніженими горами, зеленими луками, шале та коровами"
      },
      "en": {
        "name": "Alpine Village throw",
        "description": "A throw with a colourful Alpine landscape: snowy peaks, wooden chalets, green meadows, a winding path and cows. Size and fabric composition need confirmation.",
        "alt": "Throw with blue snowy mountains, green meadows, chalets and cows"
      },
      "de": {
        "name": "Alpine Village Wohndecke",
        "description": "Wohndecke mit farbiger Alpenlandschaft: verschneite Gipfel, Holzchalets, grüne Wiesen, gewundener Weg und Kühe. Größe und Stoffzusammensetzung sind zu klären.",
        "alt": "Wohndecke mit blauen Schneebergen, grünen Wiesen, Chalets und Kühen"
      }
    },
    "appearance": {
      "label": {
        "uk": "Зелено-синій альпійський принт",
        "en": "Green and blue Alpine print",
        "de": "Grün-blaues Alpenmotiv"
      },
      "swatches": [
        "#547745",
        "#5b7b9a",
        "#8a6244"
      ]
    }
  },
  {
    "slug": "swiss-panorama-holdall",
    "sku": "SW-027",
    "category": "bags",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Сумка Swiss Panorama",
        "description": "Сумка з двома короткими ручками, чорною блискавкою, гірсько-озерним принтом і червоним написом Switzerland. На референсі вказано стібку та плоский друк, без вишивки.",
        "alt": "Сумка з короткими ручками, бірюзово-зеленим альпійським принтом і червоним написом Switzerland"
      },
      "en": {
        "name": "Swiss Panorama holdall",
        "description": "A holdall with two short handles, a black zipper, a mountain-and-lake print and red Switzerland lettering. The reference specifies quilting and flat printing, not embroidery.",
        "alt": "Holdall with short handles, a turquoise-green Alpine print and red Switzerland lettering"
      },
      "de": {
        "name": "Swiss Panorama Reisetasche",
        "description": "Tasche mit zwei kurzen Henkeln, schwarzem Reißverschluss, Berg-See-Motiv und rotem Switzerland-Schriftzug. Laut Vorlage gesteppt mit flachem Druck, ohne Stickerei.",
        "alt": "Tasche mit kurzen Henkeln, türkis-grünem Alpenmotiv und rotem Switzerland-Schriftzug"
      }
    },
    "appearance": {
      "label": {
        "uk": "Бірюзово-зелений принт із червоним написом",
        "en": "Turquoise-green print with red lettering",
        "de": "Türkis-grünes Motiv mit rotem Schriftzug"
      },
      "swatches": [
        "#76c7d3",
        "#5e9349",
        "#bd3e28"
      ]
    }
  },
  {
    "slug": "swiss-map-bedding",
    "sku": "SW-028",
    "category": "home",
    "flatPrint": true,
    "copy": {
      "uk": {
        "name": "Постільний текстиль Swiss Map",
        "description": "Кремовий постільний текстиль із синьою картою Швейцарії, годинником, потягом, горами та іншими символами. Принт плоский 2D. Склад набору, розміри й матеріал потрібно уточнити.",
        "alt": "Кремовий постільний текстиль із синьою картою Швейцарії та ілюстраціями швейцарських символів"
      },
      "en": {
        "name": "Swiss Map bedding textile",
        "description": "Cream bedding textile with a blue Switzerland map, clock, train, mountains and other symbols. Flat 2D print. Set contents, dimensions and material need confirmation.",
        "alt": "Cream bedding textile with a blue Switzerland map and illustrated Swiss symbols"
      },
      "de": {
        "name": "Swiss Map Betttextilien",
        "description": "Cremefarbene Betttextilien mit blauer Schweizkarte, Uhr, Zug, Bergen und weiteren Symbolen. Flacher 2D-Druck. Set-Inhalt, Maße und Material sind zu klären.",
        "alt": "Cremefarbene Betttextilien mit blauer Schweizkarte und illustrierten Schweizer Symbolen"
      }
    },
    "appearance": {
      "label": {
        "uk": "Кремовий із синім принтом",
        "en": "Cream with blue print",
        "de": "Creme mit blauem Druck"
      },
      "swatches": [
        "#e8dfca",
        "#455a7c"
      ]
    }
  }
];
