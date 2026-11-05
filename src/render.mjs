export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

export function validateContent(site) {
  for (const value of [site.name, site.title, site.description, site.hero?.firstName, site.about?.heading]) {
    if (typeof value !== 'string' || !value.trim()) throw new Error('Missing required content');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contact?.email)) throw new Error('Invalid contact email');
  if (!/^\+\d{10,15}$/.test(site.contact?.phoneHref)) throw new Error('Invalid telephone link');
  for (const value of [site.contact.instagram, site.contact.linkedin, site.contact.facebook, site.originalSite, ...Object.values(site.sources)]) {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Only public HTTPS links are allowed');
  }
  const ids = new Set();
  if (!site.services?.length || !site.work?.items?.length) throw new Error('Services and work must not be empty');
  for (const service of site.services) {
    if (!/^[a-z][a-z-]+$/.test(service.id) || ids.has(service.id)) throw new Error('Service IDs must be unique and safe');
    ids.add(service.id);
  }
  for (const path of [site.hero.image, site.hero.mobileImage, site.about.image, ...site.work.items.map(item => item.image)]) {
    if (!/^\/assets\/[a-z0-9-]+\.webp$/.test(path)) throw new Error('Images must be local WebP assets');
  }
  return site;
}

const arrow = '<span aria-hidden="true">↗</span>';
const out = 'target="_blank" rel="noopener noreferrer"';

