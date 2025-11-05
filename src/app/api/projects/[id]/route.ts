import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { auth } from "@/auth";

type Params = { params: { id: string } };

/** PATCH /api/projects/:id — renommer un projet (membre requis) */
export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = params;
  const { name } = (await req.json().catch(() => ({}))) as { name?: string };
  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  // Vérifie que l’utilisateur est membre du projet
  const member = await prisma.projectMember.findFirst({
    where: { projectId: id, user: { email: session.user.email } },
    select: { id: true },
  });
  if (!member) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const project = await prisma.project.update({
    where: { id },
    data: { name: name.trim() },
  });

  return NextResponse.json({ project });
}

/** DELETE /api/projects/:id — supprimer un projet (ADMIN requis) */
export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = params;

  // Vérifie rôle ADMIN
  const admin = await prisma.projectMember.findFirst({
    where: { projectId: id, role: "ADMIN", user: { email: session.user.email } },
    select: { id: true },
  });
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
