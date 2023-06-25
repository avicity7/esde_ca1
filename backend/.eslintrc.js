module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'max-len': 0,
    'require-jsdoc': 0,
    'no-var': 0,
    'no-tabs': 0,
    'new-cap': 0,
  },
};
