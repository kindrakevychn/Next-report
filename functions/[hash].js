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

    const reportData = await getReportData(params.hash)
    const rewriter = (
        new HTMLRewriter()
        .onDocument(new ReportDataWriter(reportData))
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
