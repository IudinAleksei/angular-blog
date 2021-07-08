module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: 'tsconfig.*?.json',
        createDefaultProgram: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'airbnb-angular',
        'airbnb-typescript/base',
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        "@angular-eslint/no-attribute-decorator": "error",
        "@typescript-eslint/quotes": ["error", "single"],
        "no-duplicate-imports": "error",
        "comma-dangle": ["error", "always-multiline"],
        "max-len": ["error", { "code": 120 }],
        'import/order': ['error'],
        'typescript/class-name-casing': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/class-name-casing': 'off',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': ['error', { code: 120 }],
      },
    },
  ],
};
