const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');

// Signup a new user
exports.signupUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  console.log('Received request data:', { name, email, phone, role }); 

  if (!name || !email || !password || !role) {
    console.log(name, email, password, role, phone);
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [name, email, hashedPassword, phone, role], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = (req, res) => {
  const query = 'SELECT id, name, email, phone, role, created_at FROM Users';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};
