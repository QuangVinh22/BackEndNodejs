const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  url: "redis://127.0.0.1:6380",
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
