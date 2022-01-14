export async function onRequestGet({request, env, params, next}) {
    const url = new URL(request.url);

    // Let's treat such paths as static public files.
    if (url.pathname.includes('.')) {
        return next();
    }

    const assetURL = new URL('/', request.url).toString();
    const assetReq = new Request(assetURL, {
        cf: request.cf // https://github.com/cloudflare/wrangler2/issues/165#issuecomment-1010840734
    });
    const asset = await env.ASSETS.fetch(assetReq);
    const assetType = asset.headers.get('Content-Type');

    if (!assetType || !assetType.startsWith('text/html')) {
        return next();
    }

    const reportData = await getReportData(params.hash)
    const rewriter = (
        new HTMLRewriter()
        .onDocument(new ReportDataWriter(reportData))
        .on('meta', new MetaRewriter(reportData))
    );
    const res = rewriter.transform(asset);

    // Because we returning completely new asset, we need to remove
    // cache headers of original `asset` (which is always static).
    res.headers.delete('ETag');
    res.headers.delete('Cache-Control');
    res.headers.append('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');

    return res;
}

async function getReportData(hash) {
    // See `lib/valurank.js` for object structure.
    const data = {
        hash: hash,
        score: random(0, 100),
        article: {
            title: 'A few bytes here, a few there, pretty soon you’re talking real memory',
            url: 'https://dave.cheney.net/2021/01/05/a-few-bytes-here-a-few-there-pretty-soon-youre-talking-real-memory'
        },
        meta: {
            outsideLinks: [
                'https://github.com/golang/go/issues/23676',
                'https://golang.org/doc/go1.15#runtime',
                'https://foo.bar/with-some-very-long-pathname'
            ],
            isClickbait: true,
            clickbaitElements: 3,
            contentCoherence: 58,
            contentCoherenceMax: 100,
            isPoliticalBiases: true,
            politicalBiasesElements: 5,
            isInsultingSpeech: true,
            isRacialIntolerance: false,
            haveURLMedia: true,
            urlMediaCount: 3
        }
    };

    return data;
}

/**
 * Min and max included.
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class ReportDataWriter {
    constructor(data) {
        this.data = data;
    }

    end(end) {
        end.append(
            `<script>var vlrnkReportData = ${JSON.stringify(this.data)};</script>`,
            {html: true}
        );
    }
}

class MetaRewriter {
    constructor(reportData) {
        this.data = reportData;
    }

    element(element) {
        this.rewriteDescription(element);
        this.rewriteImage(element);
    }

    rewriteDescription(element) {
        const want = [
            'description',
            'og:description',
            'twitter:description'
        ];
        let name = element.getAttribute('name');

        if (!name) {
            name = element.getAttribute('property');
        }

        if (!want.includes(name)) {
            return;
        }

        const description = `I ran @valurank on this article. It scored ${this.data.score}. Do you think this is correct?`;

        element.setAttribute(
            'content',
            description
        );
    }

    rewriteImage(element) {
        const want = [
            'og:image',
            'twitter:image'
        ];
        let name = element.getAttribute('name');

        if (!name) {
            name = element.getAttribute('property');
        }

        if (!want.includes(name)) {
            return;
        }

        const url = `https://report-3a3.pages.dev/og/${this.data.score}.jpg`;

        element.setAttribute('content', url);
    }
}
