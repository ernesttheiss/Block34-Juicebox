// db/index.js
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/juicebox-dev',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

/**
 * USER Methods
 */

async function createUser({ 
  username, 
  password,
  name,
  location
}) {
  try {
    const { rows: [user] } = await client.query(
      'INSERT INTO users(username, password, name) VALUES($1, $2, $3) ON CONFLICT (username) DO NOTHING RETURNING *;',
      [username, password, name, location]
    );

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user. Please try again.');
  }
}

async function updateUser(id, fields = {}) {
  // Build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  // Return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [user] } = await client.query(
      `UPDATE users SET ${setString} WHERE id=${id} RETURNING *;`,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user. Please try again.');
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      'SELECT id, username, name, location, active FROM users;'
    );
  
    return rows;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new Error('Failed to get all users. Please try again.');
  }
}



module.exports = {
  client,
  createUser,
  updateUser,
  getAllUsers,
  
};
