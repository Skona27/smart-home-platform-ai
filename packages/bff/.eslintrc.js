module.exports = {
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    project: ['packages/bff/tsconfig.json'],
  },
  env: {
    node: true,
    jest: true,
  },
};
