/**
 * NOTE:
 * It is development route, not intended for usage in production.
 * In further entire code from here will go in `[id].js`.
 * This route will be deleted.
 */

import {
    NotFound,
    InternalServerError
} from '../../lib/response';
import {
    getContent
} from '../../lib/valurank';

export async function onRequestGet({request, env, params, next}) {
    const url = new URL(request.url);

    // Let's treat such paths as static public files.
    if (url.pathname.includes('.')) {
        return next();
    }

    const assetURL = new URL('/new', request.url).toString();
    const assetReq = new Request(assetURL, {
        cf: request.cf // https://github.com/cloudflare/wrangler2/issues/165#issuecomment-1010840734
    });
    const asset = await env.ASSETS.fetch(assetReq);
    const assetType = asset.headers.get('Content-Type');

    if (!assetType || !assetType.startsWith('text/html')) {
        return next();
    }

    let reportData;

    try {
        reportData = await getReportData(params.id);
    } catch (error) {
        return InternalServerError();
    }

    if (!reportData) {
        return await NotFound(env, request);
    }

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

/**
 * Gets report page data for specific ID.
 *
 * @param {string} id
 * Report page ID.
 *
 * @returns
 * See `lib/valurank.js` for structure example.
 * If data is missing for given `id`, then this function
 * will return `null`.
 *
 * @throws
 * Throws an error if API request failed (except HTTP 404).
 */
async function getReportData(id) {
    const result = await getContent(id);

    if (!result) {
        return null;
    }

    const data = {
        id,
        score: result.score,
        details: result.details,
        article: {
            title: result.content.title,
            url: result.content.url
        }
    };

    return data;
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

        const url = `https://r.valurank.com/og/${this.data.score}.jpg`;

        element.setAttribute('content', url);
    }
}
