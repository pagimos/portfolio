import { motion, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Journal from "./components/Journal";
import Footer from "./components/Footer";

function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="grain min-h-screen bg-ink text-cream">
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-acid origin-left z-50"
        style={{ scaleX: progress }}
      />

      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Stack />
        <Journal />
      </main>
      <Footer />
    </div>
  );
}

export default App;
