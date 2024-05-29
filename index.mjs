import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1920, height: 1080 },
  slowMo: 250,
});
const page = await browser.newPage();
try {
  await page.goto("https://google.com", {
    waitUntil: "networkidle2",
    timeout: 40000,
  });
  await page.type('textarea[name="q"]', "Javascript");
  await page.keyboard.press("Enter");

  await page.waitForSelector(".main");

  const searchResults = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll(".g").forEach((result) => {
      const title = result.querySelector("h3").innerText;
      const url = result.querySelector("a").href;
      results.push({ title, url });
    });
    return results;
  });

  searchResults.forEach((result, index) => {
    console.log(
      `Result ${index + 1}:\nTitle: ${result.title}\nURL: ${result.url}\n`
    );
  });

  await browser.close();
} catch (error) {
  console.log(error);
}
