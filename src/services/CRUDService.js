const connection = require("../config/database");
const getAllUsers = async () => {
  const [results, fields] = await connection.query("Select * FROM Users");
  return results;
};
const getUsersById = async (userId) => {
  const [results, fields] = await connection.query(
    "Select * FROM Users Where id = ?",
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};
const updateUserById = async (email, city, name, id) => {
  const [results, fields] = await connection.query(
    "Update Users set email= ?,name=?,city = ? Where id = ?",
    [email, name, city, id]
  );
};
//delete user
const deleteUserById = async (userId) => {
  const [results, fields] = await connection.query(
    "DELETE FROM Users WHERE id =?",
    [userId]
  );
};

module.exports = {
  getAllUsers,
  getUsersById,
  updateUserById,
  deleteUserById,
};