export function renderPage(site, { origin, production = false, year = new Date().getUTCFullYear() } = {}) {
  validateContent(site);
  const e = escapeHtml;
  const imageOrigin = origin || site.originalSite.replace(/\/$/, '');
  const canonical = production ? site.originalSite : `${imageOrigin}/`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Person', name: site.name,
    url: site.originalSite, image: `${imageOrigin}${site.hero.image}`,
    jobTitle: ['Communications consultant', 'Multimedia journalist', 'Speaker', 'Moderator'],
    sameAs: [site.contact.instagram, site.contact.linkedin, site.contact.facebook]
  }).replace(/</g, '\\u003c');

  const html = `<!doctype html>
<html lang="en-ZA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(site.title)}</title>
  <meta name="description" content="${e(site.description)}">
  <meta name="robots" content="${production ? 'index, follow' : 'noindex, nofollow'}">
  <meta name="theme-color" content="#191b18">
  <link rel="canonical" href="${e(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${e(site.title)}">
  <meta property="og:description" content="${e(site.description)}">
  <meta property="og:url" content="${e(canonical)}">
  <meta property="og:image" content="${e(imageOrigin + site.hero.image)}">
  <meta property="og:image:alt" content="${e(site.hero.alt)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="preload" as="image" href="${e(site.hero.image)}" media="(min-width: 641px)" fetchpriority="high">
  <link rel="preload" as="image" href="${e(site.hero.mobileImage)}" media="(max-width: 640px)" fetchpriority="high">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${structuredData}</script>
  <script src="/app.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <main id="main">
    <section class="hero" id="home" aria-labelledby="hero-title">
      <picture class="hero-media">
        <source media="(max-width: 640px)" srcset="${e(site.hero.mobileImage)}">
        <img src="${e(site.hero.image)}" width="940" height="788" alt="${e(site.hero.alt)}" fetchpriority="high">
      </picture>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-frame" aria-hidden="true"></div>
      <header class="site-header">
        <a class="brand" href="#home" aria-label="Zamayirha Peter home">zp<span class="brand-dot" aria-hidden="true">.</span></a>
        <span class="header-intro">A voice with purpose.<br>A world of possibility.</span>
        <nav class="main-nav" aria-label="Main navigation">
          <a href="#about">About</a><a href="#work">The work</a><a href="#services">Expertise</a><a href="#contact">Let’s talk ${arrow}</a>
        </nav>
      </header>
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow">${e(site.hero.eyebrow)}</p>
        <h1 id="hero-title"><span class="hero-first">${e(site.hero.firstName)}</span><span class="hero-last">${e(site.hero.lastName)}</span></h1>
        <p class="hero-description">${e(site.hero.description)}</p>
      </div>
      <div class="hero-bottom">
        <a class="hero-discover" href="#about"><span class="scroll-icon" aria-hidden="true">↓</span><span>Discover her world</span></a>
        <a class="hero-email" href="mailto:${e(site.contact.email)}">${e(site.contact.email)}</a>
        <a class="hero-social" href="${e(site.contact.instagram)}" ${out} aria-label="Instagram: ${e(site.contact.instagramLabel)} (opens in a new tab)">${e(site.contact.instagramLabel)} ${arrow}</a>
        <a class="hero-phone" href="tel:${e(site.contact.phoneHref)}">${e(site.contact.phone)}</a>
      </div>
    </section>

    <section class="about section-shell" id="about" aria-labelledby="about-title">
      <div class="section-label"><span>01 / Meet Zamayirha</span><span class="small-star" aria-hidden="true">✳</span></div>
      <div class="about-grid">
        <div class="about-portrait"><img src="${e(site.about.image)}" alt="${e(site.about.alt)}" width="960" height="960" loading="lazy"><span class="portrait-note">Storyteller. Strategist. Human.</span></div>
        <div class="about-copy">
          <p class="eyebrow muted">${e(site.about.label)}</p>
          <h2 id="about-title">${e(site.about.heading)}</h2>
          <p class="intro-text">${e(site.about.intro)}</p>
          <p class="body-text">${e(site.about.body)}</p>
          <a class="text-link" href="${e(site.sources.about)}" ${out} aria-label="Read more about Zamayirha (opens in a new tab)">A little more about me ${arrow}</a>
        </div>
      </div>
      <div class="experience-strip"><p>Experience across<br>print & broadcast</p><ul aria-label="Publications and broadcasters">${site.experience.map(name => `<li>${e(name)}</li>`).join('')}</ul></div>
    </section>

    <section class="work section-shell" id="work" aria-labelledby="work-title">
      <div class="section-label"><span>02 / A world of stories</span><span>Listen. Connect. Move.</span></div>
      <div class="work-heading"><h2 id="work-title">${e(site.work.heading).replace(/\n/g, '<br>')}</h2><p>${e(site.work.intro)}</p></div>
      <div class="work-grid">${site.work.items.map((item, i) => `
        <article class="work-item">
          <a class="work-image-link" href="${e(site.sources.experience)}" ${out} aria-label="Explore ${e(item.category.toLowerCase())} on Zamayirha’s original site (opens in a new tab)">
            <div class="work-image work-image-${i}"><img src="${e(item.image)}" alt="${e(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy"><span class="image-arrow" aria-hidden="true">↗</span></div>
          </a>
          <div class="work-category"><span>${e(item.category)}</span><span>0${i + 1}</span></div>
          <h3>${e(item.title)}</h3><p>${e(item.description)}</p>
        </article>`).join('')}
      </div>
      <a class="text-link work-more" href="${e(site.sources.experience)}" ${out} aria-label="Explore the full experience on Zamayirha’s original site (opens in a new tab)">Explore the full experience ${arrow}</a>
    </section>

    <section class="services section-shell" id="services" aria-labelledby="services-title">
      <div class="section-label"><span>03 / How we can work together</span><span class="small-star" aria-hidden="true">✳</span></div>
      <div class="services-grid"><div class="services-heading"><p class="eyebrow muted">Different disciplines. One purpose.</p><h2 id="services-title">Your story.<br>Let’s give<br>it a voice.</h2><a class="text-link" href="#contact">Start a conversation ${arrow}</a></div>
      <div class="service-list">${site.services.map((service, i) => `
        <details class="service" id="${e(service.id)}" ${i === 0 ? 'open' : ''}>
          <summary><span class="service-number">0${i + 1}</span><span class="service-name">${e(service.title)}</span><span class="service-toggle" aria-hidden="true"></span></summary>
          <div class="service-body"><p class="service-summary">${e(service.summary)}</p><p>${e(service.body)}</p><ul class="service-tags">${service.tags.map(tag => `<li>${e(tag)}</li>`).join('')}</ul><a class="text-link" href="mailto:${e(site.contact.email)}?subject=${encodeURIComponent('Enquiry: ' + service.title)}">Let’s talk ${arrow}</a></div>
        </details>`).join('')}</div></div>
    </section>

    <section class="manifesto" aria-labelledby="manifesto-title"><p class="eyebrow">A little perspective</p><blockquote><p id="manifesto-title">“${e(site.quote)}”</p><cite>— Zamayirha Peter</cite></blockquote><span class="manifesto-star" aria-hidden="true">✳</span></section>

    <section class="contact section-shell" id="contact" aria-labelledby="contact-title">
      <div class="section-label"><span>04 / The next chapter</span><span>Begins with a conversation</span></div>
      <div class="contact-top"><h2 id="contact-title">Let’s make<br><span>it matter.</span></h2><a class="contact-orb" href="mailto:${e(site.contact.email)}" aria-label="Email Zamayirha Peter"><span aria-hidden="true">↗</span></a></div>
      <div class="contact-details"><div><p>For collaborations, conversations<br>and ideas with somewhere to go.</p></div><div><span class="contact-label">Say hello</span><a class="contact-email" href="mailto:${e(site.contact.email)}">${e(site.contact.email)}</a><a class="contact-number" href="tel:${e(site.contact.phoneHref)}">${e(site.contact.phone)}</a></div><div class="social-links"><span class="contact-label">Elsewhere</span><a href="${e(site.contact.instagram)}" ${out} aria-label="Instagram (opens in a new tab)">Instagram ${arrow}</a><a href="${e(site.contact.linkedin)}" ${out} aria-label="LinkedIn (opens in a new tab)">LinkedIn ${arrow}</a><a href="${e(site.contact.facebook)}" ${out} aria-label="Facebook (opens in a new tab)">Facebook ${arrow}</a></div></div>
      <footer class="site-footer"><a class="footer-brand" href="#home">Zamayirha Peter<span aria-hidden="true">.</span></a><span>© ${year} Zamayirha Peter</span><button class="privacy-button" type="button" data-open-privacy>Privacy</button><a class="back-top" href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>
    </section>
  </main>
  <dialog class="privacy-dialog" id="privacy-dialog" aria-labelledby="privacy-title"><div class="dialog-heading"><h2 id="privacy-title">Your privacy</h2><button class="dialog-close" type="button" data-close-privacy aria-label="Close privacy notice">×</button></div><p>This homepage does not use analytics, advertising cookies, tracking pixels or embedded social feeds. Images are served with the website.</p><p>Email and telephone links open your chosen app. Social and biography links take you to separate websites with their own privacy policies. The hosting service may process technical request data to deliver and secure the page.</p><p>For a privacy enquiry, contact <a href="mailto:${e(site.contact.email)}">${e(site.contact.email)}</a>.</p></dialog>
</body>
</html>`;
  return { html, structuredData, canonical };
}
