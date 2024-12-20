const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.json());

// Register a User
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.execute(query, [name, email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error registering user.');
        } else {
            res.status(201).send('User registered successfully.');
        }
    });
});

// Post a Product
app.post('/products', (req, res) => {
    const { user_id, name, description, price } = req.body;

    const query = 'INSERT INTO products (user_id, name, description, price) VALUES (?, ?, ?, ?)';
    db.execute(query, [user_id, name, description, price], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error posting product.');
        } else {
            res.status(201).send('Product posted successfully.');
        }
    });
});

// Start the Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
