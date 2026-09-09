export async function onRequest({ request, env }) {
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'GET' }
    });
  }

  const assetUrl = new URL(request.url);
  assetUrl.pathname = '/api/skills.json';
  assetUrl.search = '';
  return env.ASSETS.fetch(assetUrl);
}
