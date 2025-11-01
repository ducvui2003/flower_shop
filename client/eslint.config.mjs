import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier', // Add Prettier to the extends array
  ),
  {
    plugins: { prettier }, // Add Prettier plugin
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier formatting as ESLint errors
    },
  },
];

export default eslintConfig;
