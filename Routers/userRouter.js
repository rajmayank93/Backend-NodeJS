const express = require("express");
const app = express();
const userRouter = express.Router();
// const protectRoute = require("../Routers/authHelper");
const {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  // setCookies,
  // getCookies,
} = require("../controller/userController");

const {
  login,
  signup,
  isAuthorised,
  protectRoute,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authController");

// userRouter
//   .route("/")
//   .get(protectRoute, getUsers) //path specific middleware
//   .post(postUser)
//   .patch(updateUser)
//   .delete(deleteUser);

// userRouter.route("/setCookies").get(setCookies);
// userRouter.route("/getCookies").get(getCookies);

// userRouter.route("/:id").get(getUserById);

//-------------------
// user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);

userRouter.route("/login").post(login);

userRouter.route("/forgetpassword").post(forgetpassword);

userRouter.route("/resetpassword/:token").post(resetpassword);

userRouter.route("/logout").get(logout);

// user Profile
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific
userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUsers);

module.exports = userRouter;
