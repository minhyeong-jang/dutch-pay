import { defineConfig } from "eslint/config";

import { baseConfig } from "@naran/eslint-config/base";
import { reactConfig } from "@naran/eslint-config/react";

export default defineConfig(
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  baseConfig,
  reactConfig,
);
