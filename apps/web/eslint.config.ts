import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@dutch/eslint-config/base";
import { nextjsConfig } from "@dutch/eslint-config/nextjs";
import { reactConfig } from "@dutch/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
