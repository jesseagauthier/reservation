module.exports = {
	env: {
		browser: true,
		es2021: true,
		semi: false,
	},
	extends: ['google', 'plugin:prettier/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.js', '.eslintrc.cjs'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 2023,
		sourceType: 'module',
	},
	rules: {
		// Add your ESLint rules here
	},
}
