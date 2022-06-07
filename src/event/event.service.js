//const { CustomEvent } = require("../models/CustomEvent");
const puppeteer = require("puppeteer");
const { Event } = require("../models/Event");
const { Organizer } = require("../models/Organizer");
const { User } = require("../models/User");


const create = async (
  title,
  host,
  date,
  duration,
  creationDate,
  location,
  maxPart,
  currentPart,
  rating,
  description,
  datalink,
  organizer,
  eventtype,
  image
) => {
  try {
    console.log('in service');
    const eventExists = await Event.findOne({
      title: title,
    });
    console.log("title is : " + title)
    const organizerExists = await Organizer.findById(organizer);
    if (eventExists || !organizerExists) {
      throw new Error("event exists or organizer doesn't exist");
    } else {
      var datenow = new Date();
      datenow = Date.now()
      let event = new Event({
        title: title,
        host: host,
        date: date,
        duration: duration,
        creationDate: datenow,
        location: location,
        maxPart: maxPart,
        currentPart: currentPart,
        rating: rating,
        description: description,
        datalink: datalink,
        organizer: organizer,
        eventtype: eventtype,
        image:image,
      });
      await event.save();

      
      Organizer.updateOne(
        {"_id" : organizer } ,
        { $push: { events: event } },
        {new: true , useFindAndModify: false},
        
      ).exec();
      console.log(organizer);
      console.log(event);


      return await Event.findOne({
        title: title,
      });
    }
  } catch (error) {
    throw error;
  }
};

const updateFromLink2 = async (datalink) => {
  try {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /* Go to the IMDB Movie page and wait for it to load */
    await page.goto(datalink, { waitUntil: "networkidle2" });

    /* Run javascript inside of the page */
    let data = await page.evaluate(() => {
      let title = document.querySelector(
        'div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"] > h1'
      ).innerText;
      let rating = document.querySelector(
        'div[class="AggregateRatingButton__Rating-sc-1ll29m0-2 bmbYRW"] > span'
      ).innerText;
      let description = document.querySelector(
        'p[class="GenresAndPlot__Plot-cum89p-6 bUyrda"] > span'
      ).innerText;

      /* Returning an object filled with the scraped data */
      return {
        title,
        rating,
        description,
      };
    });

    /* Outputting what we scraped */

    await browser.close();
  } catch (error) {
    throw error;
  }
};
const updateFromLink = async (id, input) => {
  try {
    console.log("Hello from service")
    let IMDB_URL = "test";
    const eventExists = await Event.findById(id);
    console.log(eventExists)
    if (!eventExists) {
      throw new Error("event not found");
    } else {
      for (const key in input) {
        if (input[key] !== undefined && input[key].length !== 0) {
          // the attributes to update are the strings with a positive length

          eventExists[key] = input[key];
          //IMDB_URL = input[key];
        }
      }
      //**************************************************** */

      console.log("Hello in updatefrom link service ");
      console.log(eventExists.datalink)

      IMDB_URL = eventExists.datalink;



      /* Initiate the Puppeteer browser */
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      /* Go to the IMDB Movie page and wait for it to load */
      await page.goto(IMDB_URL, { waitUntil: "networkidle2" });
      console.log("Before data  ")
      /* Run javascript inside of the page */
      let data = await page.evaluate(() => {
        let title = document.querySelector(
          'div[class="sc-94726ce4-1 iNShGo"] > h1'
        ).innerText;
        let rating = document.querySelector(
          'div[class="sc-7ab21ed2-2 kYEdvH"] > span'
        ).innerText;
        let description = document.querySelector(
          'p[class="sc-16ede01-6 cXGXRR"] > span'
        ).innerText;
        console.log(title)
        console.log(rating)
        console.log(description)

        /* Returning an object filled with the scraped data */
        return {
          title,
          rating,
          description,
        };
      });

      /* Outputting what we scraped */

      let titre = data.title;
      eventExists.title = titre;

      let rat = data.rating;
      eventExists.rating = parseInt(rat)  ;

      let desc = data.description;
      eventExists.description = desc;

      console.log(data.title);
      console.log(titre);

      //eventExists.title= titre;
      console.log(eventExists.title);

      await browser.close();

      //***************************************************** */

      await Event.findByIdAndUpdate(id, eventExists);
    }
  } catch (error) {
    throw error;
  }
};

// const store = (req, res, next) => {
//   //let news = new News(
//   //user: req.body.user,
//   //Description: req.body.Description,
//   //image: req.body.image,
//   //Title: req.body.Title,
//   // Date: req.body.Date
//   // )
//   async function eventScraped() {
//     try {
//       const URL = "https://www.imdb.com/title/tt1211837/";

