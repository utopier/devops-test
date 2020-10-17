/* eslint-disable */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	// 환경변수
	env: {
		customKey: 'my-value',
	},
	// // 기본 경로
	// basePath: '/basic',
	// // rewrites
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/with-basePath', // /basic/with-basePath
	// 			destination: '/another', // /basic/another
	// 		},
	// 		{
	// 			source: '/without-basePath',
	// 			destination: '/another',
	// 			basePath: false,
	// 		},
	// 	];
	// },
	// // redirects
	// async redirects() {
	//   return [
	//     {
	//       source: 'about',
	//       destination: '/',
	//       permanent: true,
	//     }
	//   ]
	// }
	// // Custom Headers
	// async headers() {
	//   return [
	//     {
	//       source: '/about',
	//       headers: [
	//         {
	//           key: 'x-custom-header',
	//           value: 'my custom header value',
	//         },
	//         {
	//           key: 'x-another-custom-header',
	//           value: 'my other custom header value',
	//         },
	//       ],
	//     },
	//   ]
	// },
	// Custom Page Extension
	pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
	// // asset prefix를 활용한 CDN 지원
	// assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
	// Custom Webpack Config
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Note: we provide webpack above so you should not `require` it
		// Perform customizations to webpack config
		config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

		// Important: return the modified config
		return config;
	},
	// Compression
	compress: true,
	// 정적 최적화 표시기
	devIndicators: {
		autoPrerender: true,
	},
};
