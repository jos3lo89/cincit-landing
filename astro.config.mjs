// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue(), icon()],

  env: {
    schema: {
      NEXT_PUBLIC_API_URL: envField.string({
        context: "client",
        access: "public",
      }),
      JWT_SECRET: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },

  adapter: vercel(),
});
