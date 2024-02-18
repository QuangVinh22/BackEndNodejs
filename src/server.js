require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const createError = require(`http-errors`);
// const apiRoutes = require("./routes/api");
const AuthRoutes = require("./routes/authroute");
//upfile
//connect redis
const client = require("./helpers/connection_redis");
// client.set("foo", "quangvinhmthoa");
// client.get("foo", (err, result) => {
//   if (error) {
//     throw createError.BadRequest;
//   }
//   console.log(result);
// });
// const fileUpload = require("express-fileupload");

const connection = require("./config/database");
const { error } = require("console");
//
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
//config file upload
// default options
// app.use(fileUpload());

//config requese.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
//config teamplate engine
configViewEngine(app);
//config static file
// app.use("/", webRoutes);
// app.use("/v1/api/", apiRoutes);
app.use("/v1/Auth", AuthRoutes);

//băt lỗi
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    EC: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

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
