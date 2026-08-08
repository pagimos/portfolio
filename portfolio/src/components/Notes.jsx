import { motion } from "framer-motion";
import { notes } from "../data";
import Section from "./Section";

export default function Notes() {
  return (
    <Section
      id="notes"
      index="03"
      label="Notes"
      title="Things I'm"
      accent="thinking about"
      aside="Short reads on building software, written for people who have to pay for it."
    >
      <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
        {notes.map(({ title, date, read, tag, body }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group flex flex-col bg-editor p-8 transition-colors duration-300 hover:bg-panel"
          >
            <p className="flex items-center gap-2.5 font-mono text-[11px] text-comment">
              <span className="text-acid">{tag}</span>
              <span className="text-line2">/</span>
              <span>{date}</span>
              <span className="text-line2">/</span>
              <span>{read}</span>
            </p>

            <h3 className="mt-5 font-sans text-[1.15rem] font-semibold leading-snug tracking-tight text-fg">
              {title}
            </h3>

            <p className="mt-3 flex-1 font-sans text-[14.5px] leading-relaxed text-dim">
              {body}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
