
const { fork } = require('child_process');

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  let puppeteer = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    const puppeteerModule = await import('puppeteer');
    puppeteer = puppeteerModule.default || puppeteerModule;

    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (page) await page.close();
    if (browser) await browser.close();
    if (server) server.kill('SIGKILL');
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('#card-number-input');
  });

  test('Должен подсвечивать Visa и делать инпут valid при правильном номере по Луну', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('#card-number-input');

    const input = await page.$('#card-number-input');
    await input.type('4532715112955556');

    const isVisaActive = await page.$eval('.cards-list', (el) => el.classList.contains('visa-active'));
    expect(isVisaActive).toBe(true);

    const button = await page.$('#submit-btn');
    await button.click();

    const isValidClassAdded = await page.$eval('#card-number-input', (el) => el.classList.contains('valid'));
    expect(isValidClassAdded).toBe(true);
  });

  test('Должен красить инпут в invalid при ошибке в алгоритме Луна', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('#card-number-input');

    const input = await page.$('#card-number-input');
    await input.type('4532715112955553');

    const button = await page.$('#submit-btn');
    await button.click();

    const isInvalidClassAdded = await page.$eval('#card-number-input', (el) => el.classList.contains('invalid'));
    expect(isInvalidClassAdded).toBe(true);
  });
});
