import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { posts } from "../data";
import SectionHeader from "./SectionHeader";

function PostRow({ post, index }) {
  const { href, title, date, readTime, tag, content } = post;
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group block py-7 border-t border-line last:border-b hover:bg-surface/60 transition-colors px-4 -mx-4 rounded-lg"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 font-mono text-xs">
        <span className="text-acid">{date}</span>
        <span className="text-fog">{readTime} read</span>
        <span className="text-fog border border-line rounded-full px-3 py-0.5 uppercase tracking-widest">
          {tag}
        </span>
      </div>
      <div className="flex items-start justify-between gap-6">
        <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight max-w-3xl group-hover:text-acid transition-colors">
          {title}
        </h3>
        <ArrowUpRight
          size={22}
          className="shrink-0 mt-1 text-fog group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
        />
      </div>
      <p className="text-fog mt-3 max-w-3xl leading-relaxed line-clamp-2">
        {content}
      </p>
    </motion.a>
  );
}

export default function Journal() {
  return (
    <section id="journal" className="max-w-6xl mx-auto px-6 py-28 scroll-mt-16">
      <SectionHeader index="03" label="Journal" title="Notes from the" accent="AI era" />
      <div>
        {posts.map((post, i) => (
          <PostRow key={post.title} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
