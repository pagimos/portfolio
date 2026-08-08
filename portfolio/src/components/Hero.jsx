import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

// three + drei are ~240kb gzipped, keep them out of the first paint.
const AsciiObject = lazy(() => import("./AsciiObject"));

/** Static glyph field shown until WebGL is up, so the frame never flashes empty. */
function AsciiFallback() {
  const rows = [
    "        .:-=+**+=-:.        ",
    "     .-+*#%@@@@@%#*+-.      ",
    "   .=*%@@@#*+==+*#@@@%*=.   ",
    "  -#@@@*-.        .-*@@@#-  ",
    " +@@@*.              .*@@@+ ",
    "  -#@@@*-.        .-*@@@#-  ",
    "   .=*%@@@#*+==+*#@@@%*=.   ",
    "     .-+*#%@@@@@%#*+-.      ",
    "        .:-=+**+=-:.        ",
  ];
  return (
    <pre className="flex h-full items-center justify-center overflow-hidden font-mono text-[10px] leading-[1.15] text-acid/35">
      {rows.join("\n")}
    </pre>
  );
}

export default function Hero({ pointer }) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [mount3d, setMount3d] = useState(false);

  useEffect(() => {
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMount3d(true), { timeout: 1200 })
      : setTimeout(() => setMount3d(true), 400);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center pb-16 pt-28 lg:pt-24"
    >
      <div className="grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        {/* ------------------------------------------------ copy */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] text-dim"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            Available for new work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[15ch] font-sans text-[clamp(2.5rem,7vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-fg"
          >
            I build software that businesses{" "}
            <span className="text-acid">run on</span>
            <span className="text-orange">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <p className="mt-7 max-w-[54ch] font-sans text-[17px] leading-relaxed text-dim">
              Full stack developer. Websites, web apps, and mobile products,
              designed and built end to end by one person who stays on it until
              it&apos;s live and working.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-md bg-acid px-6 py-3.5 font-sans text-[15px] font-medium text-editor transition-colors hover:bg-acid/85"
              >
                See my work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md border border-line bg-panel px-6 py-3.5 font-sans text-[15px] font-medium text-fg transition-colors hover:border-line2"
              >
                Start a project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------ ascii render */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="lg:col-span-5"
        >
          <div className="rounded-lg border border-line bg-panel/60">
            <div
              ref={stageRef}
              aria-hidden
              className="h-[280px] sm:h-[340px] lg:h-[400px]"
            >
              <Suspense fallback={<AsciiFallback />}>
                {mount3d ? (
                  <AsciiObject
                    pointer={pointer}
                    active={inView}
                    animate={!reduceMotion}
                  />
                ) : (
                  <AsciiFallback />
                )}
              </Suspense>
            </div>

            <p className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-comment">
              <span className="text-acid">{"//"}</span> 3D, drawn with text
              characters. Move your cursor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
