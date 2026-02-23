import { defineConfig } from "eslint/config";

import { baseConfig } from "@dutch/eslint-config/base";
import { reactConfig } from "@dutch/eslint-config/react";

export default defineConfig(
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  baseConfig,
  reactConfig,
);
