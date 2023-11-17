module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'node', 'promise', 'prettier'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never'
      }
    ],
    'no-console': 'off',
    'prettier/prettier': 'error'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
