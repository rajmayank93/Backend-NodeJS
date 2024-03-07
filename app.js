// const express = require("express");

// const app = express();

// app.listen(3000);

// app.get("/", (req, res) => {
//   console.log({ root: __dirname });
//   res.sendFile("./views/index.html", { root: __dirname });
// });

// app.get("/about", (req, res) => {
//   res.sendFile("./views/about.html", { root: __dirname });
// });

// // redirect

// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// // 404 page

// app.use((req, res) => {
//   res.status(404).sendFile("./views/404.html", { root: __dirname });
// });

//-----------------------------------
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// const userModel = require("./models/userModel");
const cookieParser = require("cookie-parser");

app.use(express.json()); // global middleware

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
app.use(cookieParser());

// mounting Router
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");

app.use("/user", userRouter);
app.use("/auth", authRouter);

const planModel = require("./models/planModel");
