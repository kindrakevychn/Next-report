export async function onRequestGet({env, request}) {
    const url = new URL('/404', request.url).toString();
    const req = new Request(url, request);
    const asset = await env.ASSETS.fetch(req);
    const res = new Response(asset.body, {
        status: 404
    });

    return res;
}
