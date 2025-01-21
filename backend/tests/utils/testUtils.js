const pool = require('../../config/db');

const testUtils = {
  async clearDatabase() {
    const tables = ['transactions', 'properties', 'users'];
    for (const table of tables) {
      await pool.query(`DELETE FROM ${table}`);
    }
  },

  async createTestUser(userData = {}) {
    const defaultUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
      role: 'buyer'
    };

    const user = { ...defaultUser, ...userData };
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.phone, user.role]
    );

    return { ...user, id: result.insertId };
  }
};

module.exports = testUtils; 