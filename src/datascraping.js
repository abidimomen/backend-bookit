const puppeteer = require('puppeteer');

let  IMDB_URL = "https://www.imdb.com/title/tt7097896/?ref_=nv_sr_srsg_0";

const getLinkData = async (IMDB_URL) => {
  
  
  try {
    /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(IMDB_URL, { waitUntil: 'networkidle2' });
 
  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {

    let title = document.querySelector('div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"] > h1').innerText
    let rating = document.querySelector('div[class="AggregateRatingButton__Rating-sc-1ll29m0-2 bmbYRW"] > span').innerText
    let description = document.querySelector('p[class="GenresAndPlot__Plot-cum89p-6 bUyrda"] > span').innerText

    /* Returning an object filled with the scraped data */
    return {
      title,
      rating,
      description
    }

  });

  /* Outputting what we scraped */


  console.log(data);
  
  await browser.close();
  } catch (error) {
    //throw error;
    console.log("Link is not valid");
    
  }
  
  (async () => {
    try {
      await getLinkData();
    } catch (error) {
      console.log(error);
    }
    
    
   
    
  })();
};