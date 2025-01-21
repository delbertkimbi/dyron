const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'DE12kimb',
  database: process.env.DB_NAME || 'dyron',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Remove the test connection code since we'll test in setup.js
module.exports = pool; 