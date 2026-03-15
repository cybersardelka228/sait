export type NadeType = "smoke" | "molotov" | "flash" | "he";

export interface Nade {
  id: string;
  type: NadeType;
  name: string;
  position: { x: number; y: number }; // Позиция на карте в процентах
  team?: "ct" | "t" | "any";
  difficulty?: "easy" | "medium" | "hard";
}

export interface MapData {
  name: string;
  slug: string;
  description: string;
  radar: string;
  icon: string;
  image?: string;
  color?: string;
  nades: Nade[];
}

// Реальные позиции гранат для Mirage (по скриншоту CS2Tricks)
const mirageNades: Nade[] = [
  // Smokes
  { id: "mirage-smoke-1", type: "smoke", name: "A Site CT Smoke", position: { x: 27, y: 16 }, team: "t", difficulty: "easy" },
  { id: "mirage-smoke-2", type: "smoke", name: "A Site Stairs Smoke", position: { x: 28, y: 22 }, team: "t", difficulty: "medium" },
  { id: "mirage-smoke-3", type: "smoke", name: "A Ramp Smoke", position: { x: 32, y: 20 }, team: "t", difficulty: "easy" },
  { id: "mirage-smoke-4", type: "smoke", name: "Jungle Smoke", position: { x: 42, y: 14 }, team: "t", difficulty: "medium" },
  { id: "mirage-smoke-5", type: "smoke", name: "CT Spawn Smoke", position: { x: 50, y: 20 }, team: "t", difficulty: "hard" },
  { id: "mirage-smoke-6", type: "smoke", name: "Top Mid Smoke", position: { x: 58, y: 25 }, team: "any", difficulty: "easy" },
  { id: "mirage-smoke-7", type: "smoke", name: "Window Smoke", position: { x: 60, y: 30 }, team: "t", difficulty: "medium" },
  { id: "mirage-smoke-8", type: "smoke", name: "Short Smoke", position: { x: 52, y: 32 }, team: "any", difficulty: "easy" },
  { id: "mirage-smoke-9", type: "smoke", name: "Connector Smoke", position: { x: 45, y: 35 }, team: "any", difficulty: "easy" },
  { id: "mirage-smoke-10", type: "smoke", name: "B Apps Smoke", position: { x: 25, y: 32 }, team: "ct", difficulty: "medium" },
  { id: "mirage-smoke-11", type: "smoke", name: "B Site Smoke", position: { x: 25, y: 38 }, team: "t", difficulty: "easy" },
  { id: "mirage-smoke-12", type: "smoke", name: "B Short Smoke", position: { x: 42, y: 40 }, team: "t", difficulty: "easy" },
  { id: "mirage-smoke-13", type: "smoke", name: "Market Smoke", position: { x: 48, y: 45 }, team: "ct", difficulty: "medium" },
  { id: "mirage-smoke-14", type: "smoke", name: "Kitchen Smoke", position: { x: 55, y: 48 }, team: "any", difficulty: "easy" },
  { id: "mirage-smoke-15", type: "smoke", name: "B Bench Smoke", position: { x: 45, y: 52 }, team: "ct", difficulty: "easy" },
  { id: "mirage-smoke-16", type: "smoke", name: "Underpass Smoke", position: { x: 32, y: 55 }, team: "any", difficulty: "medium" },
  { id: "mirage-smoke-17", type: "smoke", name: "Mid Smoke", position: { x: 50, y: 55 }, team: "any", difficulty: "easy" },
  { id: "mirage-smoke-18", type: "smoke", name: "Palace Smoke", position: { x: 65, y: 38 }, team: "ct", difficulty: "hard" },
  { id: "mirage-smoke-19", type: "smoke", name: "Stairs Smoke", position: { x: 42, y: 28 }, team: "any", difficulty: "medium" },
  { id: "mirage-smoke-20", type: "smoke", name: "Tetris Smoke", position: { x: 35, y: 25 }, team: "t", difficulty: "easy" },

  // Molotovs
  { id: "mirage-molotov-1", type: "molotov", name: "Jungle Molly", position: { x: 43, y: 12 }, team: "t", difficulty: "easy" },
  { id: "mirage-molotov-2", type: "molotov", name: "Stairs Molly", position: { x: 26, y: 20 }, team: "any", difficulty: "medium" },
  { id: "mirage-molotov-3", type: "molotov", name: "Ramp Molly", position: { x: 30, y: 24 }, team: "t", difficulty: "easy" },
  { id: "mirage-molotov-4", type: "molotov", name: "Connector Molly", position: { x: 44, y: 38 }, team: "any", difficulty: "easy" },
  { id: "mirage-molotov-5", type: "molotov", name: "Palace Molly", position: { x: 62, y: 42 }, team: "ct", difficulty: "medium" },
  { id: "mirage-molotov-6", type: "molotov", name: "Apartments Molly", position: { x: 23, y: 35 }, team: "ct", difficulty: "easy" },
  { id: "mirage-molotov-7", type: "molotov", name: "Market Molly", position: { x: 52, y: 52 }, team: "any", difficulty: "easy" },
  { id: "mirage-molotov-8", type: "molotov", name: "B Site Molly", position: { x: 48, y: 62 }, team: "any", difficulty: "medium" },
  { id: "mirage-molotov-9", type: "molotov", name: "Kitchen Molly", position: { x: 56, y: 50 }, team: "ct", difficulty: "easy" },
  { id: "mirage-molotov-10", type: "molotov", name: "Bench Molly", position: { x: 42, y: 56 }, team: "t", difficulty: "easy" },

  // Flashbangs
  { id: "mirage-flash-1", type: "flash", name: "A Long Flash", position: { x: 38, y: 18 }, team: "t", difficulty: "easy" },
  { id: "mirage-flash-2", type: "flash", name: "Palace Flash", position: { x: 66, y: 36 }, team: "any", difficulty: "medium" },
  { id: "mirage-flash-3", type: "flash", name: "Window Flash", position: { x: 62, y: 28 }, team: "t", difficulty: "easy" },
  { id: "mirage-flash-4", type: "flash", name: "Top Mid Flash", position: { x: 56, y: 22 }, team: "any", difficulty: "easy" },
  { id: "mirage-flash-5", type: "flash", name: "Connector Flash", position: { x: 48, y: 34 }, team: "any", difficulty: "easy" },
  { id: "mirage-flash-6", type: "flash", name: "B Apps Flash", position: { x: 28, y: 38 }, team: "t", difficulty: "medium" },
  { id: "mirage-flash-7", type: "flash", name: "B Site Flash", position: { x: 38, y: 48 }, team: "any", difficulty: "easy" },
  { id: "mirage-flash-8", type: "flash", name: "Market Flash", position: { x: 50, y: 58 }, team: "ct", difficulty: "easy" },

  // HE Grenades
  { id: "mirage-he-1", type: "he", name: "A Site HE", position: { x: 32, y: 18 }, team: "any", difficulty: "easy" },
  { id: "mirage-he-2", type: "he", name: "Palace HE", position: { x: 68, y: 40 }, team: "ct", difficulty: "medium" },
  { id: "mirage-he-3", type: "he", name: "B Apps HE", position: { x: 25, y: 40 }, team: "ct", difficulty: "easy" },
  { id: "mirage-he-4", type: "he", name: "Market HE", position: { x: 55, y: 60 }, team: "any", difficulty: "easy" },
  { id: "mirage-he-5", type: "he", name: "Mid HE", position: { x: 52, y: 42 }, team: "any", difficulty: "medium" },
];

