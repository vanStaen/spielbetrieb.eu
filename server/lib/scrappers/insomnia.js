import puppeteer from 'puppeteer';

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://www.insomnia-berlin.de/partys.html', {
        waitUntil: "domcontentloaded",
    });

    //Scroll down
    await autoScroll(page);

    // Get page data
    const data = await page.evaluate(() => {
        const events = document.querySelectorAll(".row_aktuellePartys");
        const array = [];

        for (i = 0; i < events.length; i++) {
            const name = events[i].querySelector('img').alt.split(' @')[0];
            const tags = events[i].querySelector('img').alt.split(' @')[1]?.replace(/\s+/g, "").replace('INSOMNIANightclubBerlin-', '').replace('-Party', '').split(',');
            array.push({
                id: events[i].querySelector('a').href.split('id=')[1],
                img: events[i].querySelector('img').src,
                name: name,
                tags: tags,
                date: events[i].querySelector('.partyText > h3').innerHTML,
            })
        }

        return array;
    });

    console.log(data);
    await browser.close();

})();

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
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