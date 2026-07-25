"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

export default function HeroSection() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="aurora-blob left-[-10%] top-[-20%] h-[420px] w-[420px]" />
      <div className="aurora-blob right-[-15%] top-[10%] h-[360px] w-[360px]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
        >
          A NexAuras product
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
        >
          One app store.
          <br />
          <span className="aurora-text">Every device, eventually.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-base text-text-muted sm:text-lg"
        >
          NexApp is where you discover and download apps today on the web —
          with native Android and desktop apps arriving next.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/shop"
            className="rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            Shop apps
          </Link>
          {user ? (
            <Link
              href="/downloads"
              className="glass-card aurora-border rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
            >
              My Downloads
            </Link>
          ) : (
            <Link
              href="/signup"
              className="glass-card aurora-border rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03]"
            >
              Create an account
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
