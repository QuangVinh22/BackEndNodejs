const express = require("express");
const routerAPI = express.Router();

const {
  getUsersApi,
  postCreateUserAPI,
  putUpdateUserAPI,
  postUploadSingleFileApi,
  postUploadMultiplyFileApi,
} = require("../controllers/apiController");
const {
  postCreateCustomer,
  postCreateManyCustomer,
  getAllCustomer,

  putEditCustomer,
  deleteACustomer,
  deleteArrayCustomer,
} = require("../controllers/customerController");
const {
  postCreateProject,
  getProject,
  deleteAProject,
  putEditProject,
} = require("../controllers/projectController");
const {
  postCreateTasks,
  getAllTask,
  deleteATask,
  UpdateATask,
} = require("../controllers/taskController");
routerAPI.get("/users", getUsersApi);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.post("/file", postUploadSingleFileApi);
routerAPI.post("/files", postUploadMultiplyFileApi);
//routes customers
routerAPI.post("/customers", postCreateCustomer);
routerAPI.post("/customers-many", postCreateManyCustomer);
routerAPI.get("/customers", getAllCustomer);
routerAPI.put("/customers", putEditCustomer);
routerAPI.delete("/customers", deleteACustomer);
routerAPI.delete("/customers-many", deleteArrayCustomer);
//
routerAPI.get("/info", (req, res) => {
  console.log(req.query);
  return res.status(200).json({
    data: req.query,
  });
});
//
routerAPI.get("/info/:name/:address", (req, res) => {
  console.log(req.params);
  return res.status(200).json({
    data: req.params,
  });
});
//Routes Projects
routerAPI.post("/projects", postCreateProject);
routerAPI.get("/projects", getProject);
routerAPI.delete("/projects", deleteAProject);
routerAPI.put("/projects", putEditProject);
//Routes Task
routerAPI.post("/tasks", postCreateTasks);
routerAPI.get("/tasks", getAllTask);
routerAPI.delete("/tasks", deleteATask);
routerAPI.put("/tasks", UpdateATask);

module.exports = routerAPI;
