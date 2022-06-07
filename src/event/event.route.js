const express = require("express");
const eventsRouter = express.Router();
const { createEvent,updateFromLink,getEvents ,getEventById,getEventByCategory,addUserToEvent,getEventByOrganizer,getEventByUserId,deleteEvent} = require("./event.controller");

const { creatingEvent } = require("./event.validate");
const { Event } = require("../models/Event");
const mongoose = require('mongoose');
const upload = require('../middleware/upload')



const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });



// eventsRouter.post(`/createEvent`, uploadOptions.single('image'), async (req, res) => {
//     //const category = await Event.findById(req.body.Event);
//     //if (!category) return res.status(400).send('Invalid Event');
//     // const eventExists = await Event.findOne({
//     //     title: req.body.title,
//     //   });
//     //   if (!eventExists) return res.status(400).send('Invalid Event');

//     const file = req.file;
//     if (!file) return res.status(400).send('No image in the request');

//     const fileName = file.filename;
//     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
//     let event = new Event({
//         title: req.body.title,
//         host: req.body.host,
//         date: req.body.date,
//         duration: req.body.duration,
//         creationDate: req.body.creationDate,
//         location: req.body.location,
//         maxPart: req.body.maxPart,
//         currentPart: req.body.currentPart,
//         rating: req.body.rating,
//         description: req.body.description,
//         datalink: req.body.datalink,
//         title: req.body.title,
//         image: `${basePath}${fileName}`, 





        
//     });

//     event = await event.save();

//     if (!event) return res.status(500).send('The event cannot be created');

//     res.send(event);
// });


/**
  * @swagger
  * tags:
  *   name: Events
  *   description: The events managing API
  */


 eventsRouter.put('/updateimage', upload.single('image'), async (req, res) => {
    // if (!mongoose.isValidObjectId(req.params.id)) {
    //     return res.status(400).send('Invalid event Id');
    // }
    const id = req.body;
    console.log(id.id)

   

    const event = await Event.findById(id.id);
    if (!event) return res.status(400).send('Invalid event!');

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        id.id,
        {
            
            image: imagepath,
           
        },
        { new: true }
    );
   // console.log(imagepath)

    if (!updatedEvent)
        return res.status(500).send('the event cannot be updated!');

    res.send(updatedEvent);
});


eventsRouter.put('/rating',  async (req, res) => {
    // if (!mongoose.isValidObjectId(req.params.id)) {
    //     return res.status(400).send('Invalid event Id');
    // }
    const {
        id,
        rateString,
    } = req.body;
    console.log("type of id is : " +typeof(id))
    console.log("type of rateString is : " +typeof(rateString))
    rate = parseInt(rateString)     
    console.log("type de rate est : " +typeof(rate))

   

    const event = await Event.findById(id);
    if (!event) return res.status(400).send('Invalid event!');

    

    

    const updatedEvent = await Event.findByIdAndUpdate(
        id,
        {
            
            rating: rate,
           
        },
        { new: true }
    );
   // console.log(imagepath)

    if (!updatedEvent)
        return res.status(500).send('the event cannot be updated!');

    res.send(updatedEvent);
});


// eventsRouter.put('/updateimage/:id', upload.single('image'), async (req, res) => {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).send('Invalid event Id');
//     }
   

//     const event = await Event.findById(req.params.id);
//     if (!event) return res.status(400).send('Invalid event!');

//     const file = req.file;
//     let imagepath;

//     if (file) {
//         const fileName = file.filename;
//         const basePath = `${req.protocol}://${req.get('host')}/uploads/`;
//         imagepath = `${basePath}${fileName}`;
//     } else {
//         imagepath = product.image;
//     }

//     const updatedEvent = await Event.findByIdAndUpdate(
//         req.params.id,
//         {
            
//             image: imagepath,
           
//         },
//         { new: true }
//     );
//    // console.log(imagepath)

//     if (!updatedEvent)
//         return res.status(500).send('the event cannot be updated!');

//     res.send(updatedEvent);
// });




/**
 * @swagger
 * /events/createEvent:
 *   post:
 *     tags: [Events]
 *     description: create event
 *     responses:
 *       201:
 *         description: event created
 *       400:
 *         description : event already exists
 * 
 */
    eventsRouter.post("/createEvent",creatingEvent,upload.single('image'), createEvent);
    //eventsRouter.post("/createEvent",upload.single('image'), createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags: [Events]
 *     description: modify event
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 * 
 */
eventsRouter.put("/:id", updateFromLink);

/**
 * @swagger
 * /events:
 *   get:
 *     tags: [Events]
 *     description: Get all events
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 * 
 */
eventsRouter.get("/", getEvents);


/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags: [Events]
 *     description: Get event by id
 *     parameters:
 *      - name: id
 *        description: organizer id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: event not found
 * 
 */
eventsRouter.get("/:id", getEventById);


/**
 * @swagger
 * /organizers/type/{category}:
 *   get:
 *     tags: [Events]
 *     description: Get event by category 
 *     parameters:
 *      - name: category
 *        description: category 
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: error
 * 
 */
eventsRouter.get("/type/:category", getEventByCategory);


/**
 * @swagger
 * /organizers/organizer/{id}:
 *   get:
 *     tags: [Events]
 *     description: Get event by organizer
 *     parameters:
 *      - name: id
 *        description: organizer id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: organizer not found
 * 
 */
eventsRouter.get("/organizer/:userId", getEventByOrganizer);

eventsRouter.get("/user/:userId", getEventByUserId);






eventsRouter.put("/participate/:id/:userId",addUserToEvent)


eventsRouter.delete("/:id", deleteEvent);

//add verifyToken on protected routes
module.exports = { eventsRouter };

