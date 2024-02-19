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
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const option = { expiresIn: "1y" };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      console.log(userId);
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
  // console.log("are verifyinggg");
  try {
    // Sử dụng Promise để xử lý việc kiểm tra refreshToken
    const payload = await new Promise((resolve, reject) => {
      // Sử dụng JWT để xác minh refreshToken
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
          if (err) {
            // Nếu có lỗi trong quá trình xác minh, từ chối Promise với lỗi InternalServerError
            return reject(createError.InternalServerError());
          }
          // console.log(payload); // Log payload để debug
          try {
            // Truy xuất refreshToken từ Redis dựa trên userId từ payload
            const reply = await client.get(payload.userId);
            if (refreshToken === reply) {
              // Nếu refreshToken khớp, giải quyết Promise với payload
              resolve(payload);
            } else {
              // Nếu không khớp, từ chối Promise với lỗi Unauthorized
              reject(createError.Unauthorized());
            }
          } catch (error) {
            // Bắt lỗi khi truy xuất từ Redis và từ chối Promise với lỗi InternalServerError
            reject(createError.InternalServerError());
          }
        }
      );
    });
    // Trả về payload sau khi Promise được giải quyết thành công
    return payload;
  } catch (error) {
    // Bắt và log lỗi từ quá trình xác minh
    console.log("Error:", error);
    // Rethrow lỗi để xử lý ở cấp cao hơn
    throw error;
  }
};

// const verifyRefreshToken = async (refreshToken) => {
//   console.log("are verifyinggg");
//   return new Promise((resolve, reject) => {
//     JWT.verify(refreshToken, refreshTokenSecret, (err, payload) => {
//       if (err) {
//         console.log("Token verification error:", err);
//         return reject(createError.InternalServerError());
//       }
//       console.log("Token payload:", payload);

//       client.get(payload.userId.toString(), (err, storedRefreshToken) => {
//         if (err) {
//           console.error("Error accessing Redis:", err);
//           return reject(createError.InternalServerError());
//         }
//         if (refreshToken === storedRefreshToken) {
//           console.log("Refresh token is valid. Generating new tokens...");

//           return resolve(payload);
//         } else {
//           console.log(
//             "Refresh token does not match stored token or does not exist."
//           );
//           return reject(createError.Unauthorized("Invalid refresh token"));
//         }
//       });
//     });
//   });
// };
module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
