require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.DEV_PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cors());

app.use(express.json())

// ------------------------------- DB CONNECT ---------------------------------->

const mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// ---------------------------------- API AREA ----------------------------------->

app.get('/getAllUsers', (req, resp) => {
    con.query('select * from users', (error, result) => {
        if (error) {
            resp.send('error');
        } else {
            resp.send(result)
        }
    })
})

app.post('/addUsers', (req, resp) => {
    const {name, age, country} = req.body;
    var sql = `INSERT INTO users (name, age, country) VALUES ('${name}', ${age}, '${country}')`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        resp.send(result)
    });
})

app.put('/updateUsers/:id', (req, resp) => {
    const data = [req.body.name, req.body.age, req.body.country, req.params.id];
    var sql = `UPDATE users SET name = ?, age = ?, country = ? WHERE id = ?`;
    con.query(sql, data, (err, result, fields) => {
        if (err) throw err;
        resp.send(result)
    });
})

app.delete('/deleteUser/:id', (req, resp) => {
    const id = req.params.id;
    var sql = `DELETE from users WHERE id = ?`;
    con.query(sql, id, (err, result, fields) => {
        if (err) throw err;
        resp.send(result)
    });
})

app.get('/search/:key', async (req, resp) => {
    let searchTerm = `'%${req.params.key}%'`;
    var sql = `SELECT * from users WHERE name LIKE ${searchTerm} OR age LIKE ${searchTerm} OR country LIKE ${searchTerm}`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        resp.send(result)
    });
})

// -------------------------------- APP LISTENER ----------------------------------->
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})