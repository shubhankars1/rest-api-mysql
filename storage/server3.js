require('dotenv').config();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cors());

app.use(express.json())

const dbConnect = require('../db/connection');
const insert = require('../db/insert');
const port = process.env.DEV_PORT;

app.get('', async (req, resp) => {
    let data = await dbConnect();
    data = await data.find().toArray();

    if (data.lenght > 0) {
        resp.send({data: data, totalCount: data.length, message:'data fetched successfully', success: true});
    } else {
        resp.send({data: [], totalCount: data.length, message:'failure', success: false});
    }
})

app.post('/post', async (req, resp) => {
    const {name, type, price} = req.body;

    if (name != undefined && type != undefined && price != undefined ) {
        const db = await dbConnect();
        const result = await db.insertMany([
            {
                name: name,
                type: type,
                price: price
            }
        ])
        resp.send({message:'data inserted successfully', success: true});
    } else {
        resp.send({data: [], totalCount: 0, message:'failure', success: false});
    }
})


//Update by id
app.put('/update/:id', async (req, resp)=>{
    const id = req.params.id;
    const {name, type, price} = req.body;

    const db = await dbConnect();
    // console.log(await db.find().toArray());
    // console.log(name, type, price);
    const result = await db.updateMany(
        {
            _id: new mongodb.ObjectId(req.params.id)
        },
        {
            $set: {
                name: name,
                type: type,
                price: price
            }
        }
    )

    resp.send(result);
})


//Update by id
app.delete('/delete/:id', async (req, resp)=>{
    const id = req.params.id;

    const db = await dbConnect();
    const result = await db.deleteOne(
        {
            _id: new mongodb.ObjectId(req.params.id)
        }
    )

    resp.send(result);
})


// ----------------------------------------------->
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})