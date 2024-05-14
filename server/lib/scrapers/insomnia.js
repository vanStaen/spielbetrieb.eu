import puppeteer from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";

import insertEventIntoDB from "./helpers/insertEventIntoDB.js";

const LOCATION_ID = 8;
const LOCATION_NAME = "Insomnia";
const LOCATION_ADDRESS = "Alt-Tempelhof 17-19, 12099 Berlin";
const LOCATION_COORDINATES = "52.46570767175525, 13.386162665015354";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://www.insomnia-berlin.de/partys.html", {
    waitUntil: "domcontentloaded",
  });

  // Scroll down
  await autoScroll(page);

  // Get page data
  const data = await page.evaluate(() => {
    const events = document.querySelectorAll(".row_aktuellePartys");
    const array = [];

    for (let i = 0; i < events.length; i++) {
      const id = events[i].querySelector("a").href.split("id=")[1];
      const img = events[i].querySelector("img").src;
      const name = events[i].querySelector("img").alt.split(" @")[0];
      const tags = events[i]
        .querySelector("img")
        .alt.split(" @")[1]
        ?.replace(/\s+/g, "")
        .replace("INSOMNIANightclubBerlin-", "")
        .replace("-Party", "")
        .split(",");
      const date = events[i].querySelector(".partyText > h3").innerHTML;
      // Add event to array
      array.push({ id, img, name, tags, date });
    }
    return array;
  });

  // Export results to Json file
  const content = JSON.stringify(data);
  fs.writeFile(
    `./exports/${dayjs().format("MM_DD")}_insomia_parties.json`,
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );

  await browser.close();

  // Add event into db
  for (const dataEvent of data) {
    await insertEventIntoDB(dataEvent, {
      location: LOCATION_ID,
      locationName: LOCATION_NAME,
      locationAddress: LOCATION_ADDRESS,
      locationCoordinates: LOCATION_COORDINATES,
    });
  }
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}
