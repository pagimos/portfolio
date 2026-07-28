import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { socials } from "../data";

const WORD = "PAGIMOS";
const REST_TILT = 9; // degrees of rotateX the slab sits at when idle

function GlassWordmark() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let running = false;
    let listening = false;
    let havePointer = false;
    let mx = 0;
    let my = 0;
    // cached geometry — recomputed at most once per frame, and only after
    // a scroll/resize, so pointermove never forces a layout
    let rect = null;
    let rectDirty = true;
    let trx = REST_TILT;
    let try_ = 0;
    let crx = REST_TILT;
    let cry = 0;

    const clamp = (v, n) => (v < -n ? -n : v > n ? n : v);

    const tick = () => {
      if (havePointer) {
        if (rectDirty || !rect) {
          rect = wrap.getBoundingClientRect();
          rectDirty = false;
        }
        const px = clamp((mx - (rect.left + rect.width / 2)) / (rect.width / 2), 1);
        const py = clamp((my - (rect.top + rect.height / 2)) / (rect.height / 2), 1.4);
        trx = REST_TILT - py * 7;
        try_ = px * 5;
      }

      crx += (trx - crx) * 0.1;
      cry += (try_ - cry) * 0.1;

      const stage = stageRef.current;
      if (stage) {
        stage.style.transform = `rotateX(${crx.toFixed(2)}deg) rotateY(${cry.toFixed(2)}deg)`;
      }

      if (Math.abs(trx - crx) > 0.02 || Math.abs(try_ - cry) > 0.02) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      havePointer = true;
      start();
    };
    const onLeave = () => {
      havePointer = false;
      trx = REST_TILT;
      try_ = 0;
      start();
    };
    const invalidate = () => {
      rectDirty = true;
    };

    const listen = (on) => {
      if (on === listening) return;
      listening = on;
      const fn = on ? "addEventListener" : "removeEventListener";
      window[fn]("pointermove", onMove, { passive: true });
      window[fn]("scroll", invalidate, { passive: true });
      window[fn]("resize", invalidate);
      document[fn]("pointerleave", onLeave);
      if (on) rectDirty = true;
      else onLeave();
    };

    // Nothing is wired up until the wordmark is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => listen(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(wrap);

    return () => {
      io.disconnect();
      listen(false);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div aria-hidden className="select-none pointer-events-none overflow-hidden">
      <div ref={wrapRef} className="glass-word translate-y-[22%]">
        <div
          ref={stageRef}
          className="glass-word__stage font-display font-bold leading-none tracking-tight text-center text-[clamp(5rem,18vw,16rem)]"
        >
          {/* in flow — sets the box every other copy stacks into */}
          <span className="glass-word__layer glass-word__depth">{WORD}</span>
          <span className="glass-word__layer glass-word__over glass-word__face">{WORD}</span>
          <span className="glass-word__layer glass-word__over glass-word__rim">{WORD}</span>
          <span className="glass-word__layer glass-word__over glass-word__spec">{WORD}</span>
          <span className="glass-word__glow" />
        </div>
      </div>
    </div>
  );
}

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
      <GlassWordmark />
    </footer>
  );
}
