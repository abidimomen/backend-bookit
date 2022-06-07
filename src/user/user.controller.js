const userService = require("./user.service.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const res = require("express/lib/response");
const { User } = require("../models/User");
const { hashPassword, comparePassword } = require("../helper/utils");




const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  try {
    const payload = await userService.register(
      email,
      firstname,
      lastname,
      password
    );
    console.log("im in controller");
    
    console.log(payload.isVerified);
    let token = jwt.sign(
      { id: payload._id, email: payload.email },
      process.env.SECRET,
      {}
    
      
    );
    if(payload.isVerified == 0){
      sendConfirmationEmail(email, token);
    }
    return res.status(201).json({
      data: payload,
      message: "User created",
    });
    
    
  } catch (error) {
    if (String(error).includes("email taken")) {
      return res.status(400).json({
        error: true,
        message: "Email is taken",
      });
    }
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {

     const payload = await userService.login(email, password);
    
    console.log(payload.isVerified);
    let token = jwt.sign(
      { id: payload._id, email: payload.email },
      process.env.SECRET,
      {}
    
      
    );
    if(payload.isVerified == 0){
      sendConfirmationEmail(email, token);
    }
    
    
    
    
    
    
    // let auth = "Bearer " + token;
    // res.setHeader("Authorization", auth);
    // return res.status(200).send({ auth: true, token: auth });
    

    // return res.status(200).json({
    //   data: payload,
    //   message: "User updated",
      
    // })
    return res.status(200).send({payload});
    //return res.status(200).send(payload);
    
  } catch (error) {
    if (String(error).includes("user not found")) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    } else if (String(error).includes("wrong credentials")) {
      return res.status(500).json({
        error: true,
        message: "email/password incorrect",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, password } = req.body;
  try {
    const payload = await userService.updateAccount(id, {
      firstname,
      lastname,
      password,
    });
    return res.status(200).json({
      data: payload,
      message: "User updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const updatePassword = async (req, res) => {
  
  const {email,password} = req.body;
  try {
    //console.log(email)
    console.log("in controller")
   
    const user = await User.findOne({ email: email });
    //console.log(user)
  
    //password = hashPassword(password)
    //console.log("user password is :"+password)
    //console.log(user.password)
    //user.password=password
    
    
    
    const payload = await userService.updatePassword(email , password);
    console.log(payload)

    return res.status(200).json({
      data: payload,
      message: "User Password updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const payload = await userService.deleteAccount(id);
    return res.status(200).json({
      data: payload,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const getUsers= async (req, res) => {
  try {
    const payload = await userService.getUsers();
    return res.status(200).json({
      data: payload,
      message: "list all users",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }};

   const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
      const payload = await userService.getUserById(id);
      return res.status(200).json({
        data: payload,
        message: "list user",
      });
    } catch (error) {
      if (String(error).includes("not found")) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      } else {
        return res.status(500).json({
          error: true,
          message: error,
        });
      }
    }
  };

  const IsUserVerified = async (req, res) => {
    const id = req.params.id;
    try {
      const payload = await userService.IsUserVerified(id);
      return res.status(200).json({
        data: payload,
        message: "list user",
      });
    } catch (error) {
      if (String(error).includes("not found")) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      } else {
        return res.status(500).json({
          error: true,
          message: error,
        });
      }
    }
  };

  //NOT IN SERVICE CODE !!!

  const confirmation = async (req, res) => {

    var token;
    try {
      token = jwt.verify(req.params.token, process.env.SECRET)    
    } catch (e) {
      return res.status(400).send({ message: 'The verification link may have expired, please resend the email.' });
    }
  
    const userExists = await User.findOne({
      email: token.email,
    })
    console.log("the user is :")
    console.log(userExists.id)
    
    ////User.findById(tokenValue._id, function (err, use) {
      User.findById(userExists.id, function (err, user) {
      if (!user) {
        console.log(!user)
        return res.status(401).send({ message: 'User does not exist, please register.' });
      }
      else
       if (user.isVerified) {
        return res.status(200).send({ message: 'This user has already been verified, please login' });
      }
      else {
        user.isVerified = true;
        user.save(function (err) {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          else {
            return res.status(200).send({ message: 'Your account has been verified' });
          }
        });
      }
    });
  }

  const forgotPass = async (req, res) => {
    const codeDeReinit = req.body.codeDeReinit
    console.log(codeDeReinit)
    const user = await User.findOne({ "email": req.body.email });
  
    if (user) {
      // token creation
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET,
        {}
      
        
      );
      //const token = generateUserToken(user)
  
      envoyerEmailReinitialisation(req.body.email, token, codeDeReinit);
  
      res.status(200).send({ "message": "reinitialisation code is sent to " + user.email })
    } else {
      res.status(404).send({ "message": "User not found" })
    }
  }
  
  const resetPass = async (req, res) => {
    console.log("in reset pass")
    const { email, password } = req.body;
    console.log(typeof(password))
    const passwordHashed = await hashPassword(password);
    //console.log(passAfterHash)
    let user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password :  passwordHashed
        }
      }
    );
    console.log("3")
    res.send({ user });
  }

 


  const reSendConfirmationEmail = async (req, res) => {
 
    let user= await User.findOne( {email : req.body.email})
  
    
    if (user) {
      // token creation
       const token = generateUserToken(user)
        
       sendConfirmationEmail(req.body.email, token);
  
      res.status(200).send({ message: "Confirmation email is sent to " + user.email })
    } else {
      res.status(404).send({ message: "Utilisateur innexistant" })
    }
  }
  

  function generateUserToken(user) {

    return jwt.sign({ user }, process.env.JWT_KEY, {
      expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
      
    })
    
  }
  async function sendConfirmationEmail(email, token) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pimbookit@gmail.com',
        pass: 'bookitpim123'
      }
    });
  
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
    const urlDeConfirmation = "http://localhost:3000/users/confirmation/"+ token;
  
  
    const mailOptions = {
        from: 'BookitTeam<pimbookit@gmail.com>',
      to: email,
      text: 'For clients with plaintext support only',
      subject: 'Confirm your email',
      html: "<h3>Please confirm your email using this  </h3><a href='" + urlDeConfirmation + "'>Link</a>"
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
}


async function envoyerEmailReinitialisation(email, token, codeDeReinit) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pimbookit@gmail.com',
      pass: 'bookitpim123'
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Server not ready");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: 'BookitTeam<pimbookit@gmail.com>',
    to: email,
    subject: 'Change password - Bookit',
    html: "<h3>You have requested to reset your password </h3><p>Your reset code is  : <b style='color : blue'>" + codeDeReinit + "</b></p>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent : ' + info.response);
    }
  });
}
  










  
module.exports = { register, login, updateAccount, deleteAccount ,getUsers,getUserById,IsUserVerified,confirmation,updatePassword,resetPass,forgotPass,envoyerEmailReinitialisation,reSendConfirmationEmail};
