"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 25, suffix: "+", label: "Years in the transport industry" },
  { value: 450, suffix: "+", label: "Tons of break-bulk moved weekly" },
  { value: 4, label: "Branches — Cape Town, PE, JHB, Durban" },
  { value: 2016, label: "SQAS approved supplier since" },
];

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <b ref={ref}>
      {stat.prefix}
      {display.toLocaleString("en-ZA")}
      {stat.suffix}
    </b>
  );
}

export function Stats() {
  return (
    <section className="stats" aria-label="Company stats">
      <div className="wrap">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <Counter stat={stat} />
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
