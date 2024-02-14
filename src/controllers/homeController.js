const connection = require("../config/database");
const {
  getAllUsers,
  getUsersById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDService");
const User = require("../models/user");
const getHomePage = async (req, res) => {
  let results = await User.find({});
  return res.render("homepage.ejs", { listUsers: results });
};

const getProductPage = (req, res) => {
  return res.render("sample.ejs");
};
//CreateController
const getCreatePage = (req, res) => {
  return res.render("createuser.ejs");
};
const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  // const [result, fields] = await connection.query(
  //   "INSERT INTO Users (email,name,city) value ( ? ,? , ?)",
  //   [email, name, city]
  // );
  await User.create({
    email,
    name,
    city,
  });
  res.redirect("/");
};
//EditController
const getEditPage = async (req, res) => {
  const UserId = req.params.id;
  let results = await User.findById(UserId).exec();
  return res.render("edituser.ejs", { userEdit: results });
};
const postEditUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let id = req.body.id;

  // const [result, fields] = await updateUserById(email, city, name, id);
  await User.updateOne({ _id: id }, { email: email });
  res.redirect("/");
};
//DeleteController
const postDeletePage = async (req, res) => {
  const UserId = req.params.id;
  // let results = await getUsersById(UserId);
  let results = await User.findById(UserId).exec();
  return res.render("deleteuser.ejs", { userDelete: results });
};
const deleteUser = async (req, res) => {
  let UserId = req.body.id;
  let results = await User.deleteOne({ _id: UserId });
  res.redirect("/");
};

module.exports = {
  getHomePage,
  getProductPage,
  postCreateUser,
  getCreatePage,
  getEditPage,
  postEditUser,
  deleteUser,
  postDeletePage,
};
