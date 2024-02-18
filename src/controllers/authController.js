// const httpStatus = require("http-status");
const { verify } = require("jsonwebtoken");
const {
  registerUserService,
  loginUserService,
  getListUsersService,
  refreshTokenService,
} = require("../services/authService");
const { verifyRefreshToken } = require("../helpers/jwt_service");
const createError = require("http-errors");
module.exports = {
  postRegisterUser: async (req, res, next) => {
    try {
      let user = await registerUserService(req.body);

      return res.status(200).json({
        EC: 0,
        data: user,
      });
    } catch (error) {
      // Lỗi từ service sẽ được bắt ở đây và chuyển đến middleware xử lý lỗi tiếp theo
      next(error);
    }
  },
  postLoginUser: async (req, res, next) => {
    try {
      let user = await loginUserService(req.body);

      return res.status(200).json({
        EC: 0,
        data: user,
      });
    } catch (error) {
      // Lỗi từ service sẽ được bắt ở đây và chuyển đến middleware xử lý lỗi tiếp theo
      next(error);
    }
  },
  getListUsers: async (req, res, next) => {
    try {
      const authToken = req.headers.authorization;
      let listUser = await getListUsersService({
        token: authToken,
        ...req.body,
      });

      return res.status(200).json({
        EC: 0,
        data: listUser,
      });
    } catch (error) {
      // Lỗi từ service sẽ được bắt ở đây và chuyển đến middleware xử lý lỗi tiếp theo
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw createError.BadRequest();

      const tokens = await refreshTokenService(refreshToken);
      res.json(tokens);
    } catch (error) {
      // Lỗi từ service sẽ được bắt ở đây và chuyển đến middleware xử lý lỗi tiếp theo
      next(error);
    }
  },
};
