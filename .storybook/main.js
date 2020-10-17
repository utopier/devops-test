const path = require('path');

module.exports = {
	stories: ['../designSystem/**/*.stories.mdx', '../designSystem/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-knobs', '@storybook/addon-docs'],
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [['react-app', { flow: false, typescript: true }]],
					},
				},
				require.resolve('react-docgen-typescript-loader'),
			],
		});
		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	},
};
