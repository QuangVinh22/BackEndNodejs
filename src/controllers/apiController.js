const User = require("../models/user");
const connection = require("../config/database");
const {
  uploadSingleFiles,
  uploadMultipleFiles,
} = require("../services/fileService.js");

const getUsersApi = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};
const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  // const [result, fields] = await connection.query(
  //   "INSERT INTO Users (email,name,city) value ( ? ,? , ?)",
  //   [email, name, city]
  // );
  let user = await User.create({
    email,
    name,
    city,
  });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};
const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let id = req.body.id;

  // const [result, fields] = await updateUserById(email, city, name, id);
  let user = await User.updateOne(
    { _id: id },
    { email: email, name: name, city: city }
  );
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

//uploadfile
const postUploadSingleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let result = await uploadSingleFiles(req.files.image);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
  const postUploadMultiplyFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    if (Array.isArray(req.files.image)) {
      let result = await uploadMultipleFiles(req.files.image);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } else {
      return await uploadSingleFiles(req, res);
    }
  };
module.exports = {
  getUsersApi,
  postCreateUserAPI,
  putUpdateUserAPI,
  postUploadSingleFileApi,
  postUploadMultiplyFileApi,
};
