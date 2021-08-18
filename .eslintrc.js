module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  "settings": {
    "react": {
      "version": "lates",
    }
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'no-mixed-spaces-and-tabs': 0,
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'no-trailing-spaces': 2,
    'eol-last': ['error', 'always'],
    'max-len': ['error', 119, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
    }],
    'camelcase': ['error', { properties: 'always' }],
    'no-else-return': 'error',
    'eqeqeq': ['error', 'always'],
    'no-case-declarations': 'error',
    'no-empty-pattern': 'error',
    'no-global-assign': 'error',
    'no-redeclare': ['error', { 'builtinGlobals': true }],
    'no-useless-return': 'error',
  }
};
