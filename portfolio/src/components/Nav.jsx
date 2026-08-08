import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { nav } from "../data";

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-editor/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 text-[15px] font-medium">
          <span className="font-mono text-acid">&gt;_</span>
          <span className="text-fg">pagimos</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-sans text-[14px] text-dim transition-colors hover:text-fg"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-md border border-acid/35 bg-acid/10 px-4 py-2 font-sans text-[13px] font-medium text-acid transition-colors hover:bg-acid hover:text-editor"
        >
          Let&apos;s talk
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </nav>
    </header>
  );
}
