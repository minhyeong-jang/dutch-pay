import { defineConfig } from "eslint/config";

import { baseConfig } from "@naran/eslint-config/base";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
);
