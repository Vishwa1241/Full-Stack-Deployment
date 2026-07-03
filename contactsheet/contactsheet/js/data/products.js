// Product catalog data.
// In a real deployment this module would be replaced by a fetch() call
// to a headless commerce API — the rest of the app is written against
// this same shape, so swapping the source is a one-file change.

export const CATEGORIES = ["Film", "Cameras", "Darkroom", "Accessories"];

export const PRODUCTS = [
  {
    id: "ochre-400",
    name: "Ochre 400",
    category: "Film",
    price: 14,
    stock: "in",
    hue: 30,
    blurb: "A warm, forgiving colour negative stock rated at ISO 400. Fine grain in daylight, rich amber shadows under tungsten.",
    specs: { Format: "35mm", ISO: "400", Exposures: "36", Type: "Color Negative" }
  },
  {
    id: "nightfall-3200",
    name: "Nightfall 3200",
    category: "Film",
    price: 16,
    stock: "in",
    hue: 250,
    blurb: "High-speed black and white stock built for available darkness. Push to 6400 for gritty, newsroom-grade grain.",
    specs: { Format: "35mm", ISO: "3200", Exposures: "36", Type: "B&W Negative" }
  },
  {
    id: "amber-instant",
    name: "Amber Instant Pack",
    category: "Film",
    price: 19,
    stock: "low",
    hue: 40,
    blurb: "Warm-toned instant film with soft edges and a two-minute develop time. Eight exposures per pack.",
    specs: { Format: "Instant", ISO: "640", Exposures: "8", Type: "Color" }
  },
  {
    id: "ochre-bulk",
    name: "Ochre 400 Bulk Roll",
    category: "Film",
    price: 110,
    stock: "in",
    hue: 32,
    blurb: "100ft bulk roll of Ochre 400 for hand-loading your own cartridges. Roughly eighteen rolls of 24 exposures.",
    specs: { Format: "Bulk 35mm", ISO: "400", Length: "100ft", Type: "Color Negative" }
  },
  {
    id: "nightfall-pro",
    name: "Nightfall 3200 Pro",
    category: "Film",
    price: 18,
    stock: "out",
    hue: 255,
    blurb: "A tighter-tolerance emulsion of Nightfall for professional push-processing. Currently back-ordered from the coating plant.",
    specs: { Format: "35mm", ISO: "3200", Exposures: "36", Type: "B&W Negative" }
  },
  {
    id: "slate-rangefinder",
    name: "Slate II Rangefinder",
    category: "Cameras",
    price: 420,
    stock: "in",
    hue: 210,
    blurb: "A fully mechanical 35mm rangefinder with coupled metering. No batteries required for the shutter — only the meter.",
    specs: { Format: "35mm", Lens: "Fixed 40mm f/1.8", Meter: "TTL CdS", Weight: "480g" }
  },
  {
    id: "wide-format-67",
    name: "Wide Format 6x7",
    category: "Cameras",
    price: 890,
    stock: "low",
    hue: 15,
    blurb: "A medium-format SLR shooting ten frames of glorious 6x7 per roll. Interchangeable backs and waist-level finder included.",
    specs: { Format: "120", "Frame size": "6x7cm", Mount: "Interchangeable", Weight: "1.4kg" }
  },
  {
    id: "half-frame-traveler",
    name: "Half-Frame Traveler",
    category: "Cameras",
    price: 260,
    stock: "in",
    hue: 160,
    blurb: "Doubles your frame count by shooting vertical half-frames. Pocketable, spring-wound, and refreshingly mechanical.",
    specs: { Format: "35mm half-frame", Lens: "Fixed 28mm f/2.8", Winder: "Manual", Weight: "210g" }
  },
  {
    id: "grain-tank-kit",
    name: "Grain Tank Developer Kit",
    category: "Darkroom",
    price: 52,
    stock: "in",
    hue: 90,
    blurb: "Everything needed for a first roll of home-developed black and white: tank, reel, thermometer, and concentrate.",
    specs: { Capacity: "2 reels", Chemistry: "B&W only", Reusable: "Yes", "Dev time": "~11 min" }
  },
  {
    id: "contact-loupe",
    name: "Contact Loupe",
    category: "Accessories",
    price: 38,
    stock: "in",
    hue: 45,
    blurb: "A folding 8x loupe for reading contact sheets and negatives on the light table. Coated glass, no chromatic fringing.",
    specs: { Magnification: "8x", Base: "Folding", Material: "Aluminum", Weight: "90g" }
  },
  {
    id: "slate-printer",
    name: "Slate Contact Printer",
    category: "Darkroom",
    price: 145,
    stock: "low",
    hue: 200,
    blurb: "A hinged glass frame for printing full contact sheets straight from the negative strip under the enlarger.",
    specs: { Capacity: "1 roll / sheet", Glass: "Anti-Newton", Hinge: "Brass", Size: "8x10in" }
  },
  {
    id: "sprocket-strap",
    name: "Sprocket Strap",
    category: "Accessories",
    price: 22,
    stock: "in",
    hue: 20,
    blurb: "A woven camera strap patterned after 35mm sprocket holes. Quick-release lugs fit most rangefinders and SLRs.",
    specs: { Length: "Adjustable", Width: "32mm", Mount: "Quick-release", Material: "Woven cotton" }
  }
];

export function getProduct(id){
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getRelated(product, count = 4){
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
}
