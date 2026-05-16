"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Newspaper,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const navCards = [
  {
    href: "/tournaments",
    title: "Tournaments",
    desc: "Explore active and upcoming campus competitions.",
    icon: Trophy,
  },
  {
    href: "/matches",
    title: "Matches",
    desc: "Track schedules, scores, and match momentum.",
    icon: Calendar,
  },
  {
    href: "/teams",
    title: "Teams",
    desc: "Browse lineups, squads, and season form.",
    icon: Users,
  },
  {
    href: "/news",
    title: "News",
    desc: "Stay current with stories and announcements.",
    icon: Newspaper,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_75%_20%,rgba(168,85,247,0.22),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.2),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            ASTU Football Hub
          </span>

          <h1 className="text-balance text-4xl font-black leading-tight md:text-6xl">
            Stadium energy, now in your browser.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
            The UniLeague platform connects tournaments, teams, and fans with a
            fresh digital match-day experience.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/tournaments"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5"
            >
              Enter Tournaments
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/matches"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Live Fixtures
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-20 md:grid-cols-2 lg:grid-cols-4">
        {navCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Link
                href={item.href}
                className="group block rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <div className="mb-5 inline-flex rounded-xl border border-white/20 bg-white/10 p-3">
                  <Icon className="h-5 w-5 text-cyan-200" />
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-200">
                  Explore <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
