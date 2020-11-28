/* eslint-disable */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // 환경변수, process.env.customKey
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
  // Compression, gzip 압축
  compress: true,
  //   // 런타임 구성
  //   serverRuntimeConfig: {
  //     // Will only be available on the server side
  //     mySecret: 'secret',
  //     secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  //   },
  //   publicRuntimeConfig: {
  //     // Will be available on both server and client
  //     staticFolder: '/static',
  //   },
  //   // x-powered-by 비활성화
  //   poweredByHeader: false,
  //   // ETag 생성 비활성화
  // generateEtags: false,
  //   // 사용자 지정 빌드 디렉토리
  //   distDir: 'build',
  //   // 빌드 ID 구성
  //   generateBuildId: async () => {
  //     // You can, for example, get the latest git commit hash here
  //     return 'my-build-id'
  //   },
  //   // onDemandEntries 구성
  //   onDemandEntries: {
  //     // period (in ms) where the server will keep pages in the buffer
  //     maxInactiveAge: 25 * 1000,
  //     // number of pages that should be kept simultaneously without being disposed
  //     pagesBufferLength: 2,
  //   },
  //	// Typescript 오류 무시
  //   typescript: {
  //     // !! WARN !!
  //     // Dangerously allow production builds to successfully complete even if
  //     // your project has type errors.
  //     // !! WARN !!
  //     ignoreBuildErrors: true,
  //   },
  //	// exportPathMap
  //   // 후행 슬래시
  //   trailingSlash: true,
  //   // Strict mode 활성화
  //   reactStrictMode: true,
  // 정적 최적화 표시기
  devIndicators: {
    autoPrerender: true,
  },
  //   // 국제화
  //   i18n: {
  //     // These are all the locales you want to support in
  //     // your application
  //     locales: ['en-US', 'fr', 'nl-NL'],
  //     // This is the default locale you want to be used when visiting
  //     // a non-locale prefixed path e.g. `/hello`
  //     defaultLocale: 'en-US',
  //     // This is a list of locale domains and the default locale they
  //     // should handle (these are only required when setting up domain routing)
  //     domains: [
  //       {
  //         domain: 'example.com',
  //         defaultLocale: 'en-US',
  //       },
  //       {
  //         domain: 'example.nl',
  //         defaultLocale: 'nl-NL',
  //       },
  //       {
  //         domain: 'example.fr',
  //         defaultLocale: 'fr',
  //       },
  //     ],
  //   },
};
