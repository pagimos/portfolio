import { motion } from "framer-motion";

/**
 * Section header: a small mono index/label (the dev-flavoured accent) above a
 * plain, large sans heading. The mono is seasoning; the heading does the work.
 */
export default function Section({ id, index, label, title, accent, aside, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-comment">
            <span className="text-acid">{index}</span> / {label}
          </p>
          <h2 className="max-w-[16ch] font-sans text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-fg">
            {title} {accent && <span className="text-acid">{accent}</span>}
          </h2>
        </div>
        {aside && (
          <p className="max-w-sm font-sans text-[15px] leading-relaxed text-dim md:text-right">
            {aside}
          </p>
        )}
      </motion.div>

      {children}
    </section>
  );
}
