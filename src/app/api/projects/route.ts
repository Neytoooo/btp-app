import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { auth } from "@/auth";

/** GET /api/projects — liste les projets de l’utilisateur connecté */
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Tous les projets où l’utilisateur est membre
  const projects = await prisma.project.findMany({
    where: {
      members: { some: { user: { email: session.user.email } } },
    },
    include: {
      members: {
        include: { user: { select: { email: true, name: true, id: true } } },
      },
      plans: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ projects });
}

/** POST /api/projects — crée un projet et ajoute l’utilisateur comme ADMIN */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { name } = body as { name?: string };
  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  // upsert user par email
  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    create: { email: session.user.email, name: session.user.name ?? null },
    update: { name: session.user.name ?? undefined },
    select: { id: true },
  });

  const project = await prisma.project.create({
    data: {
      name: name.trim(),
      members: {
        create: {
          userId: user.id,
          role: "ADMIN",
        },
      },
    },
    include: {
      members: { include: { user: { select: { email: true, name: true, id: true } } } },
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
