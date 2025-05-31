import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import json from '@eslint/json';
import css from '@eslint/css';
// Remove import for markdown if you don't have it or want it disabled for now
// import markdown from '@eslint/markdown'; 
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1. Global ignores
  {
    ignores: [
      ".next/**", 
      "node_modules/**",
      "app/globals.css",
      // Add other globally ignored files/patterns if any (e.g., build outputs, coverage reports)
    ],
  },

  // 2. Main JavaScript/TypeScript Configuration
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    ignores: [ // Ignore JSON files from this JS/TS-focused configuration
      '**/*.json', 
      '.eslintrc.json', // Specific common JSON config files
      '.vercel/project.json',
      'components.json',
      'package.json',
      'package-lock.json',
      'pnpm-lock.yaml',
      'tsconfig.json',
      'vercel.json',
      // any other json files that should not be linted as JS/TS
    ],
    plugins: { js }, // Using @eslint/js
    extends: [js.configs.recommended], // Recommended rules from @eslint/js
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node 
      } 
    },
    rules: { 
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      // Add any other general JS/TS overrides here
    } 
  },

  // 3. TypeScript Configuration (extends main JS/TS config implicitly)
  tseslint.configs.recommended, // Base recommended TypeScript rules

  // 4. React Specific Configuration
  { 
    files: ['**/*.{jsx,tsx}'], // More specific to JSX/TSX files for React rules
    ...pluginReact.configs.flat.recommended, // Base recommended React rules
    settings: { 
      react: { version: "detect" } 
    },
    rules: {
      // ...pluginReact.configs.flat.recommended.rules, // Already spread above
      'react/react-in-jsx-scope': 'off', // Ensure it's off
      'react/prop-types': 'off', // Often off in TypeScript projects
      // Add any other React specific rule overrides here
    },
  },

  // 5. React Hooks Plugin Configuration
  { 
    files: ['**/*.{js,jsx,ts,tsx}'], // Apply to all JS/JSX/TS/TSX
    plugins: { 'react-hooks': pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // 6. Configuration for specific script files (if needed)
  {
    files: ['scripts/**/*.js'], // Example: if you have JS scripts in a scripts folder
    languageOptions: {
        globals: globals.node // Node.js environment
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Allow require
      'no-undef': 'off', // Allow process, etc. if not covered by globals.node fully
    }
  },
  {
    files: ['tailwind.config.ts', 'postcss.config.js', 'next.config.mjs'], // Common JS config files
    languageOptions: {
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Allow require
    }
  },
  
  // 7. JSON File Configuration
  json.configs.recommended, // Handles .json, .jsonc, .json5 with appropriate parser and rules

  // 8. Markdown Configuration (Optional - uncomment if you want to lint markdown)
  // {
  //   files: ['**/*.md'],
  //   plugins: { markdown }, // Ensure 'markdown' is imported from '@eslint/markdown'
  //   processor: markdown.processors.markdown, // Use the markdown processor
  //   // extends: [markdown.configs.recommended] // If available and desired
  // },

  // 9. CSS Configuration
  // Configuration for app/globals.css - make it minimal to avoid @eslint/css
  {
    files: ['app/globals.css'],
    // By OMITTING `plugins: { css }` and any css-specific `extends` or `rules` here,
    // @eslint/css will not be applied to this file through this block.
    // Ensure it's also in the `ignores` array of any broader CSS block.
  },

  // Configuration for other CSS files
  {
    files: ['**/*.css'],
    ignores: [
        '.next/**/*.css', 
        'app/globals.css' // Crucial: app/globals.css is ignored by this general CSS linting block
    ], 
    plugins: { css },
    extends: [css.configs.recommended], 
  },
]);