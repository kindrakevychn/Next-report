import Head from 'next/head';

import '../styles/app.css';

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>
                    {'Valurank Report'}
                </title>
            </Head>

            <Component
                {...pageProps}
            />
        </>
    );
}
