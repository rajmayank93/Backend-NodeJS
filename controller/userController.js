const userModel = require("../models/userModel");

// methods callbacks
module.exports.getUser = async function getUser(req, res) {
  // console.log(req.query);
  let id = req.id;
  console.log(id);
  let user = await userModel.findById(id);
  if (user) {
    res.json({ data: user });
  } else {
    res.json({
      message: "User Not Found !!",
    });
  }
};

// module.exports.postUser = function postUser(req, res) {
//   console.log(req.body);
//   users = req.body;
//   res.json({
//     message: "data received succesfully",
//     user: req.body,
//   });
// };

module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req-body ->", req.body);
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    // console.log(user);

    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }

      let updatedData = await user.save();
      // console.log(updatedData);

      res.json({
        message: "data updated succesfully",
        data: updatedData,
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
  // for (key in dataToBeUpdated) {
  //   users[key] = dataToBeUpdated[key];
  // }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  // users = {};
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "User not found",
      });
    }
    res.json({
      message: "data deleted succesfully",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    let id = req.params.id;
    let users = await userModel.find();

    if (users) {
      res.json({
        message: "data retreived succesfully",
        data: users,
      });
    } else {
      res.json({
        message: "No users Found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// module.exports.setCookies = function setCookies(req, res) {
//   // res.setHeader("set-Cookie", "isLoggedIn=true");
//   res.cookie("isLoggedIn", true, {
//     maxAge: 1000 * 24 * 60 * 60,
//     secure: true,
//     httpOnly: true,
//   }); // not shown in frontend console
//   res.cookie("isPrime", true); // shown in frontend console
//   res.send("cookie has been set");
// };

// module.exports.getCookies = function getCookies(req, res) {
//   let cookies = req.cookies;
//   console.log(cookies);
//   res.send("cookies received");
// };
