require('dotenv').config();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const port = process.env.DEV_PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cors());

app.use(express.json())

// -------------------------------- EVENT EMITTER ----------------------------------->
const EventEmitter = require('events');
const event = new EventEmitter();
let counter = 0;

event.on("countAPI", ()=>{
    counter++
    console.log('event called => '+counter);
})

app.get('/event', (req, resp) => {
    event.emit("countAPI");
})

// ----------------------------------------------->
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})