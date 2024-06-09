import puppeteer from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";

// import insertEventIntoDB from "./helpers/insertEventIntoDB.js";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://dice.fm/promoters/klub-verboten-672q", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const data = await page.evaluate(() => {
    const events = document.querySelectorAll(
      ".EventParts__EventBlock-sc-db999af1-9",
    );
    const array = [];

    for (let i = 0; i < events.length; i++) {
      const link = events[i].querySelector("a").href;
      const externalId = link.split("dice.fm/event/")[1].split("-")[0];
      // Add event to array
      array.push({
        link,
        externalId,
      });
    }
    return array;
  });

  await browser.close();

  const events = [];
  // Iterate through the data
  for (let i = 0; i < data.length; i++) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();

    // Open link
    await page.goto(data[i].link, {
      waitUntil: "domcontentloaded",
    });

    const event = await page.evaluate(async () => {
      const title = document.querySelector(
        ".EventDetailsTitle__Container-sc-8ebcf47a-5 > .EventDetailsTitle__Title-sc-8ebcf47a-0",
      ).innerHTML;
      const externalPicture = document
        .querySelector(".EventDetailsImage__Container-sc-869461fe-0 > img")
        .srcset.split(" 1x")[0];
      const fromDate = document.querySelector(
        ".EventDetailsTitle__Date-sc-8ebcf47a-2",
      ).innerHTML;
      const readmore = document.querySelector(
        ".TruncatedMarkdown__MoreButton-sc-3744924d-1",
      );
      await readmore.click();
      const description = document
        .querySelector(".EventDetailsAbout__Container-sc-6411bf4-2")
        .innerHTML.replaceAll("</div>", "")
        .replaceAll("<br>", " ")
        .replaceAll("&amp;", "&")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "");
      return { title, externalPicture, fromDate, description };
    });

    await browser.close();

    const link = data[i].link;
    const externalId = data[i].externalId;
    events.push({
      ...event,
      link,
      externalId,
    });
  }

  // Export results to Json file
  const content = JSON.stringify(events);
  fs.writeFile(
    `./exports/${dayjs().format("MM_DD")}_klubverboten.json`,
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );

  // Add event into db
  /* 
  for (const dataEvent of events) {
    const links = [dataEvent.link];
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
      links,
      eventTags,
      validated: false,
    };

    delete dataEventNew.tags;
    delete dataEventNew.link;

    await insertEventIntoDB(dataEventNew); 
  }
  */
})();