//       const browser = await puppeteer.launch({
//         headless: true,
//         args: ["--no-sandbox"],
//       });
//       console.log("browser okayy");

//       const page = await browser.newPage();
//       console.log("page okayy");

//       await page.goto(URL);
//       console.log("web site okayy");

//       let data = await page.evaluate(() => {
//         let results = [];
//         let items = document.querySelectorAll(".block-article");
//         // console.log(items);
//         items.forEach((item) => {
//           results.push({
//             title: item.querySelector(
//               'div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"] > h1'
//             ).innerText,
//             rating: item.querySelector(
//               'div[class="AggregateRatingButton__Rating-sc-1ll29m0-2 bmbYRW"] > span'
//             ).innerText,
//             description: item.querySelector(
//               'p[class="GenresAndPlot__Plot-cum89p-6 bUyrda"] > span'
//             ).innerText,
//           });
//         });
//         return results;
//       });
//       res.json(data);
//       console.log(data);
//       await browser.close();
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   eventScraped()
//     .then((data) => {
//       console.log(data);
//       News.collection.insertMany(data, function (err, document) {
//         if (!err) {
//           return document;
//         } else {
//           return err;
//         }
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         message: "an error Occured!",
//         error,
//       });
//     });
// };

const getEvents = async () => {
  try {
    console.log("in get events service")
    return await Event.find();
    //return await Event.find().populate("organizer");
  } catch (error) {
    throw error;
  }
};

const getEventById = async (id) => {
  try {
    console.log(id);
    console.log("yoooooo");
    const doesEventExist = await Event.findById(id);
    //console.log("user id is :");
    console.log(doesEventExist);
    if (doesEventExist === undefined) throw new Error("Event not found");
    return doesEventExist;
  } catch (err) {
    throw new Error(err);
  }
};

const getEventByCategory = async (category) => {
  try {
    console.log(category.category);
    console.log("-------------");

    const doesEventExist = await Event.find({
      eventtype: { $in: [category.category] },
    });

    console.log(doesEventExist);
    if (doesEventExist === undefined) throw new Error("Event not found");
    return doesEventExist;
  } catch (err) {
    throw new Error(err);
  }
};



const addUserToEvent = async (id, userId) => {
  try {
    console.log("in service");
    const eventExists = await Event.findById(id);
    const userExists = await User.findById(userId);
    //console.log("user id : " + userId);
    //console.log("id : " + id);
    
    if (eventExists.users.includes(userId)) throw new Error("User already in event");
    
    //console.log("users in the event : " + eventExists.users)
    
    if (!eventExists || !userExists) {
      throw new Error("event or user not found");
    } else {
      Event.updateOne(
        { _id: id },
        { $push: { users: userExists } },
        { new: true, useFindAndModify: false }
      ).exec();

      User.updateOne(
        { _id: userId },
        { $push: { events: eventExists } },
        { new: true, useFindAndModify: false }
      ).exec();
      console.log("in service after update : ");
      console.log("event exist id :" + eventExists.id);
      console.log(eventExists);
    }
  } catch (error) {
    throw error;
  }
};

const getEventByOrganizer = async (userId) => {
  try {
    console.log(userId.userId);
    console.log("-------------");

    const doesEventExist = await Event.find({
      organizer: { $in: [userId.userId]}
      
    }).exec();
    console.log(doesEventExist);

    console.log(doesEventExist);
    if (doesEventExist === undefined) throw new Error("Event not found");
    return doesEventExist;
  } catch (err) {
    throw new Error(err);
  }
};

const getEventByUserId = async (userId) => {
  try {
    console.log(userId.userId);
    console.log("-------------");

    const doesEventExist = await Event.find({
      
      users: { $in: [userId.userId] }
      
    }).exec();
    console.log("hello")
    console.log(doesEventExist);

    
    if (doesEventExist === undefined) throw new Error("Event not found");
    return doesEventExist;
  } catch (err) {
    throw new Error(err);
  }
};



const deleteEvent = async (id) => { try {

  console.log("im in delete event service")
  const doesEventUserExist = await Event.findById(id)
  console.log(doesEventUserExist)
  console.log(doesEventUserExist.users.length)
  if (doesEventUserExist.users.length != 0 ) throw new Error("Event not found");
  await Event.findByIdAndRemove(id);
} catch (error) {
  throw error;
}
};


const  getOrganizerById = async(id)=>  {
  try {
    const doesOrganizerExist = await Organizer.findById(id);
    if (doesOrganizerExist === undefined) throw new Error("Organizer not found");
    return doesOrganizerExist;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  create,
  updateFromLink,
  getEvents,
  getEventById,
  getEventByCategory,
  addUserToEvent,
  getEventByOrganizer,
  getEventByUserId,
  deleteEvent
};




