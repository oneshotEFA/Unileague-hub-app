"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CalendarDays, Filter, Search, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { Tournament } from "@/app/(private)/admin/tournaments/page";
import { mapTournaments } from "@/app/(private)/admin/tournaments/util";
import { fetcher } from "@/lib/utils";

const STATUS_FILTERS = ["ALL", "UPCOMING", "ONGOING", "COMPLETED"] as const;

const getTournamentYear = (date: string) => new Date(date).getFullYear();

export default function TournamentsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const router = useRouter();
  const { data, isLoading } = useSWR("/api/public/tournament", fetcher, {
    revalidateOnFocus: false,
  });

  const tournaments: Tournament[] = mapTournaments(data);

  const allYears = useMemo(
    () =>
      Array.from(new Set(tournaments.map((t) => getTournamentYear(t.startingDate)))).sort(
        (a, b) => b - a
      ),
    [tournaments]
  );


  const selectedYear = activeYear ?? allYears[0] ?? null;

  const filteredTournaments = useMemo(() => {
    let filtered = selectedYear
      ? tournaments.filter((t) => getTournamentYear(t.startingDate) === selectedYear)
      : tournaments;

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((t) =>
        t.tournamentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedYear, statusFilter, tournaments]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.3),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.25),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              <Trophy className="h-3.5 w-3.5" /> Tournament Center
            </span>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">Discover ASTU Competitions</h1>
            <p className="mt-4 max-w-2xl text-slate-300 md:text-lg">
              Explore university tournaments with a cleaner, faster browsing flow designed for fans, players, and managers.
            </p>
            <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2"><CalendarDays className="h-4 w-4" /> {allYears.length} Seasons</span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2"><Users className="h-4 w-4" /> {tournaments.reduce((sum, t) => sum + (t.teams ?? 0), 0)} Teams</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-3">
          <label className="md:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-300">Search</span>
            <span className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tournament by name"
                className="w-full bg-transparent text-sm outline-hidden placeholder:text-slate-500"
              />
            </span>
          </label>
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-300">Status</span>
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    statusFilter === status
                      ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                      : "border-white/20 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {allYears.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selectedYear === year
                  ? "border-fuchsia-300 bg-fuchsia-300/20 text-fuchsia-100"
                  : "border-white/20 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">Loading tournaments...</p>
        ) : filteredTournaments.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">No tournament matches this filter.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTournaments.map((tournament, index) => (
              <motion.article
                key={tournament.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => router.push(`/tournaments/${tournament.id}`)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
              >
                <div
                  className="relative h-44 border-b border-white/10 bg-slate-800 bg-cover bg-center"
                  style={{ backgroundImage: tournament.logurl ? `url(${tournament.logurl})` : undefined }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-sm">{tournament.status}</span>
                </div>

                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-bold transition group-hover:text-cyan-200">{tournament.tournamentName}</h3>
                  <p className="flex items-center gap-2 text-xs text-slate-300"><Calendar className="h-4 w-4" /> {formatDate(tournament.startingDate)} - {formatDate(tournament.endingDate)}</p>
                  <p className="flex items-center gap-2 text-xs text-slate-300"><Users className="h-4 w-4" /> {tournament.teams} Teams</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-cyan-200/20 bg-cyan-100/5 p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to Join a Tournament?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">If your team has an access key, register now and step into the next ASTU football season.</p>
          <Link href="/tournaments/register" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5">
            Register Team <Filter className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
