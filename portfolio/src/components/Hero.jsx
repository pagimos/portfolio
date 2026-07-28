import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { socials } from "../data";

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const SPOT = 600;

function Spotlight() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    // Skip entirely on touch / coarse pointers — nothing to follow there.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const half = SPOT / 2;
    let raf = 0;
    let running = false;
    // target vs. rendered position
    let tx = -SPOT;
    let ty = -SPOT;
    let cx = -SPOT;
    let cy = -SPOT;

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;

      const el = ref.current;
      if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;

      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false; // settled — stop burning frames until the next move
      }
    };

    const move = (e) => {
      tx = e.clientX - half;
      ty = e.clientY - half;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 h-[600px] w-[600px] rounded-full hidden md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(214,242,80,0.07) 0%, transparent 60%)",
        transform: `translate3d(${-SPOT}px, ${-SPOT}px, 0)`,
        willChange: "transform",
        contain: "strict",
      }}
    />
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <Spotlight />

      {/* Static ambient glows — pure gradients, no blur() filter (filters force
          an expensive re-composite every time the spotlight moves under them) */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #d6f250 0%, rgba(214,242,80,0.35) 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-[-15%] h-[520px] w-[520px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, #5e7cff 0%, rgba(94,124,255,0.35) 35%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-14">
        {/* Intro chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 border border-line rounded-full pl-1.5 pr-5 py-1.5 mb-7 bg-surface/60"
        >
          <img
            src="/avatar.jpeg"
            alt="Pagimos"
            width="36"
            height="36"
            className="h-9 w-9 rounded-full object-cover border border-line"
          />
          <span className="font-mono text-xs text-fog">
            Hi, I&apos;m <span className="text-cream">Pagimos</span> · Full Stack Developer
          </span>
        </motion.div>

        {/* Headline */}
        {/* Size tracks viewport HEIGHT as well as width, so the headline can
            never push the CTAs below the fold on a short screen. */}
        <h1 className="font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.75rem,min(8vw,11.5vh),7rem)]">
          <span className="block overflow-hidden pb-1">
            <motion.span custom={0} variants={lineVariants} initial="hidden" animate="visible" className="block">
              I turn ideas into
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span custom={1} variants={lineVariants} initial="hidden" animate="visible" className="block">
              <em className="font-serif italic font-normal text-acid">fast, </em>
              polished
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span custom={2} variants={lineVariants} initial="hidden" animate="visible" className="block">
              software<span className="text-acid">.</span>
            </motion.span>
          </span>
        </h1>

        {/* Sub + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="max-w-md text-fog text-lg leading-relaxed">
            Full stack developer shipping web, mobile, and desktop products end
            to end. Obsessed with the details that make software feel alive.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-acid text-ink font-medium rounded-full px-6 py-3 hover:bg-acid-bright transition-colors"
            >
              See my work
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border border-line text-cream font-medium rounded-full px-6 py-3 hover:border-acid hover:text-acid transition-colors"
            >
              Get in touch
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex items-center gap-2"
        >
          <span className="font-mono text-xs text-fog mr-2">Find me on</span>
          {socials.map(({ id, href, icon: Icon, label }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-full border border-line text-fog hover:text-ink hover:bg-acid hover:border-acid transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
