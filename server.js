"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");

const app = express();

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var connect = async () => {
//   try {
//     await mongoose.connect(process.env.DB);
//     console.log(">> mangodb is now alive!!!");
//     //console.log(">> Running Tests...");
//   } catch (error) {
//     throw error;
//   }
// };
// mongoose.connection.on("disconnected", () => {
//   console.log("DB disconnec ted");
// });
app.use(
  helmet({
    contentSecurityPolicy: {
      // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }),
);

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
  res.status(200);
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);
//
//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
  //connect();
  const NODE_ENV = "test";
  if (NODE_ENV === "test") {
    setTimeout(function () {
      console.log("[+] Running Tests...");
      try {
        runner.run();
      } catch (e) {
        console.log("Tests are not valid:");
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app; //for testing
