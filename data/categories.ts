export type SubCategory = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  tags: string[]; // matches product tags for filtering
};

export type CategoryMeta = {
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  featured?: string; // featured product name snippet
  subCategories: SubCategory[];
};

export const CATEGORY_META: CategoryMeta[] = [
  {
    name: "Electronics",
    slug: "Electronics",
    icon: "🖥️",
    color: "from-blue-500/20 to-indigo-500/10",
    description: "Cutting-edge gadgets and tech accessories.",
    subCategories: [
      {
        name: "Audio",
        slug: "audio",
        icon: "🎧",
        description: "Headphones, earbuds & speakers",
        tags: ["audio", "wireless", "portable"],
      },
      {
        name: "Gaming",
        slug: "gaming",
        icon: "🎮",
        description: "Keyboards, mice & monitors",
        tags: ["gaming", "keyboard", "mouse", "monitor"],
      },
      {
        name: "Cameras",
        slug: "cameras",
        icon: "📷",
        description: "Mirrorless, DSLR & accessories",
        tags: ["camera", "photography"],
      },
      {
        name: "Wearables",
        slug: "wearables",
        icon: "⌚",
        description: "Smartwatches & fitness trackers",
        tags: ["wearable", "fitness"],
      },
      {
        name: "Smart Home",
        slug: "smart-home",
        icon: "🏠",
        description: "Hubs, vacuums & air purifiers",
        tags: ["smart-home", "home", "cleaning", "air-quality"],
      },
      {
        name: "Accessories",
        slug: "accessories",
        icon: "🔌",
        description: "Hubs, cables & chargers",
        tags: ["accessories"],
      },
    ],
  },
  {
    name: "Footwear",
    slug: "Footwear",
    icon: "👟",
    color: "from-orange-500/20 to-amber-500/10",
    description: "Step up your style with premium shoes.",
    subCategories: [
      {
        name: "Running",
        slug: "running",
        icon: "🏃",
        description: "Performance running shoes",
        tags: ["running", "sports"],
      },
      {
        name: "Casual",
        slug: "casual",
        icon: "👞",
        description: "Everyday lifestyle sneakers",
        tags: ["casual", "lifestyle", "comfort"],
      },
      {
        name: "Hiking",
        slug: "hiking",
        icon: "🥾",
        description: "Trail & outdoor boots",
        tags: ["hiking", "outdoor", "trail"],
      },
      {
        name: "Training",
        slug: "training",
        icon: "💪",
        description: "Gym & cross-training shoes",
        tags: ["training", "sports"],
      },
    ],
  },
  {
    name: "Clothing",
    slug: "Clothing",
    icon: "👕",
    color: "from-green-500/20 to-emerald-500/10",
    description: "Timeless styles and modern essentials.",
    subCategories: [
      {
        name: "Tops & Tees",
        slug: "tops",
        icon: "👕",
        description: "T-shirts, sweaters & shirts",
        tags: ["basics", "casual", "summer"],
      },
      {
        name: "Bottoms",
        slug: "bottoms",
        icon: "👖",
        description: "Chinos, jeans & trousers",
        tags: ["pants", "casual"],
      },
      {
        name: "Outerwear",
        slug: "outerwear",
        icon: "🧥",
        description: "Jackets, coats & puffers",
        tags: ["winter", "jacket", "outdoor"],
      },
      {
        name: "Activewear",
        slug: "activewear",
        icon: "🩱",
        description: "Yoga pants & sport tops",
        tags: ["sports", "yoga"],
      },
    ],
  },
  {
    name: "Accessories",
    slug: "Accessories",
    icon: "👜",
    color: "from-purple-500/20 to-pink-500/10",
    description: "Complete any look with curated accessories.",
    subCategories: [
      {
        name: "Bags",
        slug: "bags",
        icon: "🎒",
        description: "Backpacks, totes & luggage",
        tags: ["bag", "travel", "luggage"],
      },
      {
        name: "Wallets",
        slug: "wallets",
        icon: "👛",
        description: "Leather wallets & cardholders",
        tags: ["leather", "wallet"],
      },
      {
        name: "Eyewear",
        slug: "eyewear",
        icon: "🕶️",
        description: "Sunglasses & frames",
        tags: ["eyewear", "summer"],
      },
      {
        name: "Watches",
        slug: "watches",
        icon: "⌚",
        description: "Analog & digital timepieces",
        tags: ["watch", "classic"],
      },
      {
        name: "Belts & Scarves",
        slug: "belts-scarves",
        icon: "🧣",
        description: "Belts, scarves & wraps",
        tags: ["leather", "belt", "silk", "fashion"],
      },
    ],
  },
  {
    name: "Furniture",
    slug: "Furniture",
    icon: "🪑",
    color: "from-yellow-500/20 to-amber-500/10",
    description: "Ergonomic furniture for productive spaces.",
    subCategories: [
      {
        name: "Desks",
        slug: "desks",
        icon: "🗄️",
        description: "Standing & sit-stand desks",
        tags: ["office", "ergonomic"],
      },
      {
        name: "Chairs",
        slug: "chairs",
        icon: "🪑",
        description: "Ergonomic office chairs",
        tags: ["office", "ergonomic"],
      },
      {
        name: "Storage",
        slug: "storage",
        icon: "📚",
        description: "Bookshelves & organizers",
        tags: ["storage", "home"],
      },
      {
        name: "Lighting",
        slug: "lighting",
        icon: "💡",
        description: "Desk lamps & smart lights",
        tags: ["lighting", "office"],
      },
    ],
  },
  {
    name: "Sports",
    slug: "Sports",
    icon: "🏋️",
    color: "from-red-500/20 to-rose-500/10",
    description: "Gear up for peak performance.",
    subCategories: [
      {
        name: "Fitness Equipment",
        slug: "fitness",
        icon: "🏋️",
        description: "Dumbbells, bands & mats",
        tags: ["fitness", "workout", "weights", "yoga"],
      },
      {
        name: "Nutrition",
        slug: "nutrition",
        icon: "🥤",
        description: "Protein, supplements & hydration",
        tags: ["nutrition", "hydration"],
      },
      {
        name: "Cardio",
        slug: "cardio",
        icon: "🏃",
        description: "Jump ropes & cardio gear",
        tags: ["cardio"],
      },
    ],
  },
  {
    name: "Beauty",
    slug: "Beauty",
    icon: "💄",
    color: "from-pink-500/20 to-rose-500/10",
    description: "Premium skincare, makeup & wellness.",
    subCategories: [
      {
        name: "Skincare",
        slug: "skincare",
        icon: "🧴",
        description: "Serums, moisturizers & SPF",
        tags: ["skincare", "serum", "sunscreen"],
      },
      {
        name: "Makeup",
        slug: "makeup",
        icon: "💄",
        description: "Lipsticks, foundations & more",
        tags: ["makeup", "lips"],
      },
      {
        name: "Hair Care",
        slug: "hair",
        icon: "💇",
        description: "Dryers, stylers & treatments",
        tags: ["hair", "tools"],
      },
      {
        name: "Fragrance",
        slug: "fragrance",
        icon: "🌸",
        description: "Perfumes & colognes",
        tags: ["fragrance", "luxury"],
      },
      {
        name: "Dental",
        slug: "dental",
        icon: "🦷",
        description: "Electric toothbrushes & care",
        tags: ["dental", "health"],
      },
    ],
  },
  {
    name: "Kitchen",
    slug: "Kitchen",
    icon: "🍳",
    color: "from-teal-500/20 to-cyan-500/10",
    description: "Professional-grade kitchen tools.",
    subCategories: [
      {
        name: "Coffee & Tea",
        slug: "coffee",
        icon: "☕",
        description: "Espresso machines & pour-overs",
        tags: ["coffee", "brewing", "espresso"],
      },
      {
        name: "Cookware",
        slug: "cookware",
        icon: "🍳",
        description: "Cast iron, pans & pots",
        tags: ["cookware", "oven-safe"],
      },
      {
        name: "Knives & Tools",
        slug: "knives",
        icon: "🔪",
        description: "Chef knives & kitchen gadgets",
        tags: ["knife", "cooking"],
      },
      {
        name: "Appliances",
        slug: "appliances",
        icon: "🫙",
        description: "Blenders, mixers & more",
        tags: ["blender", "smoothie"],
      },
    ],
  },
];

export const getCategoryMeta = (slug: string) =>
  CATEGORY_META.find((c) => c.slug === slug);

export const getSubCategoryMeta = (catSlug: string, subSlug: string) =>
  getCategoryMeta(catSlug)?.subCategories.find((s) => s.slug === subSlug);
