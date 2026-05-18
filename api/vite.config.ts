import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // vite compreender as importações dentro dos testes (ex.: "@/repositories/")
  plugins: [tsconfigPaths()],
  test: {
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],
  },
});
