import { motion } from "framer-motion";
import { Leaf, Sprout, Apple, Bug, Sun } from "lucide-react";

const icons = [
  { Icon: Leaf, x: "10%", y: "20%", delay: 0, size: 24 },
  { Icon: Sprout, x: "85%", y: "15%", delay: 0.5, size: 20 },
  { Icon: Apple, x: "75%", y: "70%", delay: 1, size: 18 },
  { Icon: Bug, x: "15%", y: "75%", delay: 1.5, size: 16 },
  { Icon: Sun, x: "90%", y: "45%", delay: 0.8, size: 22 },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {icons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/15"
          style={{ left: x, top: y }}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 + delay, delay, ease: "easeInOut" }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
}
