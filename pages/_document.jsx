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
            image: 'https://s715sas.storage.yandex.net/rdisk/a4ea0b3263b6a39bb5e5614a722601581bb4f842a446f5503e4a5cfa7281e65e/61e06c3c/k1ONeZ0XI5d6JCOQu8OXCNs_ezupIqdYY2hQiBG_D0xJ_egPPYMXRl47BmJAZqdP1f31KxsewQrtSoEucHM-tg==?uid=0&filename=0.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=106523&hid=f7be2bcd2f53d05f4ec9f3c2b2cf30c5&media_type=image&tknv=v2&etag=77de9284f1f445c8157a811e3331957b&rtoken=9uBGPq48BopB&force_default=no&ycrid=na-fdeb6551f769bc3dcabf7b942921ef38-downloader5f&ts=5d57aab868700&s=945733962c5662393b7f22db9fcbcbc058135d54534d8ab2d207d0e89e961458&pb=U2FsdGVkX1_joX6wx_rCEzzWcjS3qqPuzFaS7qrB6nkCn3nOAmRIFRwFSgsRlWOc7qO77WSj-GKEIfe0VwaOFPIc7hCatIVSaBlPxqPMfWk'
        };

        return (
            <Html
                lang={'en'}
            >
                <Head>
                    <meta
                        name='robots'
                        content='follow, index'
                    />
                    <meta
                        name='description'
                        content={meta.description}
                    />
                    <meta
                        name='keywords'
                        content='valurank, report'
                    />
                    <meta
                        property='og:site_name'
                        content={meta.title}
                    />
                    <meta
                        property='og:description'
                        content={meta.description}
                    />
                    <meta
                        property='og:title'
                        content={meta.title}
                    />
                    <meta
                        property='og:image'
                        content={meta.image}
                    />
                    <meta
                        name='twitter:card'
                        content='summary_large_image'
                    />
                    <meta
                        name='twitter:site'
                        content='@valurank'
                    />
                    <meta
                        name='twitter:title'
                        content={meta.title}
                    />
                    <meta
                        name='twitter:description'
                        content={meta.description}
                    />
                    <meta
                        name='twitter:image'
                        content={meta.image}
                    />

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
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
