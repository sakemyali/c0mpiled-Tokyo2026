"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MessageSquareWarning,
  Brain,
  GitPullRequestArrow,
} from "lucide-react";
import logoImage from "@/image.png";
import screenImage from "@/screen.png";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <Image
            src={logoImage}
            alt="Maisen"
            className="h-6 w-7 rounded-sm object-contain"
          />
          <span className="text-lg font-semibold tracking-tight">Maisen</span>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          Open Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-20 pb-16 md:pt-32 md:pb-24 max-w-5xl mx-auto text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-medium text-neutral-300 mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          AI-powered feedback intelligence
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Turn scattered feedback into{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            actionable insights
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          Maisen clusters user feedback with AI, surfaces critical issues, and
          gives your team clear reproduction steps and fix suggestions — all in
          one dashboard.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 px-6 py-3 text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Screenshot */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fade}
          className="mt-16 rounded-xl border border-neutral-800 overflow-hidden shadow-2xl shadow-black/40"
        >
          <Image
            src={screenImage}
            alt="Maisen dashboard"
            className="w-full"
            priority
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquareWarning,
                title: "Collect feedback",
                description:
                  "Ingest user feedback from app stores, support tickets, surveys, Slack, and Intercom into a single pipeline.",
              },
              {
                icon: Brain,
                title: "AI clusters & summarizes",
                description:
                  "GPT-4 groups similar reports, identifies root causes, scores severity, and writes reproduction steps.",
              },
              {
                icon: GitPullRequestArrow,
                title: "Ship fixes faster",
                description:
                  "Review prioritized issue cards with AI suggestions and export directly to your issue tracker.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6"
              >
                <feature.icon className="h-8 w-8 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 md:px-12 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Image
              src={logoImage}
              alt="Maisen"
              className="h-4 w-5 rounded-sm object-contain opacity-50"
            />
            <span>Maisen</span>
          </div>
          <span>Built for c0mpiled Tokyo 2026</span>
        </div>
      </footer>
    </div>
  );
}
