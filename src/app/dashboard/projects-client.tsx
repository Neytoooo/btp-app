"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  id: string;
  name: string;
  createdAt: string;
  plans: any[];
  members: { user: { email: string; name: string | null; id: string } }[];
};

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json();
    setProjects(data.projects ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const hasProjects = useMemo(() => projects.length > 0, [projects]);

  async function createProject() {
    if (!newName.trim()) return;
    setCreating(true);
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setCreating(false);
    if (!res.ok) return alert("Erreur à la création du projet.");
    setNewName("");
    fetchProjects();
  }

  async function saveEdit(id: string) {
    if (!editValue.trim()) return;
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editValue.trim() }),
    });
    if (!res.ok) return alert("Impossible de renommer le projet.");
    setEditingId(null);
    fetchProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm("Supprimer ce projet ?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Suppression interdite (ADMIN requis).");
    fetchProjects();
  }

  return (
    <section className="space-y-6">
      {/* Create */}
      <div className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 p-4 bg-white/70 dark:bg-neutral-900/60">
        <h2 className="font-medium">Créer un projet</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom du projet"
            className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:ring-2 focus:ring-sky-400/40"
          />
          <button
            onClick={createProject}
            disabled={creating}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 disabled:opacity-60"
          >
            {creating ? "Création..." : "Créer"}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/60 dark:bg-neutral-900/60">
          <h3 className="font-medium">Projets récents</h3>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-neutral-500">Chargement…</div>
        ) : !hasProjects ? (
          <div className="p-6 text-sm text-neutral-500">Aucun projet pour le moment.</div>
        ) : (
          <ul className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
            {projects.map((p) => (
              <li key={p.id} className="px-4 py-3 flex items-center gap-3">
                {editingId === p.id ? (
                  <>
                    <input
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 outline-none focus:ring-2 focus:ring-sky-400/40"
                    />
                    <button
                      onClick={() => saveEdit(p.id)}
                      className="px-3 py-2 rounded-lg bg-emerald-600 text-white"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-2 rounded-lg border"
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-neutral-500">
                        {new Date(p.createdAt).toLocaleString()} • {p.plans.length} plan(s) • {p.members.length} membre(s)
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(p.id);
                        setEditValue(p.name);
                      }}
                      className="px-3 py-2 rounded-lg border"
                    >
                      Renommer
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="px-3 py-2 rounded-lg border border-red-300 text-red-600"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
