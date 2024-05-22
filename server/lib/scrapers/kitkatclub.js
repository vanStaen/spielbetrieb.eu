import puppeteer from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";

import insertEventIntoDB from "./helpers/insertEventIntoDB.js";

const months = {
  Jan: "01",
  Feb: "02",
  Mär: "03",
  Mar: "03",
  Apr: "04",
  May: "05",
  Mai: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Okt: "10",
  Nov: "11",
  Dec: "12",
  Dez: "12",
};

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
      const title = events[i].querySelector(".ClubTermineTitel")?.innerHTML;
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
      const description = [text1, text2, text3, text4].join(" ").trim();
      array.push({ datum, fromTime, title, description });
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
    if (dataEvent.datum) {
      const externalId = dataEvent.datum + dataEvent.title.replaceAll(/ /g, "");
      const day = dataEvent.datum.split(".")[0];
      const month = months[dataEvent.datum.split(".")[1]];
      const hour = dataEvent.fromTime.split("h")[0];

      const dateBerlinUTC = new Date(
        `2024-${month}-${day}T${hour}:00:00.000+02:00`,
      );
      const fromDateNew = new Date(dateBerlinUTC);

      const titleCleaned = dataEvent.title
        .replaceAll("<br>", "")
        .replaceAll("&amp;", "&");
      const descriptionCleaned = dataEvent.description
        .replaceAll("<br>", " ")
        .replaceAll("&amp;", "&");

      const dataEventNew = {
        ...dataEvent,
        eventtype: 42, // Play&Dance
        fromDate: fromDateNew,
        untilDate: fromDateNew,
        location: LOCATION_ID,
        locationName: LOCATION_NAME,
        locationAddress: LOCATION_ADDRESS,
        locationCoordinates: LOCATION_COORDINATES,
        externalId,
        title: titleCleaned,
        description: descriptionCleaned,
      };

      delete dataEventNew.datum;
      delete dataEventNew.fromTime;

      await insertEventIntoDB(dataEventNew);
    }
  }
})();
