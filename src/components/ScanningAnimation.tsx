import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Leaf } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";

const messageKeys = [
  "scanning.msg1", "scanning.msg2", "scanning.msg3", "scanning.msg4", "scanning.msg5",
  "scanning.msg6", "scanning.msg7", "scanning.msg8", "scanning.msg9", "scanning.msg10",
];

interface ScanningAnimationProps {
  imageUrl: string;
}

export function ScanningAnimation({ imageUrl }: ScanningAnimationProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messageKeys.length);
    }, 2200);
    const progInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 8 + 2, 92));
    }, 500);
    return () => { clearInterval(msgInterval); clearInterval(progInterval); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 p-6"
    >
      <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl">
        <img src={imageUrl} alt="Scanning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/10" />
        <motion.div
          className="absolute left-0 right-0 h-1 scan-line"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 border-2 border-primary/40 rounded-2xl" />
      </div>

      <div className="text-center space-y-3 w-full max-w-xs">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <Leaf className="h-4 w-4 animate-pulse-glow" />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-foreground"
          >
            {t(messageKeys[messageIndex])}
          </motion.p>
        </AnimatePresence>

        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground">{Math.round(progress)}% {t("scanning.complete")}</p>
      </div>
    </motion.div>
  );
}
