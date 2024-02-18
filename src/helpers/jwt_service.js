const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { promiseImpl } = require("ejs");
const client = require("../helpers/connection_redis");

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const option = { expiresIn: "1h" };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
const verifyAccessToken = (req, res, next) => {
  console.log(req.body); // Đặt dòng này ngay đầu hàm verifyAccessToken

  if (!req.headers.authorization) {
    return next(createError.Unauthorized());
  }
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  //
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError")
        return next(createError.Unauthorized());
      return next(createError.Unauthorized(err.message));
    }
    req.payload = payload;
    console.log("ccccccccc", payload);
    next();
  });
};
const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId: userId.toString() }; // Convert ObjectId to string
    console.log(payload);
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const option = { expiresIn: "1y" };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);

      client.set(
        userId.toString(),
        token,
        "EX",
        365 * 24 * 60 * 60,
        (err, reply) => {
          if (err) {
            reject(createError.InternalServerError());
            return;
          }
        }
      );
      resolve(token);
    });
  });
};
const verifyRefreshToken = async (refreshToken) => {
  //
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return reject(err);
        }
        client.get(payload.userId);
        resolve(payload);
      }
    );
  });
};
module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
