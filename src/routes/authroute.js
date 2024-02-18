const express = require("express");
const AuthRouteAPI = express.Router();
const {
  postRegisterUser,
  postLoginUser,
  getListUsers,
  refreshToken,
} = require("../controllers/authController");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/jwt_service");
AuthRouteAPI.post("/register", postRegisterUser);
AuthRouteAPI.post("/login", postLoginUser);
AuthRouteAPI.get("/getlist", verifyAccessToken, getListUsers);
AuthRouteAPI.post("/refresh-token", refreshToken);

// AuthRouteAPI.post("/logout", putUpdateUserAPI);
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
