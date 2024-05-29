import puppeteer from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";

import insertEventIntoDB from "./helpers/insertEventIntoDB.js";
import getDresscodes from "./helpers/getDresscodes.js";
import nameParser from "./helpers/nameParser.js";

const months = {
  Januar: "01",
  Fabruar: "02",
  März: "03",
  April: "04",
  Mai: "05",
  Juni: "06",
  Juli: "07",
  August: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Dezember: "12",
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
  await page.goto("https://joyclub.com/de/party/veranstaltungen/2838983.stolz_und_demut.html", {
    waitUntil: "domcontentloaded",
  });

  // wait until selector appears
  await page.waitForSelector(".event_list");

  // Get page data
  const links = await page.evaluate(() => {
    const events = document.querySelectorAll(
      ".event_list > li",
    );
    const array = [];

    // Every 2nd Li should have a link
    for (let i = 0; i < events.length; i++) {
      const link = events[i].querySelector(".panel-body > .event_picture")?.querySelector("a")?.href;
      const title = events[i].querySelector(".panel-body > .event_content > .spacer_ribbon > .event_name")?.querySelector("a")?.innerHTML;
      link && array.push({ link, title });
    }
    return array;
  });

  const events = [];
  // Iterate through the links
  for (let i = 0; i < links.length; i++) {
    // Open link
    await page.goto(links[i].link, {
      waitUntil: "domcontentloaded",
    });

    const event = await page.evaluate(() => {
      const fromDate = document.querySelector(".event-time").innerHTML.split("<br>")[0];
      const description = document.querySelector(".event_description").innerHTML;
      const dresscode = document.querySelectorAll(".event_info_section")[1].querySelector("p").innerHTML.replaceAll(/ /g, "").split(",");
      return { fromDate, description, dresscode };
    });

    let link = links[i].link;
    let title = links[i].title;
    let externalId = links[i].link.split("/")[4].split('.')[0];
    events.push({ ...event, link, title, externalId });
  }

  // Export results to Json file
  const content = JSON.stringify(events);
  fs.writeFile(
    `./exports/${dayjs().format("MM_DD")}_stolzdemut.json`,
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );

  await browser.close();

  // GetDresscodes
  const dresscodeData = await getDresscodes();

  // Add event into db
  for (const dataEvent of events) {
    if (dataEvent.fromDate) {

      const dateCleaned = dataEvent.fromDate.split(/ /g);
      const day = dateCleaned[1] < 10 ? `0${dateCleaned[1]}` : dateCleaned[1];
      const month = months[dateCleaned[2]];
      const year = dateCleaned[3];
      const hour = dateCleaned[6];
      const dateBerlinUTC = new Date(
        `${year}-${month}-${day}T${hour}:00.000+02:00`,
      );

      const titleCleaned = dataEvent.title
        .replaceAll("<br>", "")
        .replaceAll("&amp;", "&");
      const descriptionCleaned = dataEvent.description
        .replace(/(<([^>]+)>)/gi, "")
        .replaceAll("&amp;", "&");
      const links = [dataEvent.link];

      const hasDresscode = dataEvent.dresscode.length;
      const dresscodeDoTags = dataEvent.dresscode
        ? dataEvent.dresscode
          .map((dresscode) => {
            const result = dresscodeData.filter(
              (data) => nameParser(data.name, "en") === dresscode,
            );
            if (result.length === 1) {
              return result[0].id;
            } else {
              return undefined;
            }
          })
          .filter(Boolean)
        : [];

      const dataEventNew = {
        ...dataEvent,
        eventtype: 40, // PlayParty
        fromDate: dateBerlinUTC,
        untilDate: dateBerlinUTC,
        location: LOCATION_ID,
        locationName: LOCATION_NAME,
        locationAddress: LOCATION_ADDRESS,
        locationCoordinates: LOCATION_COORDINATES,
        title: titleCleaned,
        description: descriptionCleaned,
        hasDresscode,
        dresscodeDoTags,
        links,
      };

      delete dataEventNew.dresscode;
      delete dataEventNew.link;

      await insertEventIntoDB(dataEventNew);
    }
  }
})();
