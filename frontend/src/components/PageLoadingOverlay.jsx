import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageLoader } from "../context/PageLoaderContext";

export default function PageLoadingOverlay() {
  const { loading } = usePageLoader();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
