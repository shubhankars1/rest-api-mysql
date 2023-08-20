require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.HOST;
const database = process.env.DB;
const client = new MongoClient(url);

const dbConnect = async () => {
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('products');

    // let collection = db.collection('products');

    // show all data
    // let response = await collection.find().toArray();
    // console.log(response);

    // find some data
    // let response = await collection.find({name: 'Marie Gold'}).toArray();
    // console.log(response);
}

// dbConnect().then((resp) => {
//     resp.find().toArray().then((data)=>{
//         console.log(data);
//     })
// })

module.exports = dbConnect;