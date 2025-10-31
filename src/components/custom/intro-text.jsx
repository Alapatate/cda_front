import React from "react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export const IntroText = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="Le·la meilleur·e d’entre vous est"
          words={[
            "Touhami",
            "Cathy",
            "Christophe",
            "Ethan",
            "Ithan",
            "Theo",
            "Victor",
            "Victor",
            "Filip",
            "Hugo",
            "Kiéran",
            "Murciana",
            "Astghik",
            "Eren",
            "Arya",
          ]}
        />
      </motion.div>
    </div>
  );
};