// Реальные позиции гранат для Dust 2 (по скриншоту CS2Tricks)
const dust2Nades: Nade[] = [
  // Smokes
  { id: "dust2-smoke-1", type: "smoke", name: "Long Doors Smoke", position: { x: 30, y: 18 }, team: "t", difficulty: "easy" },
  { id: "dust2-smoke-2", type: "smoke", name: "Long Corner Smoke", position: { x: 35, y: 22 }, team: "t", difficulty: "medium" },
  { id: "dust2-smoke-3", type: "smoke", name: "Long Cross Smoke", position: { x: 32, y: 26 }, team: "t", difficulty: "easy" },
  { id: "dust2-smoke-4", type: "smoke", name: "A Site Smoke", position: { x: 40, y: 14 }, team: "t", difficulty: "easy" },
  { id: "dust2-smoke-5", type: "smoke", name: "CT Spawn Smoke", position: { x: 48, y: 28 }, team: "t", difficulty: "hard" },
  { id: "dust2-smoke-6", type: "smoke", name: "Mid Doors Smoke", position: { x: 52, y: 38 }, team: "t", difficulty: "easy" },
  { id: "dust2-smoke-7", type: "smoke", name: "Xbox Smoke", position: { x: 62, y: 32 }, team: "any", difficulty: "medium" },
  { id: "dust2-smoke-8", type: "smoke", name: "CT Mid Smoke", position: { x: 55, y: 26 }, team: "t", difficulty: "easy" },
  { id: "dust2-smoke-9", type: "smoke", name: "B Window Smoke", position: { x: 72, y: 30 }, team: "t", difficulty: "medium" },
  { id: "dust2-smoke-10", type: "smoke", name: "B Site Smoke", position: { x: 68, y: 36 }, team: "t", difficulty: "easy" },
  { id: "dust2-smoke-11", type: "smoke", name: "B Doors Smoke", position: { x: 75, y: 42 }, team: "ct", difficulty: "easy" },
  { id: "dust2-smoke-12", type: "smoke", name: "Back Plat Smoke", position: { x: 82, y: 48 }, team: "t", difficulty: "medium" },
  { id: "dust2-smoke-13", type: "smoke", name: "Lower Tunnels Smoke", position: { x: 45, y: 52 }, team: "ct", difficulty: "easy" },
  { id: "dust2-smoke-14", type: "smoke", name: "Upper Tunnels Smoke", position: { x: 38, y: 48 }, team: "ct", difficulty: "medium" },
  { id: "dust2-smoke-15", type: "smoke", name: "Catwalk Smoke", position: { x: 28, y: 38 }, team: "any", difficulty: "easy" },

  // Molotovs
  { id: "dust2-molotov-1", type: "molotov", name: "Long Corner Molly", position: { x: 28, y: 20 }, team: "any", difficulty: "easy" },
  { id: "dust2-molotov-2", type: "molotov", name: "Car Molly", position: { x: 42, y: 18 }, team: "t", difficulty: "medium" },
  { id: "dust2-molotov-3", type: "molotov", name: "Mid Doors Molly", position: { x: 58, y: 35 }, team: "t", difficulty: "easy" },
  { id: "dust2-molotov-4", type: "molotov", name: "Xbox Molly", position: { x: 65, y: 28 }, team: "any", difficulty: "easy" },
  { id: "dust2-molotov-5", type: "molotov", name: "Window Molly", position: { x: 78, y: 32 }, team: "t", difficulty: "medium" },
  { id: "dust2-molotov-6", type: "molotov", name: "B Site Molly", position: { x: 72, y: 42 }, team: "any", difficulty: "easy" },
  { id: "dust2-molotov-7", type: "molotov", name: "Back Plat Molly", position: { x: 78, y: 52 }, team: "t", difficulty: "easy" },

  // Flashbangs
  { id: "dust2-flash-1", type: "flash", name: "Long Flash", position: { x: 26, y: 24 }, team: "t", difficulty: "easy" },
  { id: "dust2-flash-2", type: "flash", name: "A Site Flash", position: { x: 38, y: 16 }, team: "any", difficulty: "medium" },
  { id: "dust2-flash-3", type: "flash", name: "CT Flash", position: { x: 62, y: 20 }, team: "t", difficulty: "easy" },
  { id: "dust2-flash-4", type: "flash", name: "Xbox Flash", position: { x: 68, y: 26 }, team: "any", difficulty: "easy" },
  { id: "dust2-flash-5", type: "flash", name: "B Window Flash", position: { x: 75, y: 36 }, team: "t", difficulty: "medium" },
  { id: "dust2-flash-6", type: "flash", name: "Tunnels Flash", position: { x: 42, y: 58 }, team: "ct", difficulty: "easy" },

  // HE Grenades
  { id: "dust2-he-1", type: "he", name: "Long HE", position: { x: 32, y: 20 }, team: "any", difficulty: "easy" },
  { id: "dust2-he-2", type: "he", name: "Mid HE", position: { x: 56, y: 40 }, team: "any", difficulty: "medium" },
  { id: "dust2-he-3", type: "he", name: "B Site HE", position: { x: 70, y: 50 }, team: "any", difficulty: "easy" },
];

