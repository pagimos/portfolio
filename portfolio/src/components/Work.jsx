import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import Section from "./Section";

function Project({ project, index }) {
  const { name, host, href, kind, year, accent, note, summary, stack } = project;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      // --accent lets the per-project colour drive Tailwind hover states
      // without a style prop on every child that needs it
      style={{ "--accent": accent }}
      className="group relative block border-t border-line py-8 transition-colors last:border-b hover:bg-panel/50"
    >
      {/* accent rail, draws across the top edge on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 ease-out group-hover:w-full"
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-4 px-1 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="mb-3 font-mono text-[11px] text-comment">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[1.6rem] font-semibold tracking-tight text-fg">
            {name}
            {note && (
              <span className="rounded border border-orange/40 px-2 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider text-orange">
                {note}
              </span>
            )}
          </h3>
          <p className="mt-2 font-mono text-[11px] text-comment">
            {kind} · {year}
          </p>
        </div>

        <div className="md:col-span-7">
          <p className="max-w-[62ch] font-sans text-[15px] leading-relaxed text-dim">
            {summary}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded border border-line px-2.5 py-1 font-mono text-[11px] text-comment"
              >
                {s}
              </span>
            ))}
            <span className="ml-1 font-mono text-[11px] text-comment transition-colors group-hover:text-acid">
              {host}
            </span>
          </div>
        </div>

        <div className="md:col-span-1 md:justify-self-end">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-dim transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
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
      <div>
        {projects.map((p, i) => (
          <Project key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
