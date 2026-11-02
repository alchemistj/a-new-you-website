// Usage: node shoot.cjs <baseUrl> <outDir> <pathsFile>
// Takes above-the-fold and full-page screenshots at 390 and 1440 for each path.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [base, outDir, pathsFile] = process.argv.slice(2);
const paths = fs.readFileSync(pathsFile, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  { name: 'm', width: 390, height: 844, mobile: true },
  { name: 'd', width: 1440, height: 900, mobile: false },
];

(async () => {
  const browser = await chromium.launch();
  for (const size of sizes) {
    const ctx = await browser.newContext({
      viewport: { width: size.width, height: size.height },
      deviceScaleFactor: 1,
      isMobile: size.mobile,
      hasTouch: size.mobile,
      userAgent: 'Mozilla/5.0 (FF design QA)',
    });
    const page = await ctx.newPage();
    for (const p of paths) {
      const label = (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '__')) + '-' + size.name;
      try {
        await page.goto(base + p, { waitUntil: 'networkidle', timeout: 45000 });
      } catch (e) {
        console.log('WARN', p, size.name, String(e).slice(0, 120));
      }
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(outDir, label + '-fold.jpg'), type: 'jpeg', quality: 60 });
      await page.screenshot({ path: path.join(outDir, label + '-full.jpg'), type: 'jpeg', quality: 45, fullPage: true });
      console.log('ok', label);
    }
    await ctx.close();
  }
  await browser.close();
})();
