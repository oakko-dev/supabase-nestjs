import antfu from "@antfu/eslint-config"

export default antfu({
	typescript: true,
	jsonc: true,
	yaml: true,
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: false,
	},
	rules: {
		"no-new": "off",
		"no-undef": "off",
		"no-alert": "off",
		"no-console": "off",
		"no-restricted-globals": "off",
		"regexp/no-obscure-range": "off",
		"node/prefer-global/process": "off",
		"ts/consistent-type-imports": "off",
	},
})
