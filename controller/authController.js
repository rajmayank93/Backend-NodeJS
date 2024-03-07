const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "dscbeejdlkaclnc";

//signup user
module.exports.signup = async function postSignUp(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      //   console.log(user);
      return res.json({
        message: "user signed Up",
        data: user,
      });
    } else {
      res.status(500).json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//login user
module.exports.login = async function loginUser(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });

    if (user) {
      // bcrypt -> later

      if (user.password == data.password) {
        // let uid = user["_id"];
        let uid = user._id;
        console.log(uid);
        let token = jwt.sign({ payload: uid }, JWT_KEY);

        res.cookie("token", token);
        // res.cookie("token", token, { httpOnly: true });
        return res.json({
          message: "User Logged In",
          Obj: data,
        });
      } else {
        return res.json({
          message: "Wrong Credentials",
        });
      }
    } else {
      return res.json({
        message: "User not Found !!",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

// isAuthorized to check user's Role -> {admin,user, deleiveryboy,restraunt}
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({ message: "user is not allowed to access" });
    }
  };
};

//protectRoute

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    // console.log("protectRoute");
    if (req.cookies.token) {
      // console.log(req.cookies.token);
      token = req.cookies.token;
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        console.log(payload);
        let user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user._id;
        next();
      } else {
        res.json({
          message: "user not verified !!",
        });
      }
    } else {
      //browser
      const client = req.get("User-Agent");
      if (client.incude("Mozilla") == true) {
        return res.redirect("/login");
      }
      //postman
      return res.json({
        message: "please Login !!",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

//forgetPassword
module.exports.forgetpassword = async function forgetpassword(req, res) {
  const { user_email } = req.body;
  try {
    const user = await userModel.findOne({ email: user_email });
    if (user) {
      const resetToken = user.createResetToken();
      // http://abc.com/resetpassword/token
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      // send email to user
      // nodemailer
    } else {
      res.json({
        message: "User is not registered",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//resetPassword
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "Password resetted succesfully !! Login again !! ",
      });
    } else {
      res.json({
        message: "User Not Found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//logout
module.exports.logout = function logout(req, res) {
  res.cookie("token", " ", { maxAge: 1 });
  res.json({
    message: "logged out successfully",
  });
};
