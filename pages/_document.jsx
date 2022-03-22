import Document, {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document';

export default class MyDocument extends Document {
    render() {
        const meta = {
            title: 'Valurank Report',
            description: 'Getting information in order.',
            image: '',
        };

        return (
            <Html lang={'en'}>
                <Head>
                    <meta name='robots' content='follow, index' />
                    <meta name='description' content={meta.description} />
                    <meta name='keywords' content='valurank, report' />

                    <meta property='og:site_name' content={meta.title} />
                    <meta property='og:description' content={meta.description} />
                    <meta property='og:title' content={meta.title} />
                    <meta property='og:image' content={meta.image} />

                    <meta name='twitter:card' content='summary_large_image' />
                    <meta name='twitter:site' content='@valurank' />
                    <meta name='twitter:title' content={meta.title} />
                    <meta name='twitter:description' content={meta.description} />
                    <meta name='twitter:image' content={meta.image} />

                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='anonymous'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap'
                        rel='stylesheet'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700;900&display=swap'
                        rel='stylesheet'
                    />

                    {/* GoSquared */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            !function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)}
                            d=s.createElement(q);d.src='//d1l6p2sc9645hc.cloudfront.net/gosquared.js';q=
                            s.getElementsByTagName(q)[0];q.parentNode.insertBefore(d,q)}(window,document
                            ,'script','_gs');

                            _gs('GSN-546410-D', false);
                            _gs('set', 'anonymizeIP', true);
                            _gs('set', 'trackParams', false);
                            //_gs('set', 'trackLocal', true); // For local test

                            _gs('track', '/report', 'Valurank Report');
                            `
                        }}
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
