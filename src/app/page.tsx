"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Flame, EyeOff, Bomb, Circle } from "lucide-react";
import Link from "next/link";

const maps = [
  { name: "Mirage", slug: "mirage", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_mirage_1_png.png", color: "#c6b49d", inDevelopment: false },
  { name: "Dust 2", slug: "dust2", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_dust2_1_png.png", color: "#786a5d", inDevelopment: false },
  { name: "Nuke", slug: "nuke", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_nuke_2_png.png", color: "#869faa", inDevelopment: true },
  { name: "Inferno", slug: "inferno", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_inferno_1_png.png", color: "#ae3e38", inDevelopment: true },
  { name: "Overpass", slug: "overpass", image: "https://img2.wtftime.ru/store/2023/10/05/0jfDcXk7_big_poster_ds.jpg", color: "#55615c", inDevelopment: true },
  { name: "Ancient", slug: "ancient", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_ancient_2_png.png", color: "#4c463e", inDevelopment: true },
  { name: "Anubis", slug: "anubis", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_anubis_3_png.png", color: "#6b5d4f", inDevelopment: true },
  { name: "Train", slug: "train", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/thumbs/de_train_1_png.png", color: "#475060", inDevelopment: true },
];
const smallMaps = [
  { name: "Vertigo", slug: "vertigo", image: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_vertigo.png", color: "#5a6b7a", inDevelopment: true },
];

const nadeStats = [
  { name: "Дымов", count: "90", icon: Circle, bgColor: "#374151" },
  { name: "Молотовых", count: "39", icon: Flame, bgColor: "#7f1d1d" },
  { name: "Флешек", count: "50", icon: EyeOff, bgColor: "#854d0e" },
  { name: "Осколочных", count: "18", icon: Bomb, bgColor: "#365314" },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setIsDark(storedTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleImageError = (mapName: string) => {
    setImageErrors(prev => ({ ...prev, [mapName]: true }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#1d1d1d] text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-[#d4a257]">RASKIDKA</span>.ru
          </h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-200"} shadow-lg`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {maps.map(map => (
            <Link
              key={map.name}
              href={`/${map.slug}`}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#d4a257] ${isDark ? "shadow-lg shadow-black/50" : "shadow-lg"} ${map.inDevelopment ? 'pointer-events-none' : ''}`}
            >
              <div className="aspect-[4/3] relative" style={{ backgroundColor: map.color }}>
                {!imageErrors[map.name] && (
                  <img
                    src={map.image}
                    alt={map.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(map.name)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90" />
<h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-lg transition-all duration-300 group-hover:text-[#d4a257]">
  {map.name}
</h2>
{map.inDevelopment && (
  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
    <div className="relative">
      <div

        className="flex items-center justify-center w-[400px] h-[35px] font-bold text-lg tracking-wider transform rotate-[36deg] shadow-2xl"
        style={{
          background: 'repeating-linear-gradient(45deg, #000, #000 10px, #d4a257 10px, #d4a257 20px)',
          border: '0px solid #d4a257',
        }}
      >
        <span className="text-white drop-shadow-lg">В РАЗРАБОТКЕ</span>
      </div>
    </div>
  </div>
)}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {smallMaps.map(map => (
            <Link
              key={map.name}
              href={`/${map.slug}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-[#d4a257] ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-200"} shadow-md relative ${map.inDevelopment ? 'pointer-events-none opacity-60' : ''}`}
            >
              <img src={map.image} alt={map.name} className="w-6 h-6 rounded" />
              <span className="font-medium">{map.name}</span>
              {map.inDevelopment && (
                <span className="ml-2 px-2 py-1 text-xs font-bold rounded" style={{ background: 'repeating-linear-gradient(45deg, #000, #000 5px, #d4a257 5px, #d4a257 10px)', color: 'white' }}>
                  В разработке
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nadeStats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className={`flex items-center gap-3 p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow-md`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stat.bgColor }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
