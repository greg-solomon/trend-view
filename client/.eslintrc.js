module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ["airbnb", "prettier"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
		indent: [2, "tab", { SwitchCase: 1, VariableDeclarator: 1 }],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
	},
};
