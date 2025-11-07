import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Unused imports and variables
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Import organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      // React specific rules - disable for server components
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      // General code quality
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "warn",
      // Next.js specific
      "@next/next/no-img-element": "off", // Allow img elements since we use Next.js Image
    },
  },
];

export default eslintConfig;
