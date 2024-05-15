import puppeteer from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";

import insertEventIntoDB from "./helpers/insertEventIntoDB.js";

const LOCATION_ID = 1;
const LOCATION_NAME = "KitKatClub";
const LOCATION_ADDRESS = "Köpenicker Straße 76, Brückenstraße 1, 10179 Berlin";
const LOCATION_COORDINATES = "52.51129317759199, 13.41676440644593";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://kitkatclub.org/Home/Club/Termine/Index.html", {
    waitUntil: "domcontentloaded",
  });

  // wait until selector appears
  await page.waitForSelector(".LinkeSpalte");

  // Get page data
  const data = await page.evaluate(() => {
    const events = document.querySelectorAll(
      ".LinkeSpalte > .KategorieBlock > form > table > tbody > tr",
    );
    const array = [];

    // Skip first <tr>
    for (let i = 1; i < events.length; i++) {
      const datum = events[i]
        .querySelector(".ClubTermineDatum")
        ?.innerHTML.split("<br>")[1]
        .replace("&nbsp;", "");
      const fromTime = events[i]
        .querySelector(".ClubTermineDatum")
        ?.innerHTML.split("<br>")[2]
        .replace("\n\tab ", "")
        .replace("\n\t", "");
      const name = events[i].querySelector(".ClubTermineTitel")?.innerHTML;
      const text1 = events[i]
        .querySelectorAll(".ClubTermineText")[0]
        ?.innerHTML.split(":</span> ")[1];
      const text2 = events[i]
        .querySelectorAll(".ClubTermineText")[1]
        ?.innerHTML.split("</span> ")[1];
      const text3 = events[i]
        .querySelectorAll(".ClubTermineText")[2]
        ?.innerHTML.split("</span> ")[1];
      const text4 = events[i]
        .querySelectorAll(".ClubTermineText")[3]
        ?.innerHTML.split("</span> ")[1];
      const desc = [text1, text2, text3, text4]
        .join(" ")
        .trim()
        .replace(">br/>", " ");
      array.push({ datum, fromTime, name, desc });
    }
    return array;
  });

  // Export results to Json file
  const content = JSON.stringify(data);
  fs.writeFile(
    `./exports/${dayjs().format("MM_DD")}_kitty.json`,
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
