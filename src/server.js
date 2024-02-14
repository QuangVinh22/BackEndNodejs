require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
//upfile
const fileUpload = require("express-fileupload");

const connection = require("./config/database");
//
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
//config file upload
// default options
app.use(fileUpload());

//config requese.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//config teamplate engine
configViewEngine(app);
//config static file
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

//query

//
connection()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Example app listening at http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB", error);
  });
//
