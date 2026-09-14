import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

export const nav = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "notes", label: "Notes" },
];

export const socials = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/pagimos",
    icon: Github,
    handle: "@pagimos",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pagimos/",
    icon: Linkedin,
    handle: "in/pagimos",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://twitter.com/pagimos",
    icon: Twitter,
    handle: "@pagimos",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/pagim0s/",
    icon: Instagram,
    handle: "@pagim0s",
  },
];

/**
 * `note` renders as a small qualifier chip next to the project name.
 * `image` is a live screenshot of the site, captured at 1200×750 into
 * public/projects/ — the card preview leads with it.
 */
export const projects = [
  {
    slug: "redcore",
    name: "RedCore",
    host: "redcore.ac",
    href: "https://www.redcore.ac/",
    image: "/projects/redcore.webp",
    kind: "Security platform",
    year: "2026",
    accent: "#FF6B6B",
    summary:
      "A verification service for game server owners. It scans a player's PC and reports whether cheat software, wiped logs, or hidden second accounts turned up, so admins can decide who gets in with actual evidence.",
    stack: ["React", "Node", "Subscriptions"],
  },
  {
    slug: "loupgarou",
    name: "The Village",
    host: "loupgarou.io",
    href: "https://loupgarou.io/",
    image: "/projects/loupgarou.webp",
    kind: "Multiplayer game",
    year: "2026",
    accent: "#818CF8",
    note: "In development",
    summary:
      "Werewolf played online with friends. Up to 16 players get one of 20 roles, then argue their way through night and day rounds around a 3D campfire. Create a room, share the code, and everyone is in without installing anything.",
    stack: ["React", "WebSockets", "Three.js"],
  },
  {
    slug: "smia",
    name: "SMIA Ascenseurs",
    host: "smiaascenseurs.vercel.app",
    href: "https://smiaascenseurs.vercel.app/",
    image: "/projects/smia.webp",
    kind: "Company website",
    year: "2026",
    accent: "#7AA2F7",
    summary:
      "A French language site for an elevator company in Oran. Installation, modernisation, repairs and maintenance contracts, organised so a building manager with a stuck lift finds the emergency line immediately.",
    stack: ["React", "SEO", "French"],
  },
  {
    slug: "djawahirsoft",
    name: "DjawahirSoft",
    host: "djawahirsoft-site.vercel.app",
    href: "https://djawahirsoft-site.vercel.app/",
    image: "/projects/djawahirsoft.webp",
    kind: "Product website",
    year: "2026",
    accent: "#FFA657",
    note: "Concept pitch",
    summary:
      "A concept site I designed and built on my own initiative, then showed to the owner. It presents their business management software: quotes, invoicing, stock and finances, in a way that explains the product in one scroll.",
    stack: ["React", "Tailwind", "Spec work"],
  },
  {
    slug: "packers-dz",
    name: "Packers DZ",
    host: "packers-dz.vercel.app",
    href: "https://packers-dz.vercel.app/",
    image: "/projects/packers-dz.webp",
    kind: "Logistics website",
    year: "2026",
    accent: "#F5A524",
    note: "Redesign concept",
    summary:
      "A redesign for an Algerian parcel carrier, written Arabic first with the whole layout mirrored for RTL and a full English translation behind one toggle. A 3D map of the 58 wilayas doubles as the input for a live shipping estimator, so picking a province on the map prices the delivery.",
    stack: ["Next.js", "Three.js", "Arabic RTL"],
  },
  {
    slug: "estifham",
    name: "Estifham",
    host: "estifham-app.vercel.app",
    href: "https://estifham-app.vercel.app/",
    image: "/projects/estifham.webp",
    kind: "Web app",
    year: "2024",
    accent: "#BB9AF7",
    summary:
      "A trivia platform with over 200 questions across 20 categories. Built to feel instant on a phone, with rounds short enough to play while waiting for coffee.",
    stack: ["React", "Tailwind", "Vercel"],
  },
  {
    slug: "stockivia",
    name: "Stockivia",
    host: "stockivia-app.vercel.app",
    href: "https://stockivia-app.vercel.app/",
    image: "/projects/stockivia.webp",
    kind: "Business software",
    year: "2023",
    accent: "#4ADE80",
    summary:
      "Stock and sales management for small businesses. Track what you have, invoice customers, and see what's actually selling, all from one dashboard instead of three spreadsheets.",
    stack: ["React", "Node", "PostgreSQL"],
  },
  {
    slug: "pagi-development",
    name: "Pagi Development",
    host: "pagi-developement.tebex.io",
    href: "https://pagi-developement.tebex.io/",
    image: "/projects/pagi-development.webp",
    kind: "Script store",
    year: "2026",
    accent: "#22D3EE",
    summary:
      "My own storefront for FiveM server scripts. Optimized resources for ESX, QBCore and ox_lib, sold with instant delivery, lifetime updates and support on Discord, running on over 500 servers.",
    stack: ["Tebex", "Lua", "FiveM"],
  },
];

export const services = [
  {
    id: "01",
    title: "Web apps & dashboards",
    body: "The software your business runs on. Accounts, payments, data, reporting, and an interface your team won't need training to use.",
  },
  {
    id: "02",
    title: "Websites that convert",
    body: "Fast, well-built sites that load instantly, show up on Google, and make a company look as serious as it actually is.",
  },
  {
    id: "03",
    title: "Mobile & desktop apps",
    body: "One product across phone, tablet and desktop, sharing a single codebase so features land everywhere instead of one platform at a time.",
  },
  {
    id: "04",
    title: "AI features",
    body: "Assistants, smart search, and automation added to products that shipped without them, wired in where they genuinely save time.",
  },
];

export const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node",
  "Python",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Supabase",
  "Docker",
  "AWS",
  "Vercel",
  "Tailwind",
  "Three.js",
];

export const notes = [
  {
    title: "AI agents are changing how software gets built",
    date: "Jun 2026",
    read: "6 min",
    tag: "AI",
    body: "Agents no longer just autocomplete code, they take whole tasks from start to finish. Here's how I restructured my process around them, and the parts that still need a human making the call.",
  },
  {
    title: "Why most dashboards go unused",
    date: "May 2026",
    read: "5 min",
    tag: "Product",
    body: "Teams ask for charts and then never open them. The dashboards that survive answer one question the person already had that morning, instead of showing everything the database knows.",
  },
  {
    title: "Fast websites are a business decision",
    date: "Feb 2026",
    read: "4 min",
    tag: "Performance",
    body: "Every extra second of load time costs you visitors before they see a single word. Speed isn't a technical nicety, it's the cheapest conversion work available.",
  },
];