// Генерация данных для остальных карт
const generateNadesForMap = (mapSlug: string, smokeCount: number, molotovCount: number, flashCount: number, heCount: number): Nade[] => {
  const nades: Nade[] = [];

  for (let i = 0; i < smokeCount; i++) {
    const angle = (Math.PI * 2 * i) / smokeCount;
    const radius = 25 + (i % 3) * 10;
    nades.push({
      id: `${mapSlug}-smoke-${i}`,
      type: "smoke",
      name: `Smoke ${i + 1}`,
      position: {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      },
      team: ["ct", "t", "any"][i % 3] as "ct" | "t" | "any",
      difficulty: ["easy", "medium", "hard"][i % 3] as "easy" | "medium" | "hard",
    });
  }

  for (let i = 0; i < molotovCount; i++) {
    const angle = (Math.PI * 2 * i) / molotovCount + Math.PI / 4;
    const radius = 20 + (i % 2) * 15;
    nades.push({
      id: `${mapSlug}-molotov-${i}`,
      type: "molotov",
      name: `Molotov ${i + 1}`,
      position: {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      },
      team: ["ct", "t", "any"][i % 3] as "ct" | "t" | "any",
      difficulty: ["easy", "medium", "hard"][i % 3] as "easy" | "medium" | "hard",
    });
  }

  for (let i = 0; i < flashCount; i++) {
    const angle = (Math.PI * 2 * i) / flashCount - Math.PI / 3;
    const radius = 18 + (i % 3) * 12;
    nades.push({
      id: `${mapSlug}-flash-${i}`,
      type: "flash",
      name: `Flash ${i + 1}`,
      position: {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      },
      team: ["ct", "t", "any"][i % 3] as "ct" | "t" | "any",
      difficulty: ["easy", "medium", "hard"][i % 3] as "easy" | "medium" | "hard",
    });
  }

  for (let i = 0; i < heCount; i++) {
    const angle = (Math.PI * 2 * i) / heCount + Math.PI / 2;
    const radius = 22 + (i % 2) * 10;
    nades.push({
      id: `${mapSlug}-he-${i}`,
      type: "he",
      name: `HE Grenade ${i + 1}`,
      position: {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      },
      team: ["ct", "t", "any"][i % 3] as "ct" | "t" | "any",
      difficulty: ["easy", "medium", "hard"][i % 3] as "easy" | "medium" | "hard",
    });
  }

  return nades;
};

