import test from 'node:test';
import assert from 'node:assert/strict';
import { origin, redirectsTo as webRedirects } from '../apps/web/routing.mjs';
import { redirectsTo as platformRedirects } from '../apps/platform/routing.mjs';

test('cross-site origins reject path injection and unsafe protocols', () => {
  assert.equal(origin('https://app.synomilo.com/', ''), 'https://app.synomilo.com');
  assert.equal(origin(undefined, 'http://localhost:3001'), 'http://localhost:3001');
  for (const value of ['javascript:alert(1)', 'https://user:pass@example.com', 'https://example.com/evil', 'https://example.com?next=evil', 'https://example.com#evil']) {
    assert.throws(() => origin(value, ''));
  }
});
test('web forwards legacy app routes including recovery, billing and delete API', () => {
  const rules = webRedirects('https://app.synomilo.com');
  for (const source of ['/home/:path*', '/profile/:path*', '/oauth-callback', '/reset-password', '/pricing/success', '/pricing/canceled', '/api/delete-account']) {
    assert.ok(rules.some(rule => rule.source === source && rule.destination === `https://app.synomilo.com${source}` && rule.permanent === false));
  }
  for (const publicPath of ['/', '/pricing', '/guides/:path*', '/api/guides/publish']) assert.ok(!rules.some(rule => rule.source === publicPath));
});
test('platform returns public SEO routes to web without billing or app loops', () => {
  const rules = platformRedirects('https://synomilo.com');
  assert.ok(rules.some(rule => rule.source === '/guides/:path*'));
  for (const appPath of ['/', '/pricing', '/home/:path*', '/login']) assert.ok(!rules.some(rule => rule.source === appPath));
});
