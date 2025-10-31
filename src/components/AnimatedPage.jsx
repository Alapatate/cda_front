import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ScrollArea className="h-screen w-screen px-4">
        <div className="z-10">{children}</div>
      </ScrollArea>
    </motion.div>
  );
};