export const mapsData: Record<string, MapData> = {
  mirage: {
    name: "Mirage",
    slug: "mirage",
    description: "Find the best Mirage smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/2202472026.webp",
    image: "https://ext.same-assets.com/3359060129/1641065000.webp",
    color: "#c6b49d",
    nades: mirageNades,
  },
  dust2: {
    name: "Dust 2",
    slug: "dust2",
    description: "Find the best Dust 2 smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/3312250732.webp",
    icon: "https://ext.same-assets.com/3359060129/2184993479.webp",
    image: "https://ext.same-assets.com/3359060129/1214402164.webp",
    color: "#786a5d",
    nades: dust2Nades,
  },
  nuke: {
    name: "Nuke",
    slug: "nuke",
    description: "Find the best Nuke smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/1966436619.webp",
    icon: "https://ext.same-assets.com/3359060129/138305294.webp",
    image: "https://ext.same-assets.com/3359060129/2404012592.webp",
    color: "#869faa",
    nades: generateNadesForMap("nuke", 57, 17, 14, 7),
  },
  inferno: {
    name: "Inferno",
    slug: "inferno",
    description: "Find the best Inferno smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/3261841708.webp",
    image: "https://ext.same-assets.com/3359060129/486965699.webp",
    color: "#ae3e38",
    nades: generateNadesForMap("inferno", 89, 28, 19, 8),
  },
  overpass: {
    name: "Overpass",
    slug: "overpass",
    description: "Find the best Overpass smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/637899269.webp",
    image: "https://ext.same-assets.com/3359060129/3289408118.webp",
    color: "#55615c",
    nades: generateNadesForMap("overpass", 65, 15, 18, 5),
  },
  ancient: {
    name: "Ancient",
    slug: "ancient",
    description: "Find the best Ancient smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/2576198808.webp",
    image: "https://ext.same-assets.com/3359060129/2213607437.webp",
    color: "#4c463e",
    nades: generateNadesForMap("ancient", 78, 21, 16, 9),
  },
  train: {
    name: "Train",
    slug: "train",
    description: "Find the best Train smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/2145152191.webp",
    image: "https://ext.same-assets.com/3359060129/1985089810.webp",
    color: "#475060",
    nades: generateNadesForMap("train", 52, 13, 14, 6),
  },
  cache: {
    name: "Cache",
    slug: "cache",
    description: "Find the best Cache smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/146268884.webp",
    image: "https://ext.same-assets.com/3359060129/2233703930.webp",
    color: "#6784a4",
    nades: generateNadesForMap("cache", 48, 11, 12, 4),
  },
  anubis: {
    name: "Anubis",
    slug: "anubis",
    description: "Find the best Anubis smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/3100203410.webp",
    nades: generateNadesForMap("anubis", 42, 9, 11, 3),
  },
  vertigo: {
    name: "Vertigo",
    slug: "vertigo",
    description: "Find the best Vertigo smokes, molotovs, flashbangs, and HE grenades for Counter-Strike 2.",
    radar: "https://ext.same-assets.com/3359060129/134687617.webp",
    icon: "https://ext.same-assets.com/3359060129/1384882814.webp",
    nades: generateNadesForMap("vertigo", 39, 8, 10, 4),
  },
};

export const getAllMaps = () => Object.values(mapsData);

export const getMapBySlug = (slug: string) => mapsData[slug];

export const getNadeStats = () => {
  const stats = {
    smokes: 0,
    molotovs: 0,
    flashes: 0,
    he: 0,
  };

  Object.values(mapsData).forEach((map) => {
    map.nades.forEach((nade) => {
      if (nade.type === "smoke") stats.smokes++;
      else if (nade.type === "molotov") stats.molotovs++;
      else if (nade.type === "flash") stats.flashes++;
      else if (nade.type === "he") stats.he++;
    });
  });

  return stats;
};
