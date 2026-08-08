module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // react-three-fiber renders three.js objects as JSX intrinsics
      // (<mesh>, <sphereGeometry>, ...), so eslint-plugin-react measures their
      // props against the HTML spec and flags every one of them.
      files: ['src/components/AsciiObject.jsx'],
      rules: { 'react/no-unknown-property': 'off' },
    },
  ],
}
