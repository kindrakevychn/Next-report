/**
 * Use this module only inside of `functions` module.
 */

export async function NotFound(env, request) {
    const url = new URL('/404', request.url).toString();
    const req = new Request(url, request);
    const asset = await env.ASSETS.fetch(req);
    const res = new Response(asset.body, {
        status: 404
    });

    return res;
}

export function InternalServerError() {
    return new Response('Internal error. Try later please.', {
        status: 500,
        statusText: 'Internal Server Error'
    });
}
