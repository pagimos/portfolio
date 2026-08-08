import { motion } from "framer-motion";
import { services, stack } from "../data";
import Section from "./Section";

export default function Services() {
  return (
    <Section
      id="services"
      index="02"
      label="What I do"
      title="How I can"
      accent="help"
      aside="One person, start to finish. No handoffs between agencies, no waiting on someone else's schedule."
    >
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {services.map(({ id, title, body }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group bg-editor p-8 transition-colors duration-300 hover:bg-panel lg:p-10"
          >
            <p className="mb-5 font-mono text-[11px] text-comment transition-colors group-hover:text-acid">
              {id}
            </p>
            <h3 className="font-sans text-[1.35rem] font-semibold tracking-tight text-fg">
              {title}
            </h3>
            <p className="mt-3 max-w-[46ch] font-sans text-[15px] leading-relaxed text-dim">
              {body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* stack, as plain chips rather than import statements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center gap-2"
      >
        <span className="mr-2 font-mono text-[11px] tracking-[0.15em] text-comment">
          TOOLS
        </span>
        {stack.map((s) => (
          <span
            key={s}
            className="rounded border border-line px-3 py-1.5 font-mono text-[12px] text-dim transition-colors hover:border-line2 hover:text-fg"
          >
            {s}
          </span>
        ))}
      </motion.div>
    </Section>
  );
}
