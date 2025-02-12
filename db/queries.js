const pool = require("./pool");

async function addUser(full_name, username, password, membership_status) {
  const query = await pool.query(
    "INSERT INTO users (full_name, username, password, membership_status) VALUES ($1, $2, $3, $4) RETURNING id, full_name, username, membership_status",
    [full_name, username, password, membership_status]
  );
  return query;
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

async function sendMessage(title, content, user_id) {
  const result = await pool.query(
    "INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, content, user_id]
  );
  console.log(result.rows[0]);
}

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT messages.*, users.username, users.full_name FROM messages JOIN users ON messages.user_id = users.id ORDER BY timestamp DESC"
  );
  return rows;
}

async function updateStatus(id) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
    "member",
    id,
  ]);
}
async function updateAdminStatus(id) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
    "admin",
    id,
  ]);
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  addUser,
  getUserByName,
  getUserById,
  sendMessage,
  getMessages,
  updateStatus,
  updateAdminStatus,
  deleteMessage,
};
