import { marqueeItems } from "../data";

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="border-y border-line py-5 overflow-hidden marquee-mask" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm text-fog uppercase tracking-widest">
            {item}
            <span className="text-acid text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
