import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data";
import SectionHeader from "./SectionHeader";

function ProjectRow({ project, index }) {
  const { href, imageSrc, title, kind, description, tags } = project;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[4rem_5rem_1fr_auto] items-center gap-5 md:gap-8 py-8 border-t border-line last:border-b hover:bg-surface/60 transition-colors px-4 -mx-4 rounded-lg"
    >
      <span className="font-mono text-sm text-fog group-hover:text-acid transition-colors">
        0{index + 1}
      </span>

      <span className="hidden md:flex h-16 w-16 items-center justify-center rounded-xl bg-surface border border-line overflow-hidden group-hover:border-acid/40 transition-colors">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display font-bold text-2xl md:text-3xl tracking-tight group-hover:text-acid transition-colors">
            {title}
          </span>
          <span className="font-mono text-xs text-fog uppercase tracking-widest">
            {kind}
          </span>
        </span>
        <span className="block text-fog mt-2 max-w-xl leading-relaxed">
          {description}
        </span>
        <span className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-fog border border-line rounded-full px-3 py-1 group-hover:border-acid/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </span>
      </span>

      <span className="justify-self-end text-fog group-hover:text-acid transition-colors">
        <ArrowUpRight
          size={26}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        />
      </span>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-16">
      <SectionHeader index="01" label="Selected work" title="Things I've" accent="shipped" />
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
