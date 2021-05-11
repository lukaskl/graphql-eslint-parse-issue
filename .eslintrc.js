module.exports = {
  processor: '@graphql-eslint/graphql',
  overrides: [
    {
      files: ['*.graphql', '*.gql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        schema: './**/schema.gql',
      },
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/no-deprecated': 'warn',
      },
    },
  ],
}
