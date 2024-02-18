const User = require("../models/ChatApp/User.models");
const createError = require("http-errors");
const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_service");
module.exports = {
  registerUserService: async (user) => {
    const { error } = userValidate(user);

    if (error) {
      throw createError(error.details[0].message);
    }

    const isExist = await User.findOne({ username: user.email }).exec();
    if (isExist) {
      throw createError.Conflict(`${user.email} is ready been register`);
    }
    const isCreate = await User.create({
      username: user.email,
      password: user.password,
    });
    return isCreate;
    // Tiếp tục logic để tạo user
  },
  loginUserService: async (user) => {
    const { error } = userValidate(user);
    if (error) {
      throw createError(error.details[0].message);
    }
    const isExist = await User.findOne({
      email: user.email,
    });
    if (!isExist) {
      throw createError.NotFound("User have not registered");
    }
    //ischeckpassword phải gọi đến instance của model chứ ko phải bản thân nó nên thay vì sử dụng user ta xài isExist
    const isValid = await isExist.isCheckPassword(user.password);
    if (!isValid) {
      throw createError.Unauthorized();
    }
    const accessToken = await signAccessToken(isExist._id);
    const refreshToken = await signRefreshToken(isExist._id);
    return { accessToken, refreshToken };
  },
  refreshTokenService: async (refreshToken) => {
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload.userId) {
      throw createError.Unauthorized("Invalid refresh token");
    }
    const accessToken = await signAccessToken(payload.userId);
    const newRefreshToken = await signRefreshToken(payload.userId); // Tùy chọn: cấp lại refresh token mới
    return { accessToken, newRefreshToken };
  },
  getListUsersService: async (Token, abc) => {
    console.log(Token);
    const listuser = User.find({});
    return listuser;
  },
};
