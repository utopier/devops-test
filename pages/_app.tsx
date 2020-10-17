import { AppProps } from 'next/app';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/core';

import AppLayout from '../component/AppLayout/AppLayout';

// dark mode color palette - https://colorhunt.co/palette/117601

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Global
				styles={css`
					${emotionReset}
					body {
						background-color: #232931;
						color: #eeeeee;
					}
					a {
						text-decoration: none;
						outline: none;
						color: #4ecca3;
					}
					*,
					*::after,
					*::before {
						box-sizing: border-box;
						-moz-osx-font-smoothing: grayscale;
						-webkit-font-smoothing: antialiased;
						font-smoothing: antialiased;
					}
				`}
			/>
			<AppLayout>
				<Component {...pageProps} />
			</AppLayout>
		</>
	);
};

export default MyApp;
