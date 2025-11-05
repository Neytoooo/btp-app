import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProjectsClient from "./projects-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Projets</h1>
          <p className="text-sm text-neutral-500">
            Bonjour {session.user?.name ?? session.user?.email}
          </p>
        </div>
      </header>

      <ProjectsClient />
    </main>
  );
}
