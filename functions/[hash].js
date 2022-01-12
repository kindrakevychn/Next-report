export async function onRequestGet({request, env, params, next}) {
    const url = new URL(request.url);

    // Let's treat such paths as static public files.
    if (url.pathname.includes('.')) {
        return next();
    }

    const assetURL = new URL('/', request.url).toString();
    const assetReq = new Request(assetURL, request);
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

    return res;
}

async function getReportData(hash) {
    // See `lib/valurank.js` for object structure.
    const data = {
        hash: hash,
        score: random(0, 100)
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
}
