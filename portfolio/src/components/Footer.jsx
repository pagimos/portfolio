import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { socials } from "../data";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs text-acid tracking-[0.25em] uppercase mb-6">
            04 / Contact
          </p>
          <h2 className="font-display font-bold tracking-tight leading-[1.02] text-[clamp(2.5rem,7vw,5.5rem)] max-w-4xl">
            Let&apos;s build something{" "}
            <em className="font-serif italic font-normal text-acid">great</em>{" "}
            together.
          </h2>
          <p className="text-fog text-lg mt-6 max-w-md leading-relaxed">
            Have a project in mind, or just want to talk shop? My inbox is
            open on any of these.
          </p>
        </motion.div>

        {/* Social rows */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {socials.map(({ id, href, label, handle, icon: Icon }, i) => (
            <motion.a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex items-center justify-between py-5 border-t border-line hover:px-2 transition-all duration-300"
            >
              <span className="flex items-center gap-4">
                <Icon size={18} className="text-fog group-hover:text-acid transition-colors" />
                <span className="font-display font-medium text-lg group-hover:text-acid transition-colors">
                  {label}
                </span>
                <span className="font-mono text-xs text-fog hidden sm:inline">
                  {handle}
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="text-fog group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              />
            </motion.a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-8">
          <p className="font-mono text-xs text-fog">
            © {new Date().getFullYear()} Pagimos. All rights reserved.
          </p>
          <p className="font-mono text-xs text-fog">
            Built with React, Tailwind & too much coffee
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="p-3 rounded-full border border-line text-fog hover:text-ink hover:bg-acid hover:border-acid transition-colors"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>

      {/* Giant watermark */}
      <div aria-hidden className="select-none pointer-events-none overflow-hidden">
        <p className="text-outline font-display font-bold text-[clamp(5rem,18vw,16rem)] leading-none text-center tracking-tight translate-y-[22%]">
          PAGIMOS
        </p>
      </div>
    </footer>
  );
}
