require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
//
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//config teamplate engine
configViewEngine(app);
//config static file
app.use("/", webRoutes);
//routes

//test connection

//query

//
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
