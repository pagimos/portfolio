import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#stack", label: "Stack", index: "02" },
  { href: "#journal", label: "Journal", index: "03" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-tight text-cream">
          pagimos<span className="text-acid">.</span>dev
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label, index }) => (
            <a
              key={href}
              href={href}
              className="group font-mono text-xs text-fog hover:text-cream transition-colors"
            >
              <span className="text-acid/60 group-hover:text-acid transition-colors">
                {index}
              </span>{" "}
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="flex items-center gap-2 font-mono text-xs border border-line rounded-full px-4 py-2 text-cream hover:border-acid hover:text-acid transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-acid" />
          </span>
          Open to work
        </a>
      </nav>
    </header>
  );
}
