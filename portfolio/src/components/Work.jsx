import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import Section from "./Section";

/**
 * A preview card: live screenshot on top, then the read. The whole card is the
 * link, so the image, the title and the footer all lead to the same place.
 */
function Project({ project, index }) {
  const { name, host, href, image, kind, year, accent, note, summary, stack } = project;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      // --accent lets the per-project colour drive Tailwind hover states
      // without a style prop on every child that needs it
      style={{ "--accent": accent }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-panel/60 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-[var(--accent)]/45 hover:bg-panel"
    >
      {/* accent rail, draws across the top edge on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 z-20 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 ease-out group-hover:w-full"
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-abyss">
        <img
          src={image}
          alt={`${name} homepage`}
          loading="lazy"
          decoding="async"
          width="1200"
          height="750"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* badges carry their own scrim so they stay readable on light sites */}
        <span className="absolute right-3 top-3 rounded border border-line2/70 bg-abyss/80 px-2 py-0.5 font-mono text-[10px] tracking-wider text-fg backdrop-blur-sm">
          {year}
        </span>
        {note && (
          <span className="absolute left-3 top-3 rounded border border-orange/40 bg-abyss/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-orange backdrop-blur-sm">
            {note}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] text-comment">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans text-[1.25rem] font-semibold leading-tight tracking-tight text-fg transition-colors group-hover:text-[var(--accent)]">
            {name}
          </h3>
        </div>
        <p className="mt-1.5 pl-[1.9rem] font-mono text-[11px] text-comment">{kind}</p>

        <p className="mt-4 line-clamp-3 font-sans text-[14px] leading-relaxed text-dim">
          {summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded border border-line px-2 py-0.5 font-mono text-[10.5px] text-comment"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
        <span className="font-mono text-[11px] text-comment transition-colors group-hover:text-fg">
          {host}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors group-hover:text-[var(--accent)]">
          Live site
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </motion.a>
  );
}

export default function Work() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title="Things I've"
      accent="shipped"
      aside="Every one of these is live right now. Click through and use them."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Project key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
