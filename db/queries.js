const pool = require("./pool");

async function addUser(full_name, username, password, membership_status) {
  await pool.query(
    "INSERT INTO users (full_name, username, password, membership_status) VALUES ($1, $2, $3, $4)",
    [full_name, username, password, membership_status]
  );
}

async function getUserByName(username) {
  const rows = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows;
}

async function getUserById(id) {
  const rows = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
}

module.exports = { addUser, getUserByName, getUserById };
