import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { stackGroups, currently } from "../data";
import SectionHeader from "./SectionHeader";

const cardMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Stack() {
  return (
    <section id="stack" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-16">
      <SectionHeader index="02" label="Stack & about" title="What I" accent="work with" />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* About card */}
        <motion.div
          {...cardMotion(0)}
          className="md:col-span-4 bg-surface border border-line rounded-2xl p-8 flex flex-col sm:flex-row gap-7 items-start"
        >
          <img
            src="/avatar.jpeg"
            alt="Pagimos"
            loading="lazy"
            className="h-24 w-24 rounded-2xl object-cover border border-line shrink-0"
          />
          <div>
            <p className="font-mono text-xs text-acid tracking-widest uppercase mb-3">
              About
            </p>
            <p className="text-cream text-lg leading-relaxed">
              I&apos;m a developer who cares about the last 5%. The easing
              curve, the query plan, the empty state. I design and build web,
              mobile, and desktop products end to end, and I like shipping
              things that feel fast.
            </p>
          </div>
        </motion.div>

        {/* Currently exploring */}
        <motion.div
          {...cardMotion(0.08)}
          className="md:col-span-2 bg-acid text-ink rounded-2xl p-8"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
            <Sparkles size={14} /> Currently into
          </p>
          <div className="flex flex-wrap gap-2">
            {currently.map((item) => (
              <span
                key={item}
                className="font-mono text-xs border border-ink/25 rounded-full px-3 py-1.5 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Skill groups */}
        {stackGroups.map((group, i) => (
          <motion.div
            key={group.title}
            {...cardMotion(0.05 * (i + 1))}
            className="md:col-span-3 bg-surface border border-line rounded-2xl p-8 hover:border-acid/30 transition-colors"
          >
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="font-display font-bold text-xl">{group.title}</h3>
              <span className="font-mono text-xs text-fog">
                0{i + 1} / 04
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-cream/85 bg-ink border border-line rounded-full px-3 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
