const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "dscbeejdlkaclnc";

const app = express();
const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(middleware1, getSignUp, middleware2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);

function middleware1(req, res, next) {
  console.log("middleware1 is encountered");
  next();
}

function middleware2(req, res) {
  console.log("middleware2 is encountered");
  console.log("middleware 2 ended cycle of req/res");
  res.sendFile("/public/index.html", { root: __dirname });
}

function getSignUp(req, res, next) {
  console.log("get signed Up called");
  // res.sendFile("/public/index.html", { root: __dirname });
  next();
}

async function postSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);
  console.log(user);
  res.json({
    message: "user signed Up",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });

    if (user) {
      // bcrypt -> later

      if (user.password == data.password) {
        let uid = user["_id"];
        let token = jwt.sign({ payload: uid }, JWT_KEY);

        res.cookie("token", token, { httpOnly: true });
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
}

module.exports = authRouter;
