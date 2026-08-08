import { motion, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Services from "./components/Services";
import Notes from "./components/Notes";
import Contact from "./components/Contact";
import usePointer from "./hooks/usePointer";

export default function App() {
  const pointer = usePointer();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div className="grid-bg min-h-screen bg-editor text-fg">
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-acid"
        style={{ scaleX: progress }}
      />

      <Nav />

      <div className="relative z-10 mx-auto max-w-page px-5 sm:px-8">
        <main>
          <Hero pointer={pointer} />
          <Work />
          <Services />
          <Notes />
        </main>
        <Contact />
      </div>
    </div>
  );
}
