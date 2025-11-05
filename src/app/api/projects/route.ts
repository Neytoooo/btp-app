import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
});

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { members: true, plans: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, userEmail } = body as { name?: string; userEmail?: string };

  if (!name || !userEmail) {
    return NextResponse.json({ error: "name & userEmail required" }, { status: 400 });
  }

  

  // upsert user by email for demo
  const user = await prisma.user.upsert({
    where: { email: userEmail },
    create: { email: userEmail },
    update: {},
    select: { id: true },
  });

  const project = await prisma.project.create({
    data: {
      name,
      members: { create: { userId: user.id, role: "ADMIN" } },
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
