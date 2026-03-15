"use client";

import { useEffect, useState, useRef } from "react";
import { Circle, Flame, Zap, Bomb, Plus, Moon, Sun, EyeOff, X, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";

// -----------------------------
// Типы
// -----------------------------
interface Position {
  x: string;
  y: string;
  videoUrl?: string;
  description?: string;
  setpos?: string;
}

interface Nade {
  id: number;
  type: "smoke" | "molotov" | "flash" | "he";
  icon: LucideIcon;
  color: string;
  x: string;
  y: string;
  team: "t" | "ct" | "any";
  videoUrl?: string;
  title?: string;
  description?: string;
  setpos?: string;
  positions?: Position[];
  size?: string;
}

interface MapInfo {
  name: string;
  radar: string;
  icon: string;
}

// -----------------------------
// Данные карт
// -----------------------------
const mapData: Record<string, MapInfo> = {
  mirage: { name: "Mirage", radar: "https://assets.csnades.gg/mirage_game_radar_dfb164f478.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_mirage.png" },
  dust2: { name: "Dust 2", radar: "https://assets.csnades.gg/dust2_game_radar_1b998342f2.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_dust2.png" },
  inferno: { name: "Inferno", radar: "https://assets.csnades.gg/inferno_game_radar_bbecda6217.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_inferno.png" },
  overpass: { name: "Overpass", radar: "https://assets.csnades.gg/overpass_game_radar_454d8227ee.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_overpass.png" },
  anubis: { name: "Anubis", radar: "https://assets.csnades.gg/anubis_game_radar_7bada7b5e9.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_anubis.png" },
  vertigo: { name: "Vertigo", radar: "https://assets.csnades.gg/vertigo_game_radar_fdb7e7081d.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_vertigo.png" },
  nuke: { name: "Nuke", radar: "https://ext.same-assets.com/3359060129/1966436619.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_nuke.png" },
  train: { name: "Train", radar: "https://assets.csnades.gg/train_game_radar_033a7daae1.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_train.png" },
  ancient: { name: "Ancient", radar: "https://assets.csnades.gg/ancient_game_radar_14875e0cb1.webp", icon: "https://raw.githubusercontent.com/MurkyYT/cs2-map-icons/main/images/de_ancient.png" },
};

const mapsInDevelopment = ["inferno", "overpass", "ancient", "train", "cache", "anubis", "vertigo", "nuke"];

// -----------------------------
// Гранаты для каждой карты
// -----------------------------
const nadesByMap: Record<string, Nade[]> = {
  mirage: [
// -----------------------------
// He
// -----------------------------
        { id: 1, type: "he", icon: Bomb, color: "#365314", x: "78.5%", y: "69%", team: "ct", videoUrl: "https://www.youtube.com/embed/0FTTgY0PKVo", title: "HE в яму", description: "Бег + ЛКМ", setpos: "setpos -1119.971558 -1527.971680 -97.189285;setang -17.740751 0.452092 0.000000"},
        { id: 2, type: "he", icon: Bomb, color: "#365314", x: "58%", y: "85%", team: "any", videoUrl: "https://www.youtube.com/embed/KjKg3IIk5Pg", title: "HE за дефолт", description: "ЛКМ", setpos: "setpos -1548.005859 -2407.919434 -178.670273;setang -19.918804 11.272617 0.000000"},
        { id: 3, type: "he", icon: Bomb, color: "#365314", x: "61.5%", y: "68%", team: "ct", videoUrl: "https://www.youtube.com/embed/29lxEutPqto", title: "HE на тетрис", description: "Бег + ЛКМ", setpos: "setpos -1119.971558 -1527.971680 -97.189285;setang -17.740751 0.452092 0.000000"},
        { id: 4, type: "he", icon: Bomb, color: "#365314", x: "53%", y: "68%", team: "t", videoUrl: "https://www.youtube.com/embed/hy5SCJgQHmk", title: "HE на стеирс", description: "Бег + прыжок + ЛКМ", setpos: ""},
        { id: 5, type: "he", icon: Bomb, color: "#365314", x: "36%", y: "60%", team: "t", videoUrl: "https://www.youtube.com/embed/-7H82D8tDbk", title: "HE в джангл", description: "Прыжок + обе кнопки", setpos: "setpos -968.031250 -380.020142 -288.245300;setang -0.035729 -113.998238 0.000000"},
        { id: 6, type: "he", icon: Bomb, color: "#365314", x: "57%", y: "51%", team: "ct", videoUrl: "https://www.youtube.com/embed/75JSAWA1M_Y", title: "HE на стул", description: "Бег + ЛКМ", setpos: "setpos -1048.368530 285.187836 -102.972687;setang -12.569366 -57.344975 0.000000"},
        { id: 7, type: "he", icon: Bomb, color: "#365314", x: "65%", y: "40%", team: "t", videoUrl: "https://www.youtube.com/embed/GTLoAleFr0o", title: "HE развей дыма старт", description: "Прыжок + ЛКМ", setpos: ""},
        { id: 8, type: "he", icon: Bomb, color: "#365314", x: "25%", y: "12%", team: "t", videoUrl: "https://www.youtube.com/embed/_0IAFWNiQbc", title: "HE под карту", description: "Бег + ЛКМ", setpos: ""},
        { id: 9, type: "he", icon: Bomb, color: "#365314", x: "16.5%", y: "21%", team: "any", videoUrl: "https://www.youtube.com/embed/r3jU2uTA2Y8", title: "HE в плент B", description: "Бег + ЛКМ", setpos: "setpos -1686.185303 -695.970520 -104.128754;setang -5.777977 121.219810 0.000000"},
        { id: 10, type: "he", icon: Bomb, color: "#365314", x: "5%", y: "20.5%", team: "any", videoUrl: "https://www.youtube.com/embed/sNN0WmC7ns0", title: "HE форест", description: "Бег + ЛКМ", setpos: "setpos -1316.718262 812.667175 -16.128754;setang -4.566762 -161.219940 0.000000"},
        { id: 11, type: "he", icon: Bomb, color: "#365314", x: "36.5%", y: "44.5%", team: "ct", videoUrl: "", title: "Развей дыма в окно", positions: [
        {
          x: "37.5%",
          y: "53%",
          videoUrl: "https://www.youtube.com/embed/ANx-WsZMVLo",
          description: "ЛКМ",
          setpos: "",

        },
        {
          x: "34%",
          y: "57.5%",
          videoUrl: "https://www.youtube.com/embed/928jyy-E4BE",
          description: "Прыжок + ПКМ",
          setpos: "setpos -1247.938354 -924.032104 -104.128754;setang 22.572327 57.995670 0.000000"
        },
        {
          x: "35.25%",
          y: "51.5%",
          videoUrl: "https://www.youtube.com/embed/928jyy-E4BE",
          description: "Прыжок + ПКМ",
          setpos: "setpos -1247.938354 -924.032104 -104.128754;setang 22.572327 57.995670 0.000000"
        }
      ]},
// -----------------------------
// Molotov
// -----------------------------
        { id: 12, type: "molotov", icon: Flame, color: "#991b1b", x: "17%", y: "9%", team: "t", videoUrl: "https://www.youtube.com/embed/48r0C6XDXKs", title: "Молотов на выход апсов + кар", description: "ЛКМ", setpos: "setpos -1167.967041 653.125916 -16.128754;setang -8.883579 170.079102 0.000000" },
        { id: 13, type: "molotov", icon: Flame, color: "#991b1b", x: "47%", y: "14%", team: "ct", videoUrl: "https://www.youtube.com/embed/IFsPXPxJNDE", title: "Молотов на вход в апсы с шорта", description: "ЛКМ + прыжок", setpos: "setpos -752.031555 -55.415344 -100.555237;setang -35.837975 87.016235 0.000000" },
        { id: 14, type: "molotov", icon: Flame, color: "#991b1b", x: "37%", y: "44%", team: "t", videoUrl: "https://www.youtube.com/embed/juaiirIwUqo", title: "Молотов в окно", description: "ЛКМ + прыжок", setpos: "setpos 397.711700 -119.701965 -106.185959;setang 10.428302 -153.499222 0.000000" },
        { id: 15, type: "molotov", icon: Flame, color: "#991b1b", x: "56.5%", y: "51%", team: "any", videoUrl: "https://www.youtube.com/embed/EwRfL265K8Q", title: "Молотов на стул из конектора", description: "ЛКМ + прыжок", setpos: "" },
        { id: 16, type: "molotov", icon: Flame, color: "#991b1b", x: "76%", y: "70%", team: "ct", videoUrl: "https://www.youtube.com/embed/ghckfZcoZng", title: "Молотов в яму", description: "ЛКМ + бег", setpos: "setpos -939.036499 -2411.159912 -104.128754;setang -14.525906 44.044735 0.000000" },
        { id: 17, type: "molotov", icon: Flame, color: "#991b1b", x: "61.5%", y: "66%", team: "ct", videoUrl: "https://www.youtube.com/embed/CIT8MUct-1Y", title: "Молотов тетрис", description: "ЛКМ + бег", setpos: "setpos -1119.968384 -1527.435425 -97.236465;setang -8.704641 -1.877687 0.000000" },
        { id: 18, type: "molotov", icon: Flame, color: "#991b1b", x: "36%", y: "60%", team: "t", videoUrl: "https://www.youtube.com/embed/QGV8XcsEnAQ", title: "Молотов джангл", description: "ЛКМ + бег", setpos: "setpos 181.968750 -1717.968384 -104.128754;setang -8.780849 163.943970 0.000000" },
        { id: 19, type: "molotov", icon: Flame, color: "#991b1b", x: "36%", y: "63%", team: "t", videoUrl: "https://www.youtube.com/embed/G9o_dOTtYXo", title: "Молотов джангл", description: "ЛКМ + прыжок", setpos: "setpos -1050.722656 -380.047180 -199.968750;setang 10.490683 -100.446426 0.000000" },
        { id: 20, type: "molotov", icon: Flame, color: "#991b1b", x: "46.5%", y: "83%", team: "t", videoUrl: "https://www.youtube.com/embed/TOMKz6_14vk", title: "Молотов за фаер бокс (с подсадки)", description: "Подсадка + ЛКМ + бег", setpos: "setpos 681.695374 -1130.032349 0.062500;setang -11.430144 -147.831985 0.000000" },
        { id: 21, type: "molotov", icon: Flame, color: "#991b1b", x: "56.5%", y: "68%", team: "any", videoUrl: "https://www.youtube.com/embed/wCR7KEZvYOk", title: "Молотов сэндвич", description: "ЛКМ", setpos: "setpos 832.245789 -1254.900146 -45.128754;setang -19.712971 -165.168564 0.000000" },
        { id: 22, type: "molotov", icon: Flame, color: "#991b1b", x: "5%", y: "20%", team: "t", videoUrl: "https://www.youtube.com/embed/KLht3mAMpCM", title: "Молотов форест", description: "ЛКМ", setpos: "setpos -1367.989380 815.966980 -16.128754;setang -8.343489 -159.230072 0.000000" },
        { id: 23, type: "molotov", icon: Flame, color: "#991b1b", x: "16.5%", y: "21%", team: "t", videoUrl: "https://www.youtube.com/embed/qCdmIDVQSpg", title: "Молотов в плент Б", description: "ЛКМ + бег", setpos: "setpos -1320.030151 815.959045 -16.128754;setang 0.818771 -154.059540 0.000000" },
        { id: 99, type: "molotov", icon: Flame, color: "#991b1b", x: "53.5%", y: "68.5%", team: "t", title: "Молотов на стеиррс",  positions: [
        {
         x: "76%", y: "70%",
          videoUrl: "https://www.youtube.com/embed/RZjt58ErgV8",
          description: "ЛКМ + ctrl",
          setpos: "setpos 743.967834 -1719.203857 -187.239594;setang -25.203125 -176.141953 0.000000"
        },
        {
          x: "96%", y: "53%",
          videoUrl: "https://www.youtube.com/embed/rf2pAltfNEI",
          description: "ЛКМ + бег + прыжок",
          setpos: "setpos 1398.963623 -1081.039551 -103.968750;setang 3.750361 -164.151138 0.000000"
        },
      ]},
        { id: 999, type: "molotov", icon: Flame, color: "#991b1b", x: "58.5%", y: "88.5%", team: "any", title: "Молотов ниндзя",  positions: [
        {
         x: "61.5%", y: "66%",
          videoUrl: "https://www.youtube.com/embed/OiHTkyAxdJU",
          description: "ЛКМ + прыжок",
          setpos: "setpos -30.468750 -1418.033569 -104.202789;setang -11.994338 -109.224060 0.000000"
        },
        {
          x: "52%", y: "62%",
          videoUrl: "https://www.youtube.com/embed/HajASXmWu8E",
          description: "ЛКМ",
          setpos: ""
        },
      ]},
        { id: 9999, type: "molotov", icon: Flame, color: "#991b1b", x: "66%", y: "79%", team: "any", title: "Молотов андер палас",  positions: [
        {
         x: "68%", y: "65%",
          videoUrl: "https://www.youtube.com/embed/f7fsF9vhK04",
          description: "ЛКМ + бег",
          setpos: ""
        },
        {
          x: "65%", y: "89%",
          videoUrl: "https://www.youtube.com/embed/fT8IqPceLRQ",
          description: "ЛКМ",
          setpos: "setpos 16.034342 -2359.990234 23.871250;setang 9.530749 73.962105 0.000000"
        },
        {
          x: "78%", y: "85.5%",
          videoUrl: "https://www.youtube.com/embed/ZzUz_kMczio",
          description: "ЛКМ + бег",
          setpos: "setpos 567.931091 -2224.031494 23.871250;setang 0.219997 89.240341 0.000000"
        },
      ]},
// -----------------------------
// Flashes
// -----------------------------
       { id: 24, type: "flash", icon: EyeOff, color: "#a16207", x: "17.5%", y: "7%", team: "ct", videoUrl: "https://www.youtube.com/embed/SNwJ8mnDSrg", title: "Флешка на выход с апсов", description: "ЛКМ", setpos: "" },
       { id: 25, type: "flash", icon: EyeOff, color: "#a16207", x: "24.6%", y: "10%", team: "t", videoUrl: "https://www.youtube.com/embed/RdqKDVtqCw4", title: "Флешка Б сайт с апсов", description: "Бег + ЛКМ", setpos: "" },
       { id: 26, type: "flash", icon: EyeOff, color: "#a16207", x: "21.5%", y: "16.8%", team: "ct", videoUrl: "https://www.youtube.com/embed/OLrGT_EgOnc", title: "Флешка Б сайт с плента", description: "ЛКМ", setpos: "" },
       { id: 27, type: "flash", icon: EyeOff, color: "#a16207", x: "41%", y: "16.8%", team: "ct", videoUrl: "https://www.youtube.com/embed/S63Li-GsLBA", title: "Флешка андер на пуш", description: "Бег + прыжок + ЛКМ", setpos: "setpos -1030.643555 -351.864197 -302.323303;setang 12.724765 90.100761 0.000000" },
       { id: 28, type: "flash", icon: EyeOff, color: "#a16207", x: "40.5%", y: "40%", team: "ct", videoUrl: "https://www.youtube.com/embed/no9-hsck2rM", title: "Флешка андер с кона", description: "ЛКМ", setpos: "" },
       { id: 29, type: "flash", icon: EyeOff, color: "#a16207", x: "37%", y: "44.5%", team: "ct", videoUrl: "https://www.youtube.com/embed/F6mJiYE0gP8", title: "Флешка-моменталка с окна", description: "ЛКМ", setpos: "setpos -1247.968750 -924.033875 -104.128754;setang -35.997726 58.190708 0.000000" },
       { id: 30, type: "flash", icon: EyeOff, color: "#a16207", x: "71.5%", y: "49%", team: "t", videoUrl: "https://www.youtube.com/embed/NglObMQLKxw", title: "Флешка на пуш мида", description: "Бег + ЛКМ", setpos: "setpos 271.580536 -50.603271 -127.399460;setang -8.358506 -88.472122 0.000000" },
        { id: 31, type: "flash", icon: EyeOff, color: "#a16207", x: "21%", y: "7%", team: "ct", videoUrl: "", title: "Флешка-антираш апсов", positions: [
        {
          x: "15%",
          y: "5.5%",
          videoUrl: "https://www.youtube.com/embed/Gbt2n2hPsWQ",
          description: "ЛКМ",
          setpos: "setpos -2114.031250 831.946106 -60.538139;setang -65.992714 31.599655 0.000000",

        },
        {
          x: "3.7%",
          y: "23.5%",
          videoUrl: "https://www.youtube.com/embed/UstXV9lrQEQ",
          description: "ПКМ",
          setpos: "setpos -2635.967285 104.031250 -98.955994;setang -20.724165 41.690796 0.000000"
        },
        {
          x: "17%",
          y: "33%",
          videoUrl: "https://www.youtube.com/embed/85z6utXUtl8",
          description: "Прыжок + ЛКМ",
          setpos: "setpos -2096.031494 -247.922913 -101.657867;setang 5.636353 63.805920 0.000000"
        },
        {
          x: "31.5%",
          y: "19%",
          videoUrl: "https://www.youtube.com/embed/eqFNiRqRkYM",
          description: "ЛКМ",
          setpos: "setpos -1433.542969 356.198059 -104.128754;setang -36.822212 138.527725 0.000000"
        }
      ]},
        { id: 32, type: "flash", icon: EyeOff, color: "#a16207", x: "16.5%", y: "20%", team: "t", videoUrl: "https://www.youtube.com/embed/WWDVpJkRB3g", title: "Флешка на пуш Б с апсов", description: "Прыжок + Лкм", setpos: "setpos -347.076813 520.032959 -16.166100;setang -3.529878 -179.833649 -0.000000" },
        { id: 33, type: "flash", icon: EyeOff, color: "#a16207", x: "69%", y: "45%", team: "ct", videoUrl: "", title: "Флешка мид", positions: [
        {
          x: "38%",
          y: "20%",
          videoUrl: "https://www.youtube.com/embed/BgjQ3xDqo6",
          description: "Прыжок + ЛКМ",
          setpos: "setpos -1088.012939 298.499176 -96.199875;setang -8.516197 -36.191109 0.000000",
        },
        {
          x: "42%",
          y: "91%",
          videoUrl: "https://www.youtube.com/embed/w19YlPvTfwo",
          description: "Бег + прыжок + ЛКМ",
          setpos: "setpos -821.104492 -2400.778564 -108.451157;setang -13.451856 65.436218 0.000000"
        },
    ]},
  {id: 34, type: "flash", icon: EyeOff, color: "#a16207", x: "75%", y: "70%", team: "t", title: "Флешка в яму", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/dpZHAJTsY4E", setpos: "setpos 781.559143 -1650.781006 -45.128769;setang 24.344110 162.433472 0.000000"},
          {id: 35, type: "flash", icon: EyeOff, color: "#a16207", x: "69.5%", y: "67%", team: "ct", title: "Флешка в яму", description: "ЛКМ + прыжок", videoUrl: "https://www.youtube.com/embed/CYD8P2OFMoY", setpos: "setpos 151.968750 -1914.032471 -104.128754;setang -16.421324 -106.222702 0.000000"},
          {id: 36, type: "flash", icon: EyeOff, color: "#a16207", x: "60%", y: "82%", team: "ct", title: "Флешка от ямы", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/VHhzUDa7VmM", setpos: ""},
          {id: 37, type: "flash", icon: EyeOff, color: "#a16207", x: "46.5%", y: "83%", team: "ct", title: "Флешка моменталка от А плента", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/46abryahHN8", setpos: ""},
          {id: 38, type: "flash", icon: EyeOff, color: "#a16207", x: "28%", y: "88.5%", team: "t", title: "Флешка кт", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/HrcyDdNQ7iE", setpos: "setpos -603.775146 -2156.067627 -116.128754;setang -14.678355 -161.245682 0.000000"},
          {id: 39, type: "flash", icon: EyeOff, color: "#a16207", x: "54%", y: "82%", team: "t", title: "Флешка от фонаря", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/Lt9l2N6C38I", setpos: "setpos 871.256470 -1036.030518 -190.609512;setang 11.175953 89.496628 0.000000",},
          {id:40, type: "flash", icon: EyeOff, color: "#a16207", x: "49%", y: "67%", team: "t", title: "Флешка топ кон", description: "ЛКМ + шифт + шаг", videoUrl: "https://www.youtube.com/embed/cjVDb4U-bto", setpos: "setpos 442.804535 -1576.403931 -175.657654;setang -23.329876 176.667984 0.000000",},
          {id: 41, type: "flash", icon: EyeOff, color: "#a16207", x: "49%", y: "60%", team: "t", title: "Флешка кон", positions: [
        {
         x: "40.5%", y: "62.5%",
          videoUrl: "https://www.youtube.com/embed/O5MCEQgBTkE",
          description: "ЛКМ + бег",
          setpos: "setpos -992.031250 -1304.832031 -95.527008;setang -26.030338 -118.375435 0.000000"
        },
        {
          x: "58%", y: "83%",
          videoUrl: "https://www.youtube.com/embed/7TUzjnJka5E",
          description: "ЛКМ",
          setpos: "setpos -290.961548 -2160.835693 -112.196808;setang -13.635549 111.344521 0.000000"
        }]},
    {id: 42, type: "flash", icon: EyeOff, color: "#a16207", x: "49%", y: "50%", team: "t", title: "Флешка кон", positions: [
        {
         x: "72%", y: "44%",
          videoUrl: "https://www.youtube.com/embed/5_rp-PoiQLk",
          description: "ЛКМ",
          setpos: "setpos 343.302338 -621.618774 -99.206100;setang -10.117045 -169.552765 0.000000"
        },
        {
          x: "68%", y: "34%",
          videoUrl: "https://www.youtube.com/embed/X2jKWRyxMfo",
          description: "ЛКМ",
          setpos: "setpos 176.029083 -232.180298 -88.128784;setang -9.342624 -145.262024 0.000000"
        }]},
      {id: 43, type: "flash", icon: EyeOff, color: "#a16207", x: "53%", y: "45.5%", team: "t", title: "Флешка мид", positions: [
        {
         x: "56.5%", y: "51%",
          videoUrl: "https://www.youtube.com/embed/KbMEV9dpPGA",
          description: "ПКМ",
          setpos: ""
        },
        {
          x: "68%", y: "34%",
          videoUrl: "https://www.youtube.com/embed/-VwxW0hfrjA",
          description: "ЛКМ + бег",
          setpos: "setpos 257.542023 -153.617188 -104.412704;setang 6.536945 -126.873039 0.000000"
        },
        {
         x: "80%", y: "11.5%",
          videoUrl: "https://www.youtube.com/embed/PQqf144JLpo",
          description: "ЛКМ + бег + прыжок",
          setpos: "setpos 659.983215 679.968750 -72.128754;setang -3.044800 -137.535492 0.000000"
        },]},

// -----------------------------
// Smokes
// -----------------------------
    { id: 44, type: "smoke", icon: Circle, color: "#4b5563", x: "29.5%", y: "17%", team: "t", videoUrl: "https://www.youtube.com/embed/dw9PkIMzpuQ", title: "Дым шорт", description: "ЛКМ", setpos: "" },
    { id: 45, type: "smoke", icon: Circle, color: "#4b5563", x: "29.5%", y: "24%", team: "t", videoUrl: "https://www.youtube.com/embed/86Xfn_iwxBY", title: "Дым шорт", description: "Прыжок + ЛКМ", setpos: "" },
    { id: 46, type: "smoke", icon: Circle, color: "#4b5563", x: "37%", y: "24%", team: "t", videoUrl: "https://www.youtube.com/embed/RxHp-2o4mIs", title: "Дым шорт", description: "ЛКМ", setpos: "setpos -160.031250 887.968384 -71.804962;setang -45.547367 -134.624863 0.000000" },
    { id: 47, type: "smoke", icon: Circle, color: "#4b5563", x: "45%", y: "27%", team: "t", title: "Дым шорт", positions:[
        {
         x: "60%", y: "9%",
          videoUrl: "https://www.youtube.com/embed/aQyNG6JMCSY",
          description: "Прыжок + ЛКМ",
          setpos: ""
        },
        {
          x: "97.5%", y: "39%",
          videoUrl: "https://www.youtube.com/embed/QsemokTuAXE",
          description: "ЛПрыжок + ЛКМ",
          setpos: "setpos 1422.940918 -367.952393 -103.968750;setang -24.316219 170.210876 0.000000"
        },
    ]},
    { id: 48, type: "smoke", icon: Circle, color: "#4b5563", x: "10%", y: "37%", team: "t", title: "Дым мейн", positions:[
        {
         x: "60.5%", y: "5.5%",
          videoUrl: "https://www.youtube.com/embed/Qx4Awm__buM",
          description: "Прыжок + ЛКМ",
          setpos: "setpos -160.031616 887.959778 -71.804779;setang -43.335636 -150.488190 0.000000"
        },
        {
          x: "60.5%", y: "16%",
          videoUrl: "https://www.youtube.com/embed/-ELnK3MMEFk",
          description: "Прыжок + ЛКМ",
          setpos: ""
        },
    ]},
    { id: 49, type: "smoke", icon: Circle, color: "#4b5563", x: "19%", y: "37%", team: "t", title: "Дым окно китчена", positions:[
        {
         x: "60.5%", y: "5.5%",
          videoUrl: "https://www.youtube.com/embed/1OwUgPauLYI",
          description: "Прыжок + ЛКМ",
          setpos: "setpos -160.031250 887.968384 -71.804962;setang -51.091454 -147.098816 0.000000"
        },
        {
          x: "60.5%", y: "16%",
          videoUrl: "https://www.youtube.com/embed/cayV5-U_5rM",
          description: "Прыжок + ЛКМ",
          setpos: ""
        },
    ]},
    { id: 50, type: "smoke", icon: Circle, color: "#4b5563", x: "71%", y: "30%", team: "ct", videoUrl: "https://www.youtube.com/embed/nM4Rqx6K6ag", title: "Дым-антираш мида", description: "Бег + прыжок + ЛКМ", setpos: "" },
    { id: 51, type: "smoke", icon: Circle, color: "#4b5563", x: "65%", y: "39%", team: "t", videoUrl: "https://www.youtube.com/embed/nM4Rqx6K6ag", title: "Дым старт", description: "ЛКМ", setpos: " setpos 1422.968872 36.468811 -104.128754;setang -42.326729 -160.422836 0.000000" },
    { id: 52, type: "smoke", icon: Circle, color: "#4b5563", x: "48.5%", y: "51%", team: "t", title: "Дым андер-кон", positions:[
        {
         x: "91%", y: "12%",
          videoUrl: "https://www.youtube.com/embed/LOKSXZQyOI4",
          description: "Прыжок + ЛКМ",
          setpos: ""
        },
        {
          x: "76%", y: "31%",
          videoUrl: "https://www.youtube.com/embed/bVYbK941TI8",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "97%", y: "27%",
          videoUrl: "https://www.youtube.com/embed/sk8auyGHBdQ",
          description: "Прыжок + ЛКМ",
          setpos: "setpos 1422.968140 36.468758 -104.128754;setang -20.338352 -158.017029 0.000000"
        },
        {
          x: "98%", y: "30.5%",
          videoUrl: "https://www.youtube.com/embed/31zxzEvv1Qw",
          description: "Прыжок + ЛКМ",
          setpos: ""
        },
    ]},
{ id: 53, type: "smoke", icon: Circle, color: "#4b5563", x: "43%", y: "89%", team: "t", title: "Дым кт", positions: [
        {
         x: "61%", y: "10%",
          videoUrl: "https://www.youtube.com/embed/N0sQqf4tRz4",
          description: "ЛКМ + прыжок + бег",
          setpos: ""
        },
        {
          x: "73%", y: "46%",
          videoUrl: "https://www.youtube.com/embed/M81t8vwb1D0",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "60.7%", y: "65%",
          videoUrl: "https://www.youtube.com/embed/adYVim9-Vl4",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "90%", y: "54.5%",
          videoUrl: "https://www.youtube.com/embed/46Df9hkt16c",
          description: "ЛКМ + прыжок",
          setpos: "setpos 1104.054565 -990.392334 -194.271484;setang -28.533161 -144.218674 0.000000"
        },
        {
          x: "84%", y: "55%",
          videoUrl: "https://www.youtube.com/embed/pWnNiqah81E",
          description: "ЛКМ + прыжок",
          setpos: ""
        },]},
{ id: 54, type: "smoke", icon: Circle, color: "#4b5563", x: "65%", y: "84%", team: "ct", title: "Дым палас", positions: [
        {
         x: "67%", y: "79.5%",
          videoUrl: "https://www.youtube.com/embed/JopHedmakIs",
          description: "ЛКМ",
          setpos: "setpos 151.676712 -2071.963867 -104.128754;setang -33.594074 104.657623 0.000000"
        },
        {
          x: "49%", y: "61%",
          videoUrl: "https://www.youtube.com/embed/fGSliEppXp8",
          description: "ЛКМ",
          setpos: "setpos -709.970947 -1270.527832 -104.128754;setang 18.325766 178.931976 -0.000000"
        },
        {
          x: "46%", y: "32%",
          videoUrl: "https://www.youtube.com/embed/VJCNcjMUlhE",
          description: "ЛКМ + прыжок",
          setpos: "setpos -911.277649 -30.031677 -104.130264;setang -18.480247 -65.986206 0.000000"
        },
        {
          x: "17%", y: "74%",
          videoUrl: "https://www.youtube.com/embed/EZra-wXf8Z8",
          description: "ЛКМ + прыжок",
          setpos: "setpos -2031.968750 -1765.875366 -239.794189;setang -23.034025 -11.429736 0.000000"
        },]},
{ id: 55, type: "smoke", icon: Circle, color: "#4b5563", x: "70%", y: "67%", team: "ct", title: "Дым в яму", positions: [
        {
         x: "17%", y: "80%",
          videoUrl: "https://www.youtube.com/embed/Gl0vsZw9IOE",
          description: "ЛКМ + прыжок",
          setpos: "setpos -2026.396362 -2029.968750 -238.452118;setang -13.132939 12.570421 0.000000"
        },
        {
          x: "42%", y: "88.5%",
          videoUrl: "https://www.youtube.com/embed/2hc_UXZUQ6Q",
          description: "ЛКМ",
          setpos: "setpos -879.972900 -2264.021240 -109.296478;setang -11.347951 33.120403 0.000000"
        },]},
{ id: 56, type: "smoke", icon: Circle, color: "#4b5563", x: "53%", y: "68%", team: "t", title: "Дым стеирс", positions: [
        {
         x: "61%", y: "65%",
          videoUrl: "https://www.youtube.com/embed/N_530aPwhiQ",
          description: "ЛКМ",
          setpos: "setpos -30.468323 -1418.061035 -104.202835;setang -80.806747 -164.584808 0.000000"
        },
        {
          x: "83%", y: "67.8%",
          videoUrl: "https://www.youtube.com/embed/AC6BVqFDKqs",
          description: "ЛКМ + ПКМ + прыжок",
          setpos: "setpos 814.968628 -1548.987183 -45.128754;setang -3.420785 178.864273 0.000000"
        },
        {
          x: "84%", y: "55%",
          videoUrl: "https://www.youtube.com/embed/SMLCt1hai5I",
          description: "ЛКМ + прыжок",
          setpos: "setpos 907.429504 -1036.031372 -190.925110;setang -64.960747 -160.101425 0.000000"
        },
        {
          x: "59%", y: "89%",
          videoUrl: "https://www.youtube.com/embed/0opFOj1yk-0",
          description: "ЛКМ",
          setpos: "setpos -232.337708 -2399.716064 -101.071228;setang -13.569763 105.489426 0.000000"
        },]},
{ id: 57, type: "smoke", icon: Circle, color: "#4b5563", x: "48%", y: "67%", team: "t", title: "Дым Джангл", positions: [
        {
          x: "83%", y: "67.8%",
          videoUrl: "https://www.youtube.com/embed/t5GGjhflwR4",
          description: "ЛКМ + прыжок",
          setpos: "setpos 814.968628 -1548.987183 -45.128754;setang -3.420785 178.864273 0.000000"
        },
        {
          x: "84%", y: "55%",
          videoUrl: "https://www.youtube.com/embed/tFohSbCzTYM",
          description: "ЛКМ + прыжок",
          setpos: "setpos 907.429504 -1036.031372 -190.925110;setang -64.960747 -160.101425 0.000000"
        },]},
{ id: 58, type: "smoke", icon: Circle, color: "#4b5563", x: "48%", y: "60%", team: "t", title: "Дым топ кон", positions: [
        {
          x: "68%", y: "72%",
          videoUrl: "https://www.youtube.com/embed/smrcZ4R7k6g",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "93%", y: "58%",
          videoUrl: "https://www.youtube.com/embed/teOFX4N-_ZU",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "73%", y: "46%",
          videoUrl: "https://www.youtube.com/embed/2Ona5r1SXf4",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "74%", y: "19%",
          videoUrl: "https://www.youtube.com/embed/QBdhgGJm0ZQ",
          description: "ЛКМ + прыжок",
          setpos: "setpos 421.987946 350.034210 -188.128754;setang -32.103668 -129.033447 0.000000"
        },
        {
          x: "80%", y: "12%",
          videoUrl: "https://www.youtube.com/embed/tZwTYDZb1OU",
          description: "ЛКМ + прыжок",
          setpos: ""
        },]},
{ id: 59, type: "smoke", icon: Circle, color: "#4b5563", x: "42%", y: "65%", team: "t", title: "Дым в джангл", positions: [
        {
          x: "93%", y: "58%",
          videoUrl: "https://www.youtube.com/embed/FlfNtc-oN-E",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "73%", y: "46%",
          videoUrl: "https://www.youtube.com/embed/T5qls7jSRwM",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "63%", y: "65.1%",
          videoUrl: "https://www.youtube.com/embed/9V31MgF0jhg",
          description: "ЛКМ",
          setpos: ""
        },
]},
{ id: 60, type: "smoke", icon: Circle, color: "#4b5563", x: "37%", y: "45%", team: "t", title: "Дым в окно", positions: [
  {
          x: "73%", y: "46%",
          videoUrl: "https://www.youtube.com/embed/v67iZmbzjQw",
          description: "ЛКМ + бег",
          setpos: ""
  },
  {
          x: "90.5%", y: "12.5%",
          videoUrl: "https://www.youtube.com/embed/waPszXNJkIk",
          description: "ЛКМ + бег + прыжок",
          setpos: "1135.940918 647.953125 -197.218506;setang -26.923235 -151.445129 0.000000"
  },
  {
          x: "96.5%", y: "27%",
          videoUrl: "https://www.youtube.com/embed/Wq-pRJdQBsU",
          description: "ЛКМ + shift + шаг",
          setpos: ""
  },
  {
          x: "97.5%", y: "31%",
          videoUrl: "https://www.youtube.com/embed/73TqDWpRk70",
          description: "ЛКМ + ctrl",
          setpos: ""
  },
  {
          x: "94%", y: "28%",
          videoUrl: "https://www.youtube.com/embed/2XuJa0GqHL0",
          description: "ЛКМ + шаг + прыжок",
          setpos: "setpos 1296.000000 32.000000 -104.128754;setang -31.099054 -165.573624 0.000000"
  },
  {
          x: "92.5%", y: "30%",
          videoUrl: "https://www.youtube.com/embed/OEo3iFsv-ik",
          description: "ЛКМ + шаг + прыжок",
          setpos: "setpos 1216.000000 -16.000000 -101.936905;setang -43.421059 -166.397964 0.000000"
  },
  {
          x: "92.3%", y: "32.5%",
          videoUrl: "https://www.youtube.com/embed/IoiLUU4iFvE",
          description: "ЛКМ + шаг + прыжок",
          setpos: "setpos 1216.000000 -115.000000 -101.936905;setang -45.045853 -168.244492 0.000000"
  },
  {
          x: "92.5%", y: "35%",
          videoUrl: "https://www.youtube.com/embed/1Cu8p9CigYY",
          description: "ЛКМ + шаг + прыжок",
          setpos: "setpos 1216.000000 -211.000000 -100.616211;setang -46.108231 -170.285889 0.000000"
  },
  {
          x: "94.5%", y: "37%",
          videoUrl: "https://www.youtube.com/embed/4SBlvShzhZU",
          description: "ЛКМ + шаг + прыжок",
          setpos: "setpos 1296.000000 -352.000000 -104.128754;setang -42.405090 -173.729736 0.000000"
  },
]},


  ],
  dust2: [
// -----------------------------
// He
// -----------------------------
     { id: 0, type: "he", icon: Bomb, color: "#365314", x: "25.5%", y: "14%", team: "ct", videoUrl: "https://www.youtube.com/embed/WyC_8USw6Vc", title: "HE на Б ретейк", description: "ЛКМ", setpos: "" },
     { id: 1, type: "he", icon: Bomb, color: "#365314", x: "40%", y: "40%", team: "ct", videoUrl: "https://www.youtube.com/embed/5wwL6-RxRXs", title: "HE ловер", description: "Бег + ЛКМ", setpos: "setpos -615.533997 2159.811768 -56.576591;setang -2.103330 -69.235069 0.000000" },
     { id: 2, type: "he", icon: Bomb, color: "#365314", x: "45.5%", y: "35%", team: "ct", videoUrl: "https://www.youtube.com/embed/6irRza0YH64", title: "HE-развей дыма двери", description: "ЛКМ", setpos: "" },
     { id: 3, type: "he", icon: Bomb, color: "#365314", x: "60%", y: "32%", team: "ct", videoUrl: "https://www.youtube.com/embed/u1kCHQPYZlE", title: "HE на ступеньки шорта", description: "Прыжок + ЛКМ", setpos: "" },
     { id: 4, type: "he", icon: Bomb, color: "#365314", x: "66.6%", y: "55%", team: "t", videoUrl: "https://www.youtube.com/embed/ZePjgf5c9H4", title: "HE-развей дыма для пика лонг", description: "ЛКМ", setpos: "setpos 639.996399 -252.650696 62.551224;setang -13.103215 89.922890 0.000000" },
// -----------------------------
// Molotov
// -----------------------------
     { id: 5, type: "molotov", icon: Flame, color: "#991b1b", x: "76%", y: "6%", team: "any", videoUrl: "https://www.youtube.com/embed/eJhTbqToDlQ", title: "Молотов гусь", description: "Шифт + прижок + ЛКМ", setpos: "" },
     { id: 6, type: "molotov", icon: Flame, color: "#991b1b", x: "63%", y: "11%", team: "t", videoUrl: "https://www.youtube.com/embed/0TNc91e2338", title: "Молотов гендальф", description: "Ходьба + прижок + ЛКМ", setpos: "setpos 1593.937378 1523.922607 64.351433;setang -0.554345 127.954247 -0.000000" },
     { id: 7, type: "molotov", icon: Flame, color: "#991b1b", x: "72%", y: "16%", team: "t", videoUrl: "https://www.youtube.com/embed/OkV-nEHXGm4", title: "Молотов сайт и лифт", description: "Прыжок + ЛКМ", setpos: "setpos 1593.787354 1147.813477 44.852516;setang 0.336791 114.251938 0.000000" },
     { id: 8, type: "molotov", icon: Flame, color: "#991b1b", x: "62.5%", y: "29%", team: "ct", videoUrl: "https://www.youtube.com/embed/5gaaY8yKptY", title: "выход в сайт с шорта", description: "ЛКМ с прыжка + бега", setpos: "" },
     { id: 9, type: "molotov", icon: Flame, color: "#991b1b", x: "88%", y: "26%", team: "any", videoUrl: "https://www.youtube.com/embed/ZGT9HzbfXUs", title: "Молотов с дверей на машину лонг", description: "ЛКМ с прыжка", setpos: "" },
     { id: 10, type: "molotov", icon: Flame, color: "#991b1b", x: "66.6%", y: "55%", team: "ct", videoUrl: "https://www.youtube.com/embed/25WiyHfFFE4", title: "Молотов с машины на двери во вход лонга", description: "ЛКМ с прыжка + бега", setpos: "" },
     { id: 11, type: "molotov", icon: Flame, color: "#991b1b", x: "45.5%", y: "36%", team: "ct", videoUrl: "https://www.youtube.com/embed/-2M2zhCGAok", title: "Молотов с Т спавна на двери мид", description: "ЛКМ на бегу", setpos: "" },
     { id: 12, type: "molotov", icon: Flame, color: "#991b1b", x: "47.8%", y: "33%", team: "ct", videoUrl: "https://www.youtube.com/embed/6vUOlxL-kxQ", title: "Молотов с тунеля на двери мида", description: "ЛКМ", setpos: "" },
     { id: 13, type: "molotov", icon: Flame, color: "#991b1b", x: "15%", y: "36%", team: "ct", videoUrl: "https://www.youtube.com/embed/vpBxcuzs51U", title: "Молотов в тунель на б с сайта", description: "ЛКМ", setpos: "setpos -1560.886230 2805.737793 72.452103;setang -18.277836 -113.963852 0.000000" },
     { id: 14, type: "molotov", icon: Flame, color: "#991b1b", x: "12%", y: "26%", team: "ct", videoUrl: "https://www.youtube.com/embed/XpwzRROB_pA", title: "Молотов с тунеля на выход б тунель", description: "ЛКМ прыжок + ходьба", setpos: "setpos -2168.971680 1042.029785 103.738235;setang 11.780900 66.029510 0.000000" },
     { id: 15, type: "molotov", icon: Flame, color: "#991b1b", x: "16.5%", y: "19%", team: "ct", videoUrl: "https://www.youtube.com/embed/XKpkz66WpQg", title: "Молотов с кт мида на бокс опорника Б", description: "ЛКМ с прыжка", setpos: "" },
     { id: 16, type: "molotov", icon: Flame, color: "#991b1b", x: "28%", y: "12%", team: "ct", videoUrl: "https://www.youtube.com/embed/TzA7cy6F1pQ", title: "Молотов с тунеля на окно Б", description: "ЛКМ с прыжка", setpos: "setpos -2025.966553 1679.698120 96.124115;setang 2.446280 51.400585 0.000000" },
     { id: 17, type: "molotov", icon: Flame, color: "#991b1b", x: "23.5%", y: "11%", team: "ct", videoUrl: "https://www.youtube.com/embed/TkAQ9EcBclg", title: "Молотов с б сайт с окна", description: "ЛКМ с прыжка", setpos: "setpos -1273.968628 2575.968750 129.693008;setang 6.027976 11.826154 0.000000" },
     { id: 18, type: "molotov", icon: Flame, color: "#991b1b", x: "14%", y: "4%", team: "ct", title: "нычка на б", positions: [
        {
         x: "13.5%", y: "43%",
          videoUrl: "https://www.youtube.com/embed/F7dUfwnlffg",
          description: "ЛКМ с прыжка",
          setpos: "setpos -1936.968994 1042.033081 97.582199;setang 13.041574 92.786606 0.000000"
        },
        {
          x: "37%", y: "15%",
          videoUrl: "https://www.youtube.com/embed/5OHpBJAEFCY",
          description: "ЛКМ",
          setpos: ""
        },
       {
          x: "30%", y: "24%",
          videoUrl: "https://www.youtube.com/embed/5wSNAmiyuHw",
          description: "ЛКМ с прыжка",
          setpos: "setpos -1062.032715 2070.168945 129.871246;setang 6.564655 136.765808 0.000000"
        },]},


     { id: 19, type: "molotov", icon: Flame, color: "#991b1b", x: "76%", y: "16.5%", team: "ct", title: "Молотов на плент А", positions: [
        {
          x: "61%", y: "30%",
          videoUrl: "https://www.youtube.com/embed/UrUTXsVlPhA",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "86%", y: "67%",
          videoUrl: "https://www.youtube.com/embed/nd4HNr5UtGo",
          description: "ЛКМ прыжок + бег",
          setpos: ""
        },
       {
          x: "90.5%", y: "55%",
          videoUrl: "https://www.youtube.com/embed/nJwcZF1kES8",
          description: "ЛКМ прыжок + бег",
          setpos: ""
        },]},

     { id: 20, type: "molotov", icon: Flame, color: "#991b1b", x: "21.5%", y: "33%", team: "any", videoUrl: "https://www.youtube.com/embed/XXChFp4gREU", title: "Молотов на кар(Б)", description: "Бег + прыжок + ЛКМ", setpos: "" },
// -----------------------------
// Flashes
// -----------------------------
  {id: 21, type: "flash", icon: EyeOff, color: "#a16207", x: "16%", y: "14%", team: "ct", title: "Флешка-антипуш Б", description: "Бег + ЛКМ", videoUrl: "https://www.youtube.com/embed/vJGKJ3MtOgc", setpos: "setpos -1632.582397 2598.030762 65.722000;setang -24.332420 58.217968 0.000000"},
  {id: 22, type: "flash", icon: EyeOff, color: "#a16207", x: "14%", y: "18%", team: "any", title: "Флешка-антипуш Б", description: "ПКМ", videoUrl: "https://www.youtube.com/embed/pjx6riq91vQ", setpos: ""},
  {id: 23, type: "flash", icon: EyeOff, color: "#a16207", x: "10%", y: "22.5%", team: "t", title: "Флешка на хамер", description: "Бег + ЛКМ", videoUrl: "https://www.youtube.com/embed/oaGJ4HH7lEQ", setpos: "setpos -1862.192749 1150.327515 95.911247;setang -8.457086 104.834702 0.000000"},
  {id: 24, type: "flash", icon: EyeOff, color: "#a16207", x: "16%", y: "26%", team: "t", title: "Флешка Б на верх", description: "Прыжок + ЛКМ", videoUrl: "https://www.youtube.com/embed/xj5epb7fx9w", setpos: "setpos -2185.968750 1059.031860 103.050568;setang -38.262928 69.828552 0.000000"},
  {id: 25, type: "flash", icon: EyeOff, color: "#a16207", x: "19.3%", y: "33%", team: "t", title: "Флешка Б на верх", description: "Прыжок + ЛКМ", videoUrl: "https://www.youtube.com/embed/I7oNm7ZSM-I", setpos: ""},

 {id: 26, type: "flash", icon: EyeOff, color: "#a16207", x: "13%", y: "36%", team: "ct", title: "Флешка-антипуш Б", positions: [
  {
   x: "21%", y: "10%",
   videoUrl: "https://www.youtube.com/embed/mmmsvYL3bXE",
   description: "ЛКМ",
   setpos: "setpos -1562.438721 2806.372803 72.549980;setang -18.225132 -113.937370 0.000000"
   },
   {
   x: "31%", y: "12%",
   videoUrl: "https://www.youtube.com/embed/kMev3lBBjDY",
   description: "Бег + ЛКМ",
   setpos: "setpos -1070.031250 2694.380371 202.932083;setang -12.258787 -134.713364 0.000000"
}]},
{id: 27, type: "flash", icon: EyeOff, color: "#a16207", x: "13%", y: "32%", team: "any", title: "Флешка на выход с тёмки", positions: [
  {
   x: "18%", y: "32%",
   videoUrl: "https://www.youtube.com/embed/hjNl1BUTi4Q",
   description: "CTRL + ЛКМ",
   setpos: "setpos -1764.972046 1814.028442 66.013664;setang 15.325188 23.495066 0.000000"
   },
   {
   x: "14%", y: "45%",
   videoUrl: "https://www.youtube.com/embed/0Ao5AFdPyJw",
   description: "ЛКМ",
   setpos: "setpos -1839.870850 1228.699707 95.918594;setang -17.354317 120.147545 0.000000"
}]},
{id: 28, type: "flash", icon: EyeOff, color: "#a16207", x: "60%", y: "37%", team: "any", title: "Флешка-моменталка шорт", positions: [
  {
   x: "64%", y: "19%",
   videoUrl: "https://www.youtube.com/embed/65MmvkvWJJc",
   description: "ЛКМ",
   setpos: ""
   },
   {
   x: "41.5%", y: "40%",
   videoUrl: "https://www.youtube.com/embed/KbJksba7WBk",
   description: "Прыжок + ЛКМ",
   setpos: ""
}]},
    {id: 29, type: "flash", icon: EyeOff, color: "#a16207", x: "73%", y: "10%", team: "ct", title: "Флешка от шорта наверно", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/DkTecVsW0OE", setpos: ""},
    {id: 30, type: "flash", icon: EyeOff, color: "#a16207", x: "86%", y: "34%", team: "ct", title: "Флешка лонг с кара", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/_B5b2o-YRzg", setpos: "setpos 1787.94 1812.04 20.69;setang -25.86 -172.85"},
    {id: 31, type: "flash", icon: EyeOff, color: "#a16207", x: "73%", y: "55%", team: "t", title: "Флешка лонг", description: "ЛКМ + прыжок", videoUrl: "https://www.youtube.com/embed/N0WocnaWFA8", setpos: ""},
    {id: 32, type: "flash", icon: EyeOff, color: "#a16207", x: "45%", y: "35%", team: "t", title: "Флешка мид", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/Ke83HJbcyuc", setpos: ""},
    {id: 33, type: "flash", icon: EyeOff, color: "#a16207", x: "41%", y: "40%", team: "ct", title: "Флешка ловер", description: "ЛКМ + прыжок", videoUrl: "https://www.youtube.com/embed/4g4vUbTtGfk", setpos: "setpos -276.031738 1744.031250 -40.736717;setang -18.038879 121.889030 0.000000"},
    {id: 34, type: "flash", icon: EyeOff, color: "#a16207", x: "43%", y: "40%", team: "t", title: "Флешка шорт из ловера", description: "ЛКМ", videoUrl: "https://www.youtube.com/embed/W58dHtse3-A", setpos: ""},
    {id: 35, type: "flash", icon: EyeOff, color: "#a16207", x: "65%", y: "55%", team: "t", title: "Флешка лонг", description: "ЛКМ + прыжок", videoUrl: "https://www.youtube.com/embed/LrE1suuoBIY", setpos: ""},
    {id: 36, type: "flash", icon: EyeOff, color: "#a16207", x: "80%", y: "45%", team: "ct", title: "Флешка лонг кт", positions: [
        {
          x: "80.5%", y: "25%",
          videoUrl: "https://www.youtube.com/embed/u50ypLFqT0U",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "80.5%", y: "40%",
          videoUrl: "https://www.youtube.com/embed/2KoCFuUj_m8",
          description: "ЛКМ + бег",
          setpos: ""
        }]},
    {id: 37, type: "flash", icon: EyeOff, color: "#a16207", x: "67.5%", y: "55.5%", team: "t", title: "Флешка лонг из бокса", positions: [
        {
          x: "69%", y: "76%",
          videoUrl: "https://www.youtube.com/embed/t06GuNhbzqU",
          description: "ЛКМ + ctrl",
          setpos: ""
        },
        {
          x: "69%", y: "58.5%",
          videoUrl: "https://www.youtube.com/embed/_qWruHOZrUw",
          description: "ЛКМ",
          setpos: ""
        }]},
// -----------------------------
// Smokes
// -----------------------------
{ id: 5713, type: "smoke", icon: Circle, color: "#4b5563", x: "63%", y: "26%", team: "t", videoUrl: "https://www.youtube.com/embed/TUMH-xWJh60", title: "Дым шорт", description: "ЛКМ + присяд", setpos: "" },
          { id: 1573, type: "smoke", icon: Circle, color: "#4b5563", x: "25%", y: "16%", team: "ct", videoUrl: "https://www.youtube.com/embed/QCCsrIqPrOE", title: "Дым окно", description: "ЛКМ", setpos: "" },
          { id: 2213, type: "smoke", icon: Circle, color: "#4b5563", x: "18.5%", y: "27%", team: "t", videoUrl: "https://www.youtube.com/embed/", title: "Дым на выход Б(фишечный)", description: "ЛКМ", setpos: "" },
          { id: 1713, type: "smoke", icon: Circle, color: "#4b5563", x: "20%", y: "34%", team: "t", videoUrl: "https://www.youtube.com/embed/VvZlQT4gUtg", title: "Дым на машину Б плент", description: "ЛКМ", setpos: "" },
          { id: 1822, type: "smoke", icon: Circle, color: "#4b5563", x: "83%", y: "35%", team: "ct", title: "Дым лонг", positions:[
            {
          x: "73.5%", y: "19.5%",
          videoUrl: "https://www.youtube.com/embed/TVWhQM3vCyg",
          description: "ЛКМ",
          setpos: ""
        },{
          x: "62%", y: "14%",
          videoUrl: "https://www.youtube.com/embed/WxqBo5rsWHs",
          description: "ЛКМ + прыжок",
          setpos: ""
        },]},
          { id: 1832, type: "smoke", icon: Circle, color: "#4b5563", x: "67%", y: "20%", team: "t", title: "Дым джампер", positions:[
            {
          x: "64%", y: "28%",
          videoUrl: "https://www.youtube.com/embed/50Wfex-7duk",
          description: "ЛКМ + ПКМ",
          setpos: ""
        },{
          x: "64%", y: "33.5%",
          videoUrl: "https://www.youtube.com/embed/fPUTRBBbZk4",
          description: "ЛКМ + ПКМ",
          setpos: ""
        },{
          x: "59%", y: "38%",
          videoUrl: "https://www.youtube.com/embed/5jOkIw53OuU",
          description: "ЛКМ",
          setpos: ""
        },]},
          { id: 1583, type: "smoke", icon: Circle, color: "#4b5563", x: "13%", y: "36%", team: "ct", title: "Дым тёмка", positions:[
            {
          x: "23%", y: "10%",
          videoUrl: "https://www.youtube.com/embed/CuMsGcqazpY",
          description: "ЛКМ",
          setpos: "setpos -1558.774048 2804.881348 72.334518;setang -18.480026 -114.052963 0.000000"
        },{
          x: "35.5%", y: "15%",
          videoUrl: "https://www.youtube.com/embed/vEXRozxoHUc",
          description: "ЛКМ",
          setpos: "setpos -985.817200 2553.222900 56.676186;setang -25.546505 -141.877960 0.000000"
        },]},
          { id: 1883, type: "smoke", icon: Circle, color: "#4b5563", x: "28%", y: "13%", team: "t", title: "Дым окно", positions:[
            {
          x: "11%", y: "43.5%",
          videoUrl: "https://www.youtube.com/embed/riMailjSG_0",
          description: "ЛКМ + прыжок",
          setpos: ""
        },{
          x: "27.5%", y: "62%",
          videoUrl: "https://www.youtube.com/embed/Ow7i1ktmZwU",
          description: "ЛКМ + прыжок",
          setpos: ""
        },]},
          { id: 1993, type: "smoke", icon: Circle, color: "#4b5563", x: "28%", y: "22%", team: "t", title: "Дым двери Б", positions:[
        {
          x: "12%", y: "48%",
          videoUrl: "https://www.youtube.com/embed/9P1SeLRI_L0",
          description: "ЛКМ + контрл",
          setpos: ""
        },{
          x: "19%", y: "50%",
          videoUrl: "https://www.youtube.com/embed/hm8WCG6oxz0",
          description: "ЛКМ",
          setpos: ""
        },{
          x: "27.5%", y: "62%",
          videoUrl: "https://www.youtube.com/embed/h82wHHw_L0M",
          description: "ЛКМ + прыжок",
          setpos: ""
        },{
          x: "34%", y: "86%",
          videoUrl: "https://www.youtube.com/embed/mX-K7ionn54",
          description: "ЛКМ + бег + прыжок",
          setpos: ""
        },]},
          { id: 1853, type: "smoke", icon: Circle, color: "#4b5563", x: "45%", y: "35%", team: "t", title: "Дым двери мид", positions:[
          {
          x: "47%", y: "34%",
          videoUrl: "https://www.youtube.com/embed/JuJR-68TonY",
          description: "обе кнопки мыши",
          setpos: ""
        },
        {
          x: "43%", y: "39.5%",
          videoUrl: "https://www.youtube.com/embed/FkCD06KUkK8",
          description: "обе кнопки мыши",
          setpos: ""
        },
        {
          x: "65%", y: "80%",
          videoUrl: "https://www.youtube.com/embed/oI8m5oR5_60",
          description: "ЛКМ + прыжок",
          setpos: "setpos 572.033569 -395.968750 8.030186 ; setang -17.809896 116.886398 0.000000"
        },
        {
          x: "61%", y: "84%",
          videoUrl: "https://www.youtube.com/embed/TJOD0VL6-80",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "45.1%", y: "78%",
          videoUrl: "https://www.youtube.com/embed/n04XJwrdHVk",
          description: "ЛКМ",
          setpos: ""
        },
        {
          x: "46%", y: "87%",
          videoUrl: "https://www.youtube.com/embed/UM6xtLUEZSI",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "48%", y: "89%",
          videoUrl: "https://www.youtube.com/embed/DeGsElg2RFQ",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "46.5%", y: "91%",
          videoUrl: "https://www.youtube.com/embed/kCS5isoQ-Nc",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "44%", y: "91%",
          videoUrl: "https://www.youtube.com/embed/j0d0iIyiISo",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "45%", y: "93.5%",
          videoUrl: "https://www.youtube.com/embed/-9-Yocm6n8E",
          description: "ЛКМ, присяд + прыжок",
          setpos: ""
        },]},
          { id: 1004, type: "smoke", icon: Circle, color: "#4b5563", x: "52%", y: "24%", team: "t", title: "Дым 'mid to B'", positions:[
          {
          x: "48%", y: "41.5%",
          videoUrl: "https://www.youtube.com/embed/MlIh2fmGfBY",
          description: "ЛКМ + контрл + прыжок",
          setpos: ""
        },
        {
          x: "51%", y: "46%",
          videoUrl: "https://www.youtube.com/embed/TfjfZUn2zj8",
          description: "ЛКМ + прыжок",
          setpos: ""
        },]},
          { id: 7653, type: "smoke", icon: Circle, color: "#4b5563", x: "67%", y: "23%", team: "t", videoUrl: "https://www.youtube.com/embed/xjh_cGsz_J0", title: "Дым КТ", description: "ЛКМ", setpos: "" },
          { id: 1234, type: "smoke", icon: Circle, color: "#4b5563", x: "79%", y: "46%", team: "t", title: "Дым старт", positions:[
          {
          x: "44%", y: "85%",
          videoUrl: "https://www.youtube.com/embed/xdSjaEPz_Ek",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "50%", y: "87%",
          videoUrl: "https://www.youtube.com/embed/UnZ_9zi4CGA",
          description: "ЛКМ + прыжок",
          setpos: ""
        },]},
          { id: 1212, type: "smoke", icon: Circle, color: "#4b5563", x: "77%", y: "23.5%", team: "t", title: "Дым КТ", positions:[
          {
          x: "89%", y: "56%",
          videoUrl: "https://www.youtube.com/embed/1Sd4SuhMvRE",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
      {
          x: "69%", y: "80%",
          videoUrl: "https://www.youtube.com/embed/xRCnt-svHHI",
          description: "ЛКМ, прыжок + присяд",
          setpos: ""
        },
       {
          x: "65.5%", y: "64%",
          videoUrl: "https://www.youtube.com/embed/NMCsElN2Jjg",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
        {
          x: "75%", y: "50%",
          videoUrl: "https://www.youtube.com/embed/M79zr7fR_1Y",
          description: "ЛКМ + бег",
          setpos: ""
        },
        {
          x: "72%", y: "45%",
          videoUrl: "https://www.youtube.com/embed/gm2ZygFJlLY",
          description: "обе кнопки мыши + прыжок",
          setpos: ""
        },]},
          { id: 1253, type: "smoke", icon: Circle, color: "#4b5563", x: "66.5%", y: "55%", team: "ct", title: "Дым бокс", positions:[
        {
          x: "69%", y: "19%",
          videoUrl: "https://www.youtube.com/embed/VZHuEj0vYrs",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
       {
          x: "73%", y: "19%",
          videoUrl: "https://www.youtube.com/embed/8lbH8NbQcHE",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
       {
          x: "60%", y: "25%",
          videoUrl: "https://www.youtube.com/embed/bvW_auS6l2k",
          description: "ЛКМ + прыжок",
          setpos: ""
        },
       {
          x: "58%", y: "20%",
          videoUrl: "https://www.youtube.com/embed/NhukCiVRd6c",
          description: "ЛКМ, прыжок + бег",
          setpos: ""
        },]},
  ],
  inferno: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "40%", y: "45%", team: "t", videoUrl: "", title: "Дым на арки", description: "Блок арок", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "62%", y: "58%", team: "ct", videoUrl: "", title: "Молотов банан", description: "Задержка банана", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "45%", y: "50%", team: "t", videoUrl: "", title: "Флешка мид", description: "Флешка на мид", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "68%", y: "40%", team: "ct", videoUrl: "", title: "HE библиотека", description: "Урон в библиотеке", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
  overpass: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "38%", y: "52%", team: "t", videoUrl: "", title: "Дым на A", description: "Дым точки A", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "48%", y: "63%", team: "ct", videoUrl: "", title: "Молотов тоннели", description: "Задержка тоннелей", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "60%", y: "50%", team: "t", videoUrl: "", title: "Флешка B", description: "Флешка на B", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "35%", y: "60%", team: "ct", videoUrl: "", title: "HE парк", description: "Урон в парке", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
  anubis: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "55%", y: "55%", team: "t", videoUrl: "", title: "Дым мид", description: "Блок мида", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "60%", y: "45%", team: "ct", videoUrl: "", title: "Молотов A", description: "Задержка A", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "30%", y: "60%", team: "t", videoUrl: "", title: "Флешка B", description: "Вход на B", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "50%", y: "40%", team: "ct", videoUrl: "", title: "HE коннектор", description: "Урон на коннекторе", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
  vertigo: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "42%", y: "45%", team: "t", videoUrl: "", title: "Дым A", description: "Дым на A", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "57%", y: "60%", team: "ct", videoUrl: "", title: "Молотов рампа", description: "Задержка рампы", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "60%", y: "52%", team: "t", videoUrl: "", title: "Флешка B", description: "Флешка на B", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "35%", y: "58%", team: "ct", videoUrl: "", title: "HE мид", description: "Урон на мид", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
  nuke: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "45%", y: "50%", team: "t", videoUrl: "", title: "Дым outside", description: "Блок outside", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "55%", y: "55%", team: "ct", videoUrl: "", title: "Молотов рампа", description: "Задержка рампы", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "60%", y: "45%", team: "t", videoUrl: "", title: "Флешка A", description: "Флешка на A", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "40%", y: "60%", team: "ct", videoUrl: "", title: "HE секрет", description: "Урон в секрете", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
  train: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "50%", y: "45%", team: "t", videoUrl: "", title: "Дым A", description: "Дым на A", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "65%", y: "55%", team: "ct", videoUrl: "", title: "Молотов поп", description: "Задержка попа", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "35%", y: "50%", team: "t", videoUrl: "", title: "Флешка B", description: "Флешка на B", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "45%", y: "60%", team: "ct", videoUrl: "", title: "HE ivy", description: "Урон в ivy", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
  ancient: [
    { id: 1, type: "smoke", icon: Circle, color: "#4b5563", x: "42%", y: "40%", team: "t", videoUrl: "", title: "Дым мид", description: "Блок мида", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 2, type: "molotov", icon: Flame, color: "#991b1b", x: "55%", y: "58%", team: "ct", videoUrl: "", title: "Молотов A", description: "Задержка A", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 3, type: "flash", icon: EyeOff, color: "#a16207", x: "50%", y: "50%", team: "t", videoUrl: "", title: "Флешка B", description: "Флешка на B", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
    { id: 4, type: "he", icon: Bomb, color: "#365314", x: "65%", y: "45%", team: "ct", videoUrl: "", title: "HE cave", description: "Урон в cave", setpos: "setpos -123.45 678.90 -12.34; setang 0 90 0" },
  ],
};

// -----------------------------
// Компонент
// -----------------------------
export default function MapPage() {
  const params = useParams();
  const mapSlug = params.map as string;
  const currentMap = mapData[mapSlug] || mapData["mirage"];

  const [isDark, setIsDark] = useState<boolean>(() => localStorage.getItem("Theme") !== "light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<string>("smoke");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedNade, setSelectedNade] = useState<Nade | null>(null);
  const [activeNade, setActiveNade] = useState<Nade | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    setFilter("smoke");
    setSelectedTeam("all");
    setActiveNade(null);
    setSelectedNade(null);
    setSelectedPosition(null);
  }, [mapSlug]);

  const nades = nadesByMap[mapSlug] || [];
  const filteredNades = nades.filter((nade) => {
    const typeMatch = filter === "all" || nade.type === filter;
    const teamMatch = selectedTeam === "all" ||
                    nade.team === selectedTeam ||
                    nade.team === "any";
    return typeMatch && teamMatch;
  });

  const toggleFilter = (type: string) => setFilter((prev) => (prev === type ? "all" : type));

  const handleCopySetpos = async () => {
    const setposText = selectedPosition?.setpos || selectedNade?.setpos || "";
    if (setposText) {
      await navigator.clipboard.writeText(setposText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`h-screen overflow-hidden ${isDark ? "bg-[#141414] text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 h-16 flex items-center z-50 ${isDark ? "bg-[#1a1a1a]" : "bg-white border-b border-gray-200"}`}>
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className={`p-2 rounded-md ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Bomb className="w-5 h-5" />}
            </button>
            <Link href="/" className="text-2xl font-bold">
              <span className="text-[#d4a257]">RASKIDKA</span>.ru
            </Link>
          </div>
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className={`p-3 rounded-md ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
      </header>

      <div className="flex pt-16 h-[calc(100vh-4rem)] relative overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`fixed top-16 left-0 bottom-0 w-80 overflow-y-auto transition-transform duration-300 z-50 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${isDark ? "bg-[#1a1a1a]" : "bg-white border-r border-gray-200"}`}
        >
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{currentMap.name}</h1>

            <a
              href="https://forms.gle/o9fxngLAGBTvnHUu6"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors mb-6 ${
                isDark ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Предложить своё</span>
            </a>

            <h2 className="text-lg font-semibold mb-3">Гранаты</h2>
            <div className="space-y-2 mb-6">
              <NadeButton icon={Circle} label="Дым" active={filter === "smoke"} color="#4b5563" onClick={() => toggleFilter("smoke")} isDark={isDark} />
              <NadeButton icon={Flame} label="Молотов" active={filter === "molotov"} color="#991b1b" onClick={() => toggleFilter("molotov")} isDark={isDark} />
              <NadeButton icon={EyeOff} label="Флешка" active={filter === "flash"} color="#a16207" onClick={() => toggleFilter("flash")} isDark={isDark} />
              <NadeButton icon={Bomb} label="Осколочная" active={filter === "he"} color="#365314" onClick={() => toggleFilter("he")} isDark={isDark} />
            </div>

            <h2 className="text-lg font-semibold mb-3">Команды</h2>
            <div className="flex gap-2 mb-6">
              <TeamButton label="КТ" active={selectedTeam === "ct"} onClick={() => setSelectedTeam((p) => (p === "ct" ? "all" : "ct"))} isDark={isDark} />
              <TeamButton label="Т" active={selectedTeam === "t"} onClick={() => setSelectedTeam((p) => (p === "t" ? "all" : "t"))} isDark={isDark} />
            </div>

            <h2 className="text-lg font-semibold mb-3">Карты</h2>
            <div>
              {Object.entries(mapData).map(([slug, map]) => (
                <MapListItem
                  key={slug}
                  map={{ slug, name: map.name, icon: map.icon, inDevelopment: mapsInDevelopment.includes(slug) }}
                  active={slug === mapSlug}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main
          className={`flex-1 flex items-center justify-center p-2 relative transition-all duration-300 ${
            sidebarOpen ? "md:ml-80" : ""
          }`}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 7rem)"
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="relative"
                style={{
                  width: "min(100vw - 1rem, 100vh - 5rem)",
                  height: "min(100vw - 1rem, 100vh - 5rem)",
                  maxWidth: "100%",
                  maxHeight: "100%"
                }}
              >
                {/* Радар */}
                <img
                  src={currentMap.radar}
                  alt="Radar"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none rounded-xl shadow-lg"
                />

                {/* SVG для траекторий */}
                {activeNade?.positions && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
                    <defs>
                      <filter id="trajectory-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                        <feOffset dx="0" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.5"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Отдельная линия от каждой позиции к месту приземления гранаты */}
                    {activeNade.positions.map((position, index) => (
                      <line
                        key={index}
                        x1={position.x}
                        y1={position.y}
                        x2={activeNade.x}
                        y2={activeNade.y}
                        stroke="#d4a257"
                        strokeWidth="3"
                        strokeDasharray="8,6"
                        filter="url(#trajectory-shadow)"
                      />
                    ))}
                  </svg>
                )}

                {/* Точки позиций */}
                {activeNade?.positions?.map((position, index) => (
                  <button
                    key={`pos-${index}`}
                    onClick={() => {
                      setSelectedPosition(position);
                      setSelectedNade(activeNade);
                    }}
                    style={{
                      left: position.x,
                      top: position.y,
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-[6] pointer-events-auto transition-transform hover:scale-125"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#d4a257] flex items-center justify-center shadow-lg border-3 border-white">

                    </div>
                  </button>
                ))}

                {/* Кнопки гранат */}
                {filteredNades.map((n) => {
                  const Icon = n.icon;
                  const isActive = activeNade?.id === n.id;
                  const shouldHide = activeNade && !isActive;

                  // Скрываем неактивные гранаты, если есть активная
                  if (shouldHide) return null;

                  return (
                    <button
                      key={n.id}
                      onClick={() => {
                        if (n.positions && n.positions.length > 0) {
                          // Если есть позиции - показываем/скрываем траектории
                          setActiveNade(isActive ? null : n);
                        } else {
                          // Если нет позиций - открываем модалку сразу
                          setSelectedNade(n);
                          setSelectedPosition(null);
                        }
                      }}
                      style={{
                        left: n.x,
                        top: n.y,
                      }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all pointer-events-auto ${
                        isActive ? "scale-125" : "hover:scale-110"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:shadow-lg ${
                          isActive ? "ring-4 ring-[#d4a257] ring-opacity-50" : ""
                        }`}
                        style={{ backgroundColor: n.color }}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* МОДАЛЬНОЕ ОКНО С ВИДЕО */}
      {selectedNade && (
        <div
          className={`fixed top-16 right-0 bottom-0 flex items-center justify-center z-[100] ${
            sidebarOpen ? "left-80" : "left-0"
          } ${isDark ? "bg-black/80" : "bg-gray-900/30"} transition-all duration-300`}
          onClick={() => {
            setSelectedNade(null);
            setSelectedPosition(null);
            setCopied(false);
          }}
        >
          <div
            className={`relative w-[90%] max-w-5xl rounded-xl overflow-hidden shadow-2xl ${
              isDark ? "bg-[#1a1a1a]" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setSelectedNade(null);
                setSelectedPosition(null);
                setCopied(false);
              }}
              className={`absolute top-4 right-4 z-10 p-2 rounded-lg ${
                isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Название */}
            <div className="p-6 pb-4">
              <h3 className="text-2xl font-bold mb-2">{selectedNade.title}</h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {selectedPosition ? selectedPosition.description : selectedNade.description}
              </p>
            </div>

            {/* Видео */}
            <div className="px-6 pb-4">
              <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                {(selectedPosition?.videoUrl || selectedNade.videoUrl) ? (
                  <iframe
                    src={selectedPosition?.videoUrl || selectedNade.videoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <p>Видео не добавлено</p>
                  </div>
                )}
              </div>
            </div>

            {/* Информация и кнопка setpos */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: selectedNade.color }}
                    >
                      {(() => {
                        const Icon = selectedNade.icon;
                        return <Icon className="w-5 h-5 text-white" />;
                      })()}
                    </div>
                    <span className="font-semibold">
                      {selectedNade.type === "smoke"
                        ? "Дым"
                        : selectedNade.type === "molotov"
                          ? "Молотов"
                          : selectedNade.type === "flash"
                            ? "Флешка"
                            : "Осколочная"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        selectedNade.team === "any"
                          ? ""
                          : selectedNade.team === "t"
                          ? "bg-yellow-600"
                          : "bg-blue-600"
                      }`}
                      style={
                        selectedNade.team === "any"
                          ? { background: "linear-gradient(135deg, #ca8a04 0%, #ca8a04 50%, #2563eb 50%, #2563eb 100%)" }
                          : {}
                      }
                    >
                      {selectedNade.team === "t" ? "T" : selectedNade.team === "ct" ? "CT" : "Любая"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Кнопка setpos */}
              {(selectedPosition?.setpos || selectedNade.setpos) && (
                <button
                  onClick={handleCopySetpos}
                  className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    copied
                      ? isDark
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                      : isDark
                        ? "bg-[#d4a257] hover:bg-[#c89247] text-black"
                        : "bg-[#d4a257] hover:bg-[#c89247] text-black"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Скопировано!</span>
                    </>
                  ) : (
                    <span>setpos</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------
// Компоненты
// -----------------------------
interface NadeButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
  isDark: boolean;
}

function NadeButton({ icon: Icon, label, active, color, onClick, isDark }: NadeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg ${
        active
          ? "bg-[#d4a257] text-black font-semibold"
          : isDark
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </button>
  );
}

interface TeamButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  isDark: boolean;
}

function TeamButton({ label, active, onClick, isDark }: TeamButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
        active
          ? "bg-[#d4a257] text-black"
          : isDark
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-200 text-gray-900 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

interface MapListItemProps {
  map: {
    slug: string;
    name: string;
    icon: string;
    inDevelopment?: boolean;
  };
  active: boolean;
  isDark: boolean;
}

function MapListItem({ map, active, isDark }: MapListItemProps) {
  return (
    <Link
      href={`/${map.slug}`}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-1 ${
        active
          ? isDark
            ? "bg-gray-700 text-white"
            : "bg-gray-300 text-gray-900"
          : isDark
            ? "hover:bg-gray-800 text-white"
            : "hover:bg-gray-200 text-gray-900"
      } transition-colors ${map.inDevelopment ? 'relative' : ''}`}
    >
      <img src={map.icon} alt={map.name} className="w-6 h-6 rounded object-cover" />
      <span className="text-sm">{map.name}</span>
      {map.inDevelopment && (
        <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded whitespace-nowrap" style={{ background: 'repeating-linear-gradient(45deg, #000, #000 3px, #d4a257 3px, #d4a257 6px)', color: 'white' }}>
          В разработке
        </span>
      )}
    </Link>
  );
}
