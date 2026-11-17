import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://habesha-luxe.vercel.app';
const OUT_DIR = path.resolve(process.cwd(), 'docs', 'screenshots');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    // 1. Admin Login & Dashboard
    console.log('Navigating to Admin Login...');
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));

    // Fill credentials
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await emailInput.click({ clickCount: 3 });
      await emailInput.type('getasewshumie@gmail.com');
    }

    const passwordInput = await page.$('input[type="password"]');
    if (passwordInput) {
      await passwordInput.type('SetYourStrongPassword2025!');
    }

    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      console.log('Submitting login...');
      await submitBtn.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 2000));

      const dashboardPath = path.join(OUT_DIR, 'admin-dashboard.png');
      await page.screenshot({ path: dashboardPath });
      console.log('Saved:', dashboardPath);
    }
  } catch (err) {
    console.error('Admin capture error:', err);
  } finally {
    await browser.close();
  }
}

run();
