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
    href: "https://www.instagram.com/pagimos/",
    icon: Instagram,
    handle: "@pagimos",
  },
];

/** `note` renders as a small qualifier chip next to the project name. */
export const projects = [
  {
    slug: "redcore",
    name: "RedCore",
    host: "redcore.ac",
    href: "https://www.redcore.ac/",
    kind: "Security platform",
    year: "2026",
    accent: "#FF6B6B",
    summary:
      "A verification service for game server owners. It scans a player's PC and reports whether cheat software, wiped logs, or hidden second accounts turned up, so admins can decide who gets in with actual evidence.",
    stack: ["React", "Node", "Subscriptions"],
  },
  {
    slug: "stockivia",
    name: "Stockivia",
    host: "stockivia.com",
    href: "https://www.stockivia.com",
    kind: "Business software",
    year: "2025",
    accent: "#4ADE80",
    summary:
      "Stock and sales management for small businesses. Track what you have, invoice customers, and see what's actually selling, all from one dashboard instead of three spreadsheets.",
    stack: ["React", "Node", "PostgreSQL"],
  },
  {
    slug: "smia",
    name: "SMIA Ascenseurs",
    host: "smiaascenseurs.com",
    href: "https://www.smiaascenseurs.com/",
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
    host: "djawahirsoft.vercel.app",
    href: "https://djawahirsoft.vercel.app/",
    kind: "Product website",
    year: "2026",
    accent: "#FFA657",
    note: "Concept pitch",
    summary:
      "A concept site I designed and built on my own initiative, then showed to the owner. It presents their business management software: quotes, invoicing, stock and finances, in a way that explains the product in one scroll.",
    stack: ["React", "Tailwind", "Spec work"],
  },
  {
    slug: "estifham",
    name: "Estifham",
    host: "estifham.vercel.app",
    href: "https://estifham.vercel.app/",
    kind: "Web app",
    year: "2025",
    accent: "#BB9AF7",
    summary:
      "A trivia platform with over 200 questions across 20 categories. Built to feel instant on a phone, with rounds short enough to play while waiting for coffee.",
    stack: ["React", "Tailwind", "Vercel"],
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
