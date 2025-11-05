import { signInWithGoogle } from "./actions";

export default function SignInPage() {
  return (
    <form action={signInWithGoogle}>
      <button type="submit">Se connecter avec Google</button>
    </form>
  );
}
