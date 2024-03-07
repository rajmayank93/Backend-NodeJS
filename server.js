//server creation
// 1. http module

const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  console.log("request has been made from browser to server");
  //   console.log(req.method);
  //   console.log(req.url);

  // lodash
  let num = _.random(0, 20);
  console.log(num);
  let greet = _.once(() => {
    console.log("hello");
  });
  greet();
  greet();

  res.setHeader("Content-Type", "text/html");
  //   res.write("<h1>Hello Mayank</h1>");
  //   res.end();
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.setHeader("Location", "/about");
      res.statusCode = 301;
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      res.end(fileData);
    }
  });
});

//port number,host,callback function
server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
