export async function onRequestGet({request, env, params}) {
    const url = new URL(request.url);

    // Let's treat such paths as static public files.
    if (url.pathname.includes('.')) {
        return env.ASSETS.fetch(request);
    }

    const assetURL = new URL('/', request.url).toString();
    const assetReq = new Request(assetURL, request);
    const asset = await env.ASSETS.fetch(assetReq);
    const assetType = asset.headers.get('Content-Type');

    if (!assetType.startsWith('text/html')) {
        return asset;
    }

    const {hash} = params;
    const rewriter = (
        new HTMLRewriter()
        .onDocument(new ReportDataWriter(hash))
    );
    const res = rewriter.transform(asset);

    return res;
}

class ReportDataWriter {
    constructor(hash) {
        this.hash = hash;
    }

    async end(end) {
        // See `lib/valurank.js` for object structure.
        const data = {
            hash: this.hash,
            score: random(0, 100)
        };

        end.append(
            `<script>var vlrnkReportData = ${JSON.stringify(data)};</script>`,
            {html: true}
        );
    }
}

/**
 * Min and max included.
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
