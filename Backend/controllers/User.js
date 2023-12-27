const User = require("../modules/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "Config/.env" });

const secritkey = process.env.secritkey;
const updateUser = async (req, res) => {
  const users = {
    userName: req.body.userName,
    email: req.body.email,
    Password: CryptoJS.RC4.encrypt(req.body.Password, secritkey).toString(),
    
  };
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: users },
    { new: true }
  );
  res.status(202).json({
    massage: "this user is update successfully",
    updateUser,
  });
};
// get all User
const GetAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(202).json({
      massage: "success",
      user,
    });
  } catch (err) {
    res.status(404).json({
      massage: "error",
    });
  }
};
// get single user
const GetSingleUser = async (req, res) => {
  try {
    const userdata = await User.findById(req.params.id);
    if (!userdata) {
      res.status(404).json({
        massage: "user is not found",
      });
    } else {
      const token = jwt.sign(
        {
          id: userdata._id,
        },
        secritkey
      );
      const { Password, ...other } = userdata._doc;
      res.status(200).json({
        massage: "success",
        other,
        token,
      });
    }
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
  }
};
// delete user
const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    res.send("sussessful");
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
  }
};

// forget Password
const forgetPassword = async (req, res) => {
  try {
    const useremail = await User.findOne({ email: req.body.email });
    if (!useremail) {
      res.status(404).json({
        massage: "user not found",
      });
    } else {
      const tokendata = useremail._id + secritkey;
      const token = jwt.sign({ id: useremail._id }, tokendata);
      res.status(200).json(
       
      );
    }
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
  }
};
// change Password with forgetpassword new Password
const NewPassword = async (req, res) => {
  const { id, token } = req.params;
  const { Password, ConfurmPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.send("not found");
    } else {
      const firsttoken = user._id + secritkey;
      // console.log("token ",firsttoken);
      jwt.verify(token, firsttoken);
      if (Password === ConfurmPassword) {
        const hashpassword = CryptoJS.RC4.encrypt(
          Password,
          secritkey
        ).toString();

        await User.findByIdAndUpdate(user._id, {
          $set: { Password: hashpassword },
        });

        res.status(200).json("Password is update");
        // res.send("done")
      } else {
        res.status(404).json({
          massage: "Password not match",
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      massage: "error",
    });
  }
};
module.exports = {
  updateUser,
  GetAllUser,
  GetSingleUser,
  DeleteUser,
  forgetPassword,
  NewPassword,
  

};