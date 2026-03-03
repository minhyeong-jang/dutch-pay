import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@naran/eslint-config/base";
import { nextjsConfig } from "@naran/eslint-config/nextjs";
import { reactConfig } from "@naran/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
