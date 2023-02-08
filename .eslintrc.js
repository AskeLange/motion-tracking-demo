module.exports = {
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['vue'],
	rules: {
		'prefer-destructuring': ['warn', { object: true, array: false }],
		'no-unused-vars': ['warn'],
		curly: 'error',
		'vue/require-default-prop': 0,
		'vue/html-indent': ['error', 'tab'],
		indent: ['error', 'tab'],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 20,
				multiline: {
					max: 1,
					allowFirstLine: false,
				},
			},
		],
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
					component: 'any',
				},
			},
		],

		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-multi-spaces': ['error'],
	},
};
