export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const asset = await context.env.ASSETS.fetch(url.origin + '/404');

    return new Response(asset.body, {
        status: 404
    });
}
