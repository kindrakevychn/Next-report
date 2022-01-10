export async function onRequestGet(context) {
    const originalURL = context.request.url;
    const url = new URL(originalURL);

    // Let's treat such paths as static public files.
    if (url.pathname.includes('.')) {
        return context.env.ASSETS.fetch(originalURL);
    }

    const asset = await context.env.ASSETS.fetch(url.origin + '/');
    const contentType = asset.headers.get('Content-Type');

    if (!contentType.startsWith('text/html')) {
        return asset;
    }

    const hash = url.pathname.replace('/', '');
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
            `<script>var vlrnkReportData = ${JSON.stringify(data)}</script>`,
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
