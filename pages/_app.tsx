import { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import GlobalStyles from '../styles/GlobalStyles';

import AppLayout from '../component/AppLayout/AppLayout';

// dark mode color palette - https://colorhunt.co/palette/117601

// 성능 측정
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // eslint-disable-next-line no-console
  console.log(metric);
}

// Accessibility
// title

// SEO
// title, meta description, Open Graph & Twitter Card, 키워드 및 콘텐츠 최적화

// Responsive
// meta viewport

// PWA
// manifest.webmenifest, serviceworker.js, install.js. pushMessage.js

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>utopier todoapp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is an example of a meta description. This will often show up in search results."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nytimesbits" />
        <meta name="twitter:creator" content="@nickbilton" />
        <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
        <meta property="og:title" content="A Twitter for My Sister" />
        <meta
          property="og:description"
          content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling."
        />
        <meta
          property="og:image"
          content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <GlobalStyles />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

export default MyApp;
