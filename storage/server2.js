const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const rootPath = path.join(__dirname,'public');

app.set('view engine', 'ejs');

app.use('public', express.static('public'))

// ############################################################

let rawdata = fs.readFileSync('apple.txt');
console.log(rawdata.toString('utf8'));

const authCheck = (req,res) => {
    console.log('auth checking done');
    return true;
} 

// ############################################################
app.get('', authCheck, (req, res)=>{
    console.log('inner fn runs');

    const user = {
        name: 'Shubhankar Singh',
        email: 'shubhankars.official@gmail.com',
        city: 'kolkata',
        skills: [
            'C', 'Java', 'JavaScript', 'Angular', 'React'
        ]
    }
    res.render('home', {user});
})

app.get('/about', (req, res)=>{
    res.render('about');
})

// app.get('/*', (req, res)=>{
//     res.sendFile(rootPath+'/nopage.html');
// })

// ==================================================================>
app.listen(5000);