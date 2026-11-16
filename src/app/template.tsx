"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Page transition: content sharpens out of a blur. The filter is cleared afterwards so
 *  it never becomes a containing block for fixed-position modals inside the page. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0, transitionEnd: { filter: "none" } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
