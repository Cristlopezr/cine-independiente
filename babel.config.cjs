module.exports = {
	presets: [
		['@babel/preset-env', { targets: { esmodules: true } }],
		['@babel/preset-react', { runtime: 'automatic' }],
		'@babel/preset-typescript',
	],
	/* plugins: [
		function () {
			return {
				visitor: {
					MetaProperty(path) {
						path.replaceWithSourceString('process');
					},
				},
			};
		},
		[
			'module-resolver',
			{
				alias: {
					'@': './src',
				},
			},
		],
	], */
};
