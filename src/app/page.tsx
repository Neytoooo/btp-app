"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord BTP 🏗️</h1>
        <button
          onClick={async () => {
            const name = prompt("Nom du projet ?");
            if (!name) return;
            const res = await fetch("/api/projects", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                userEmail: "mattis@example.com",
              }),
            });
            if (res.ok) {
              const newProject = (await res.json()).project;
              setProjects([newProject, ...projects]);
            } else {
              alert("Erreur lors de la création du projet.");
            }
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Nouveau projet
        </button>
      </header>

      {projects.length === 0 ? (
        <p className="text-gray-600 text-center mt-20">Aucun projet pour le moment.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="font-semibold text-gray-900">{p.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Créé le {new Date(p.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </motion.div>
          ))}
        </section>
      )}
    </main>
  );
}
