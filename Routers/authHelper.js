const jwt = require("jsonwebtoken");
const JWT_KEY = "dscbeejdlkaclnc";

// let flag = true; // user Logged In or Not
function protectRoute(req, res, next) {
  if (req.cookies.token) {
    // console.log(process.env.JWT_KEY);
    let isVerified = jwt.verify(req.cookies.token, JWT_KEY);
    if (isVerified) {
      next();
    }
  } else {
    return res.json({
      message: "Operation Not Allowed",
    });
  }
}

module.exports = protectRoute;
