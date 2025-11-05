// tailwind.config.ts
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  // content non requis en v4
  theme: { extend: {} },
  plugins: [animate],
} satisfies Config;
