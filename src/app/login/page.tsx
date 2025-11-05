"use client";

import { signInWithGoogle } from "./actions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const error = params.get("error");
  const [pending, setPending] = useState(false);

  return (
    <div className="min-h-screen relative grid place-items-center bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl bg-gradient-to-br from-sky-400/20 to-emerald-400/20" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl bg-gradient-to-br from-fuchsia-400/20 to-amber-400/20" />
      </div>

      {/* Card */}
      <div className="mx-4 w-full max-w-md rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-lg">
        <div className="p-8">
          {/* Logo + title */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 grid place-items-center text-white">
              {/* petit pictogramme "dôme" */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 18h18M6 18V9a6 6 0 1112 0v9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold">BTP Studio</h1>
            <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-200/60 dark:border-neutral-700/60 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              Pré-production
            </span>
          </div>

          {/* Copy */}
          <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Accès réservé aux comptes Google de l’entreprise.
          </p>

          {/* Erreur éventuelle */}
          {error && (
            <div className="mt-4 text-sm rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-600 dark:text-red-400">
              Échec de connexion. Réessaie ou contacte l’admin. <span className="opacity-70">({error})</span>
            </div>
          )}

          {/* Bouton Google */}
          <form
            action={async () => {
              setPending(true);
              await signInWithGoogle();
            }}
            className="mt-6"
          >
            <button
              type="submit"
              disabled={pending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium border border-neutral-200/60 dark:border-neutral-700/60 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 disabled:opacity-60"
            >
              <GoogleIcon />
              {pending ? "Connexion..." : "Se connecter avec Google"}
            </button>
          </form>

          {/* Liste des points clés (rappel features) */}
          <ul className="mt-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <li className="flex items-center gap-2">
              <Dot /> Projets & plans centralisés
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Métrés et annotations sur plan
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Devis & suivi d’activité
            </li>
          </ul>
        </div>

        <div className="px-8 py-4 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200/60 dark:border-neutral-800/60">
          © {new Date().getFullYear()} BTP Studio
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 inline-block" />;
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#EA4335" d="M12 10.2v3.95h5.6c-.25 1.45-1.68 4.26-5.6 4.26-3.37 0-6.12-2.79-6.12-6.24S8.63 5.93 12 5.93c1.92 0 3.21.82 3.95 1.53l2.7-2.6C17.3 3.48 14.88 2.5 12 2.5 6.98 2.5 2.89 6.6 2.89 11.67 2.89 16.74 6.98 20.84 12 20.84c6.94 0 8.04-5.9 7.54-9.04H12z" />
    </svg>
  );
}
