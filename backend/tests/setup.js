const pool = require('../config/db');

global.beforeAll(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Test database connected');
    connection.release();
  } catch (error) {
    console.error('Test database connection failed:', error);
    throw error;
  }
});

global.afterAll(async () => {
  await pool.end();
}); 