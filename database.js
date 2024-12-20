const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');ss

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'DE12kimb', 
    database: 'dyron', 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database!');
    }
});
db.query(`SELECT * FROM users`, (error,results, fields)=>{
   console.log(error);
   console.log(results);
   console.log(fields);
});

app.get('/properties', (req, res) => {
    const query = 'SELECT * FROM properties'; 
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
