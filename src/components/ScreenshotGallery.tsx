"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ScreenshotGallery({
  screenshots,
  appName,
}: {
  screenshots: string[];
  appName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (screenshots.length === 0) return null;

  function close() {
    setOpenIndex(null);
  }
  function prev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
  }
  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
  }

  return (
    <>
      <div className="mt-12 flex gap-4 overflow-x-auto pb-2">
        {screenshots.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="aurora-border shrink-0 overflow-hidden rounded-xl bg-surface transition-transform hover:scale-[1.02]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${appName} screenshot ${i + 1}`}
              className="h-64 w-auto object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="glass-strong absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full"
            >
              <X size={18} />
            </button>

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous screenshot"
                  className="glass-strong absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full sm:left-8"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next screenshot"
                  className="glass-strong absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full sm:right-8"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <motion.img
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              src={screenshots[openIndex]}
              alt={`${appName} screenshot ${openIndex + 1}`}
              className="aurora-border max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}