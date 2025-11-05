"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HardHat,
  Ruler,
  FileSpreadsheet,
  Map,
  Layers,
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Upload,
} from "lucide-react";

/** UI bits (légers, inline) */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-700/50">
    {children}
  </span>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-sm ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="w-5 h-5" />
    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{title}</h3>
  </div>
);

const Progress = ({ value }: { value: number }) => (
  <div className="w-full h-2 rounded-full bg-neutral-200/80 dark:bg-neutral-800">
    <div className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${value}%` }} />
  </div>
);

/** Données mock pour la preview */
const projects = [
  { id: "P-001", name: "Résidence Les Tilleuls", city: "Lyon", progress: 68, status: "En cours", color: "bg-blue-500" },
  { id: "P-002", name: "Hangar Logistique B12", city: "Lille", progress: 42, status: "Études", color: "bg-emerald-500" },
  { id: "P-003", name: "Réhabilitation École Jules Ferry", city: "Paris", progress: 83, status: "Chantier", color: "bg-amber-500" },
  { id: "P-004", name: "Immeuble Odyssée", city: "Marseille", progress: 25, status: "Avant-projet", color: "bg-fuchsia-500" },
];

const activities = [
  { icon: Upload, label: "Plan structure S2 importé", ts: "09:24", by: "Camille" },
  { icon: Ruler, label: "Métré dalle RDC (125m²)", ts: "08:51", by: "Yanis" },
  { icon: FileSpreadsheet, label: "Devis #D-104 actualisé", ts: "Hier", by: "Lina" },
  { icon: Layers, label: "Nouveau calque — Réseaux EU/EV", ts: "Hier", by: "Thomas" },
];

const stats = [
  { label: "Projets actifs", value: 12, icon: HardHat },
  { label: "Plans importés", value: 87, icon: Layers },
  { label: "Métrés validés", value: 34, icon: Ruler },
  { label: "Devis en attente", value: 5, icon: FileSpreadsheet },
];

const nav = [
  { label: "Dashboard", icon: HardHat, active: true },
  { label: "Projets", icon: Layers },
  { label: "Plans", icon: Map },
  { label: "Métrés", icon: Ruler },
  { label: "Devis", icon: FileSpreadsheet },
  { label: "Calendrier", icon: Calendar },
  { label: "Rapports", icon: FileText },
  { label: "Paramètres", icon: Settings },
];

const Glow = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-400/20 to-emerald-400/20 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-400/20 to-amber-400/20 blur-3xl" />
  </div>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100">
      <Glow />

      {/* Topbar */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200/50 dark:border-neutral-800/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white">
              <HardHat className="h-5 w-5" />
            </div>
            <span className="font-semibold">BTP Studio</span>
            <Badge>Pré-production</Badge>
          </div>

          <div className="hidden md:flex items-center gap-2 w-1/2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-800/60 outline-none focus:ring-2 focus:ring-sky-400/40"
                placeholder="Rechercher projets, plans, devis…"
              />
            </div>
            <button className="px-3 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-16 self-start">
          <Card className="p-3">
            <nav className="space-y-1">
              {nav.map(({ label, icon: Icon, active }) => (
                <a
                  key={label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 ${
                    active ? "bg-neutral-100/80 dark:bg-neutral-800/60" : ""
                  }`}
                  href="#"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </nav>
          </Card>

          <Card className="mt-4 p-4">
            <SectionTitle title="Raccourcis" icon={ChevronRight} />
            <div className="flex flex-wrap gap-2">
              {["Nouveau projet", "Importer un plan", "Créer un métré", "Générer un devis"].map((x) => (
                <button
                  key={x}
                  className="text-xs px-3 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
                >
                  {x}
                </button>
              ))}
            </div>
          </Card>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-semibold">{value}</div>
                    <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Projects + Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Projets récents</h2>
                <button className="text-sm px-3 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60">
                  Voir tous
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl ${p.color} text-white grid place-items-center`}>
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                              {p.city} • {p.id}
                            </div>
                          </div>
                        </div>
                        <Badge>{p.status}</Badge>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Progress value={p.progress} />
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Avancement {p.progress}%
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <div className="px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">Plans: 12</div>
                        <div className="px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">Mesures: 58</div>
                        <div className="px-2 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800">Devis: 3</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Plan quick view */}
              <Card className="p-0 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
                  <div className="flex items-center gap-3">
                    <Map className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Aperçu plan — Dalle RDC</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        Projet: Résidence Les Tilleuls • Plan: PL-02.pdf
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm rounded-lg border border-neutral-200/60 dark:border-neutral-800/60">
                      Mesurer
                    </button>
                    <button className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                      Ouvrir
                    </button>
                  </div>
                </div>
                <div className="relative h-64 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_50%)]">
                  <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-xl border border-dashed border-neutral-300/70 dark:border-neutral-700/70" viewBox="0 0 600 240">
                    <rect x="20" y="30" width="200" height="120" rx="6" className="fill-none" stroke="currentColor" strokeOpacity="0.35" />
                    <rect x="260" y="50" width="140" height="80" rx="6" className="fill-none" stroke="currentColor" strokeOpacity="0.35" />
                    <polyline points="60,170 180,170 240,120 390,120 520,180" className="fill-none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
                    <g>
                      <Ruler className="w-4 h-4" />
                    </g>
                  </svg>
                </div>
              </Card>
            </div>

            {/* Activity */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Activité</h2>
                <button className="text-sm px-3 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60">
                  Tout voir
                </button>
              </div>

              <Card className="p-4">
                <ul className="space-y-4">
                  {activities.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                        <a.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{a.label}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {a.by} • {a.ts}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-4">
                <SectionTitle title="Devis en attente" icon={FileSpreadsheet} />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60"
                    >
                      <div>
                        <div className="text-sm font-medium">Devis #D-10{i}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Projet: Les Tilleuls • 12 postes • 48 230 € HT
                        </div>
                      </div>
                      <button className="text-sm px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                        Ouvrir
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} BTP Studio — Design preview.
      </footer>
    </div>
  );
}
