import { motion } from "framer-motion";

export default function SectionHeader({ index, label, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14"
    >
      <p className="font-mono text-xs text-acid tracking-[0.25em] uppercase mb-4">
        {index} / {label}
      </p>
      <h2 className="font-display font-bold tracking-tight text-[clamp(2.25rem,5vw,3.75rem)] leading-tight">
        {title}{" "}
        {accent && (
          <em className="font-serif italic font-normal text-acid">{accent}</em>
        )}
      </h2>
    </motion.div>
  );
}
