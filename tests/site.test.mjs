import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderPage, escapeHtml, validateContent } from '../src/render.mjs';

const source = JSON.parse(await readFile(new URL('../content/site.json', import.meta.url), 'utf8'));
const fresh = () => structuredClone(source);
const preview = () => renderPage(source, { origin: 'https://preview.example', production: false, year: 2026 });

test('renders contact, biography and service content as HTML without requiring browser JavaScript', () => {
  const { html } = preview();
  assert.ok(html.includes(source.about.intro));
  assert.match(html, /<h1 id="hero-title">/);
  assert.match(html, /<details class="service" id="communications" open>/);
  assert.match(html, /href="mailto:info@zamayirhapeter.co.za"/);
  assert.match(html, /href="tel:\+27796927931"/);
  for (const service of source.services) assert.ok(html.includes(escapeHtml(service.body)));
});

test('review deployment is not indexable and is canonical to its own review URL', () => {
  const { html, canonical } = preview();
  assert.equal(canonical, 'https://preview.example/');
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});

test('production rendering explicitly opts into the original domain', () => {
  const { html, canonical } = renderPage(source, { production: true });
  assert.equal(canonical, source.originalSite);
  assert.match(html, /name="robots" content="index, follow"/);
});

test('structured data identifies the real person and verified social profiles', () => {
  const person = JSON.parse(preview().structuredData);
  assert.equal(person['@type'], 'Person');
  assert.equal(person.name, source.name);
  assert.equal(person.url, source.originalSite);
  assert.deepEqual(person.sameAs, [source.contact.instagram, source.contact.linkedin, source.contact.facebook]);
  assert.equal(person.aggregateRating, undefined);
});

test('HTML content cannot inject script tags and JSON-LD cannot terminate its script element', () => {
  const site = fresh();
  site.name = '</script><script>alert(1)</script>';
  site.about.heading = '<img src=x onerror=alert(1)>';
  const result = renderPage(site);
  assert.ok(!result.html.includes('<script>alert(1)</script>'));
  assert.ok(result.html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!result.structuredData.includes('</script>'));
  assert.equal(JSON.parse(result.structuredData).name, site.name);
});

test('rejects executable URLs, credentials in URLs and non-local images', () => {
  for (const value of ['javascript:alert(1)', 'http://example.com/', 'https://user:password@example.com/']) {
    const site = fresh(); site.contact.instagram = value;
    assert.throws(() => validateContent(site));
  }
  const site = fresh(); site.hero.image = 'https://tracker.example/pixel';
  assert.throws(() => validateContent(site), /local WebP/);
});

test('rejects missing identity, invalid email and unsafe phone links', () => {
  const site = fresh(); site.name = '';
  assert.throws(() => validateContent(site), /required/);
  site.name = source.name; site.contact.email = 'invalid';
  assert.throws(() => validateContent(site), /email/);
  site.contact.email = source.contact.email; site.contact.phoneHref = 'javascript:alert(1)';
  assert.throws(() => validateContent(site), /telephone/);
});

test('rejects duplicate or injectable service anchors', () => {
  const site = fresh(); site.services[1].id = site.services[0].id;
  assert.throws(() => validateContent(site), /unique/);
  site.services[1].id = '\" onclick=\"alert(1)';
  assert.throws(() => validateContent(site), /safe/);
});

test('external links declare new tabs and isolate the opener', () => {
  const { html } = preview();
  const links = [...html.matchAll(/<a\b[^>]*href="https:[^>]+>/g)];
  assert.ok(links.length > 5);
  for (const [link] of links) {
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noopener noreferrer"/);
    assert.match(link, /opens in a new tab/);
  }
});

test('no form claims email delivery or a click as confirmed conversion', () => {
  const { html } = preview();
  assert.doesNotMatch(html, /<form\b/);
  assert.doesNotMatch(html, /contact_submission_succeeded|dataLayer|googletagmanager|fbq\(/);
});

test('browser enhancement has no telemetry transport or persistent storage', async () => {
  const script = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(script, /fetch\(|sendBeacon|localStorage|sessionStorage|document\.cookie/);
});
