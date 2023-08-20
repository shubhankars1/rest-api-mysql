const express = require('express');
const path = require('path');

const app = express();
const rootPath = path.join(__dirname,'public');

// app.set('view engine', 'ejs');

app.use('public', express.static('public'))

app.get('', (req, res)=>{
    res.sendFile(rootPath+'/index.html');
    // res.send('hello');
})

app.get('/about', (req, res)=>{
    res.sendFile(rootPath+'/about.html');
})

app.get('/*', (req, res)=>{
    res.sendFile(rootPath+'/nopage.html');
})

app.listen(5000);