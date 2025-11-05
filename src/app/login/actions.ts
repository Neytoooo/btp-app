"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  // après login on atterrit sur la page d’app (/)
  await signIn("google", { redirectTo: "/" });
}
