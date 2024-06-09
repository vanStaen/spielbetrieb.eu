import puppeteer from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";

import insertEventIntoDB from "./helpers/insertEventIntoDB.js";
import getTags from "./helpers/getTags.js";
import nameParser from "./helpers/nameParser.js";

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
      const externalId = events[i].querySelector("a").href.split("id=")[1];
      const externalPicture = events[i].querySelector("img").src;
      // const title = events[i].querySelector("img").alt.split(" @")[0];
      const link = events[i]
        .querySelector("a")
        .href.replace("lang=en", "lang=de");
      const tags = events[i]
        .querySelector("img")
        .alt.split(" @")[1]
        ?.replace(/\s+/g, "")
        .replace("INSOMNIANightclubBerlin-", "")
        .replace("-Party", "")
        .split(",");
      const fromDate = events[i].querySelector(".partyText > h3").innerHTML;

      // Add event to array
      array.push({
        externalId,
        externalPicture,
        tags,
        fromDate,
        link,
      });
    }
    return array;
  });

  const events = [];
  // Iterate through the data
  for (let i = 0; i < data.length; i++) {
    // Open link
    await page.goto(data[i].link + "&lang=de", {
      waitUntil: "domcontentloaded",
    });

    const event = await page.evaluate(() => {
      const title = document
        .querySelector(".party_head > .h2")
        .innerHTML.split("</div>")[1];
      const fromTime = document
        .querySelectorAll(".panel-body")[6]
        .innerHTML.split("ab")[1]
        .replaceAll(/ /g, "")
        .replace("Uhr</h3>", "");
      const description = document
        .querySelectorAll(".teaserbox")[1]
        .innerHTML.split('<div class="clear"></div>')[1]
        .replaceAll("</div>", "")
        .replaceAll("<br>", " ")
        .replaceAll("&amp;", "&");
      return { title, fromTime, description };
    });

    const externalId = data[i].externalId;
    const externalPicture = data[i].externalPicture;
    const link = data[i].link;
    const tags = data[i].tags;
    const fromDate = data[i].fromDate;
    events.push({
      ...event,
      externalId,
      externalPicture,
      link,
      tags,
      fromDate,
    });
  }

  // Export results to Json file
  const content = JSON.stringify(events);
  fs.writeFile(
    `./exports/${dayjs().format("MM_DD")}_insomnia.json`,
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );

  await browser.close();

  // GetTags
  const tagData = await getTags();

  // Add event into db
  for (const dataEvent of events) {
    const links = [dataEvent.link];
    const eventTags = dataEvent.tags
      ? dataEvent.tags
          .map((tag) => {
            const result = tagData.filter(
              (data) => nameParser(data.name, "en") === tag,
            );
            if (result.length === 1) {
              return result[0].id;
            } else {
              return undefined;
            }
          })
          .filter(Boolean)
      : [];

    const fromDateSplit = dataEvent.fromDate.split(".");
    const fromTime = dataEvent.fromTime;
    const dateBerlinUTC = new Date(
      `2024-${fromDateSplit[1]}-${fromDateSplit[0]}T${fromTime}:00.000+02:00`,
    );
    const fromDateNew = new Date(dateBerlinUTC);

    const dataEventNew = {
      ...dataEvent,
      eventtype: 42, // Play&Dance
      fromDate: fromDateNew,
      untilDate: fromDateNew,
      location: LOCATION_ID,
      locationName: LOCATION_NAME,
      locationAddress: LOCATION_ADDRESS,
      locationCoordinates: LOCATION_COORDINATES,
      links,
      eventTags,
      validated: true,
    };

    delete dataEventNew.tags;
    delete dataEventNew.link;
    delete dataEventNew.fromTime;

    await insertEventIntoDB(dataEventNew);
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
