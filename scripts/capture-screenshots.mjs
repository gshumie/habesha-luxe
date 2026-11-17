import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://habesha-luxe.vercel.app';
const OUT_DIR = path.resolve(process.cwd(), 'docs', 'screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    // 1. Hero & Collections
    console.log('1. Loading Storefront Hero & Collections...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait for images to load
    await new Promise((r) => setTimeout(r, 2000));
    const heroPath = path.join(OUT_DIR, 'hero-and-collections.png');
    await page.screenshot({ path: heroPath });
    console.log('Saved:', heroPath);

    // 2. Bridal & Couture (Product catalog)
    console.log('2. Scrolling to Product Catalog...');
    await page.evaluate(() => {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo(0, 850);
    });
    await new Promise((r) => setTimeout(r, 2000));
    const bridalPath = path.join(OUT_DIR, 'bridal-and-couture.png');
    await page.screenshot({ path: bridalPath });
    console.log('Saved:', bridalPath);

    // 3. Brand Story & Shemane Heritage
    console.log('3. Scrolling to Brand Story & Heritage Section...');
    await page.evaluate(() => {
      const el = document.getElementById('about-atiye-ethiopia');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo(0, 2400);
    });
    await new Promise((r) => setTimeout(r, 2000));
    const storyPath = path.join(OUT_DIR, 'brand-story-heritage.png');
    await page.screenshot({ path: storyPath });
    console.log('Saved:', storyPath);

    // 4. Admin Portal Login
    console.log('4. Loading Admin Portal Login...');
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    const adminPath = path.join(OUT_DIR, 'admin-portal.png');
    await page.screenshot({ path: adminPath });
    console.log('Saved:', adminPath);

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Screenshot error:', err);
  } finally {
    await browser.close();
  }
}

run();
