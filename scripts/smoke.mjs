import assert from 'node:assert/strict';
const web = process.env.WEB_URL || 'http://localhost:3000';
const platform = process.env.PLATFORM_URL || 'http://localhost:3001';
const request = url => fetch(url, { redirect: 'manual' });
for (const path of ['/', '/pricing', '/about', '/privacy', '/refund', '/ToS', '/guides', '/guides/job-interview', '/sitemap.xml', '/robots.txt']) {
  const response = await request(web + path);
  assert.equal(response.status, 200, `web ${path}`);
}
for (const path of ['/login', '/register', '/forgot-password', '/reset-password', '/oauth-callback', '/home/conversations', '/home/dictionary', '/home/recents', '/pricing']) {
  const response = await request(platform + path);
  assert.equal(response.status, 200, `platform ${path}`);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
}
for (const path of ['/home/conversations/example?tab=words', '/reset-password?userId=example&secret=test-token', '/oauth-callback?userId=example&secret=test-token', '/pricing/success?session_id=example']) {
  const response = await request(web + path);
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), platform + path, `query preservation ${path}`);
}
for (const path of ['/guides/job-interview?ref=library', '/privacy', '/ToS']) {
  const response = await request(platform + path);
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), web + path);
}
const deletion = await fetch(web + '/api/delete-account?test=1', { method: 'POST', redirect: 'manual' });
assert.equal(deletion.status, 307);
assert.equal(deletion.headers.get('location'), platform + '/api/delete-account?test=1');
const publishing = await fetch(web + '/api/guides/publish', { method: 'POST', redirect: 'manual' });
assert.ok([401, 500].includes(publishing.status), 'publishing must remain protected');
console.log('Passed: public/app pages, SEO protection, bidirectional redirects, callback query preservation, API method-preserving redirect and publishing protection.');
