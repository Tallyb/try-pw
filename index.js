const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  await browser.startTracing();
  const context = await browser.newContext();
  await context.tracing.start({screenshots: true, snapshots: true})

  const page = await context.newPage();
  await page.goto('https://demo.testim.io/');

  await page.click('button >> text="Log in"');

  await page.fill('form[id="login"] >> input[type="text"]', 'demo')
  await page.fill('form[id="login"] >> input[type="password"]', 'demo')

  await page.click('form[id="login"] >> button[type="submit"]')
  await page.waitForSelector('header >> text="Hello, John"')

  await page.screenshot({ path: `demo.png` });
  
  await context.tracing.stop({path: 'trace.zip'});
  await browser.close();
})();

