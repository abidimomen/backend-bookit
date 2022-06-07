const eventService = require("./event.service.js");
//const multer = require("multer");
// const multer = require('multer');

// const FILE_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpeg',
//   'image/jpg': 'jpg',
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       const isValid = FILE_TYPE_MAP[file.mimetype];
//       let uploadError = new Error('invalid image type');

//       if (isValid) {
//           uploadError = null;
//       }
//       cb(uploadError, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//       const fileName = file.originalname.split(' ').join('-');
//       const extension = FILE_TYPE_MAP[file.mimetype];
//       cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });




const createEvent = async (req, res) => {
  console.log("im in the create event method controller");
 

 

  

  

  const {
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
    image,  
  } = req.body;
  
 
  
  console.log("type de id organizer")
  console.log(typeof(organizer));
  
  try {
    const payload = await eventService.create(
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
    );
    if(req.file){
    payload.image = req.file.path
    //payload.image = `http://localhost:3000/${req.file.path}`
    }
    console.log(payload.datalink);
    return res.status(200).send({payload})
    // return res.status(201).json({
    //   data: {payload},
    //   message: "Event created",
    // });
  } catch (error) {
    if (String(error).includes("event exists")) {
      return res.status(400).json({
        error: true,
        message: "event exists ",
      });
    }
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const payload = await eventService.getEvents();
    return res.status(200).json({
      data: payload,
      message: "list all events",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const updateFromLink = async (req, res) => {
  const { id } = req.params;
  const { datalink } = req.body;
  try {
    console.log(datalink)
    const payload = await eventService.updateFromLink(id, {
      datalink,
    });
    return res.status(200).json({
      data: payload,
      message: "event updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const getEventById = async (req, res) => {
  const id = req.params.id;

  try {
    const payload = await eventService.getEventById(id);
    return res.status(200).json({
      data: payload,
      message: "event list",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "event not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

const getEventByCategory = async (req, res) => {
  const category = req.params;

  try {
    const payload = await eventService.getEventByCategory(category);
    return res.status(200).json({
      data: payload,
      message: "event list",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "event not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

const addUserToEvent = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;
  console.log("in controller");
  console.log("id : " + id);
  console.log("userid : " + userId);
  try {
    const payload = await eventService.addUserToEvent(id, userId);
    return res.status(200).json({
      data: payload,
      message: "event updated",
    });
  } catch (error) {
    if (String(error).includes("User already in event")){

      return res.status(404).json({
        error: true,
        message: "User already in event",
      });
    }else{
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
    
  }
};

const getEventByOrganizer = async (req, res) => {
  const userId = req.params;

  try {
    const payload = await eventService.getEventByOrganizer(userId);
    return res.status(200).json({
      data: payload,
      message: "event list",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "event not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};


const getEventByUserId = async (req, res) => {
  const userId = req.params;

  try {
    console.log("in controller")
    const payload = await eventService.getEventByUserId(userId);
    return res.status(200).json({
      data: payload,
      message: "event list",
    });
  } catch (error) {
    if (String(error).includes("not found")) {
      return res.status(404).json({
        error: true,
        message: "event not found",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    
    const payload = await eventService.deleteEvent(id);
    return res.status(200).json({
      data: payload,
      message: "Event deleted",
    });
  } catch (error) {

    if (String(error).includes("Event not found")) {
      return res.status(404).json({
        error: true,
        message: "Participants in the event",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }



    // return res.status(500).json({
    //   error: true,
    //   message: error,
    // });
  }
};


module.exports = {
  createEvent,
  updateFromLink,
  getEvents,
  getEventById,
  getEventByCategory,
  addUserToEvent,
  getEventByOrganizer,
  getEventByUserId,
  deleteEvent
};
