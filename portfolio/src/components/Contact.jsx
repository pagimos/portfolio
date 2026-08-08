import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { socials } from "../data";

export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line pt-20 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-comment">
          <span className="text-acid">04</span> / Contact
        </p>

        <h2 className="max-w-[18ch] font-sans text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-fg">
          Let&apos;s scope it and <span className="text-acid">ship it</span>
          <span className="text-orange">.</span>
        </h2>

        <p className="mt-6 max-w-[56ch] font-sans text-[17px] leading-relaxed text-dim">
          Tell me what you need and I&apos;ll tell you honestly what it takes:
          what&apos;s involved, how long it runs, and what it costs. If I&apos;m
          not the right fit, I&apos;ll say so.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
        {socials.map(({ id, label, href, handle, icon: Icon }, i) => (
          <motion.a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex items-center justify-between gap-4 border-t border-line py-5 transition-all duration-300 hover:pl-2"
          >
            <span className="flex items-center gap-4">
              <Icon
                size={17}
                className="text-comment transition-colors group-hover:text-acid"
              />
              <span className="font-sans text-[16px] font-medium text-fg transition-colors group-hover:text-acid">
                {label}
              </span>
              <span className="hidden font-mono text-[12px] text-comment sm:inline">
                {handle}
              </span>
            </span>
            <ArrowUpRight
              size={17}
              className="text-comment transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid"
            />
          </motion.a>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line py-8 sm:flex-row">
        <p className="font-mono text-[11px] text-comment">
          © {new Date().getFullYear()} Pagimos. All rights reserved.
        </p>
        <p className="font-mono text-[11px] text-comment">
          Built with React, Three.js &amp; Tailwind
        </p>
        <a
          href="#top"
          aria-label="Back to top"
          className="rounded-full border border-line p-2.5 text-comment transition-colors hover:border-acid hover:text-acid"
        >
          <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
