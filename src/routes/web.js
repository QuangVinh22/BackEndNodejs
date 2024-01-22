const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getProductPage,
  postCreateUser,
  getCreatePage,
  getEditPage,
  postEditUser,
  deleteUser,
  postDeletePage,
} = require("../controllers/homeController");

router.get("/", getHomePage);

router.get("/product", getProductPage);
//Edit User
router.get("/edit/:id", getEditPage);
router.post("/edit-user", postEditUser);
//postUser
router.post("/create-user", postCreateUser);
router.get("/create", getCreatePage);
//deleteUser
// router.get("/delete-user/:id", deleteUser);
// router.get("/delete-user/:id", getDeletePage);
router.post("/delete-user/:id", postDeletePage);
router.post("/delete-user", deleteUser);

module.exports = router;
