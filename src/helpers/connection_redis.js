const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  password: "jrzkUNcRi7vumYFY3zsRZAsLhFsI2E1a", // Thay thế bằng mật khẩu thực tế của bạn
  socket: {
    host: "redis-13723.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // Thay thế bằng host thực tế của bạn
    port: 13723, // Thay thế bằng port thực tế của bạn
  },
});
client.connect().catch(console.error);
client
  .ping()
  .then((pong) => {
    console.log(pong); // You should see "PONG"
  })
  .catch((err) => {
    console.error("Ping Error", err);
  });
client.set("user:_id", "refreshToken", redis.print);

// Lấy refreshToken
client.get("user:_id", function (error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("GET result ->" + result);
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", (err) => console.log("Redis Client  connected"));
client.on("ready", (err) => console.log("Redis Client are ready"));

module.exports = client;
