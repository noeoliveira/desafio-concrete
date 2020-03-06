module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
		"jest/globals": true

	},
	extends: ['airbnb-base', 'prettier'],
	plugins: ['eslint-plugin-prettier', "jest"],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		'prettier/prettier': 'Error',
		'class-methods-use-this': 'off',
		'no-param-reassign': 'off'
	},
};
