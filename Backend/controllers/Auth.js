const User = require("../modules/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "config/config.env" });
const secritkey = process.env.secritkey;

// create-user
const userdata = async (req, res) => {
  const Userdata = await User.findOne({ email: req.body.email });
  if (Userdata) {
    res.status(404).json({ message: "User already exist" });
  } else {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      Password:CryptoJS.RC4.encrypt(req.body.Password, secritkey).toString(),
     
    });
    try {
      const CreateUser = await user.save();
      res.status(202).json( CreateUser );
    } catch (err) {
      console.log("error :", err);
    }
  }
};
// loginUser
const LoginUser = async (req, res) => {
  const { email, Password } = req.body;

  if (!email && !Password) {
    res.status(404).json({
      massage: "all fields are required",
    });
  } else {
    try {
     
      const user = await User.findOne({email:email});

      if (!user) {
        res.status(404).json({
          massage: "email or Password is incorrect",
        });
      } else {
        const pass = CryptoJS.RC4.decrypt(user.Password, secritkey);
        const checkpassword = pass.toString(CryptoJS.enc.Utf8);
        if (Password === checkpassword) { 
          res.status(202).json({user});
        } else {
          res.status(404).json({
            massage: "email or Password is incorrect",
          });
        }
      }
    } catch (err) {
      res.status(404).json({
        massage: err.massage,
      });
    }
  }
};
module.exports = {
  userdata,
  LoginUser,
};