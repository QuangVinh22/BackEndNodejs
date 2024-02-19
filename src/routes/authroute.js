const express = require("express");
const AuthRouteAPI = express.Router();
const {
  postRegisterUser,
  postLoginUser,
  getListUsers,
  refreshTokenController,
  logoutUser,
} = require("../controllers/authController");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/jwt_service");
AuthRouteAPI.post("/register", postRegisterUser);
AuthRouteAPI.post("/login", postLoginUser);
AuthRouteAPI.get("/getlist", verifyAccessToken, getListUsers);
AuthRouteAPI.post("/refresh-token", refreshTokenController);

AuthRouteAPI.delete("/logout", logoutUser);
// AuthRouteAPI.post("/refresh-token", postUploadSingleFileApi);
// AuthRouteAPI.post("/forgot-password", postUploadMultiplyFileApi);
// AuthRouteAPI.post(
//   "/reset-password",
//   validate(authValidation.resetPassword),
//   authController.resetPassword
// );
// AuthRouteAPI.post(
//   "/send-verification-email",
//   auth(),
//   authController.sendVerificationEmail
// );
// AuthRouteAPI.post(
//   "/verify-email",
//   validate(authValidation.verifyEmail),
//   authController.verifyEmail
// );

module.exports = AuthRouteAPI;
