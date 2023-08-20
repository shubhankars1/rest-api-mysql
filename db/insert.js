const dbConnect = require('./connection');

const insert = async () => {
    const db = await dbConnect();
    // const result = await db.insertOne({
    //     name: 'Oreo',
    //     type: 'biscuit',
    //     price: 10
    // })
    const result = await db.insertMany([
        {
            name: 'Tiger',
            type: 'biscuit',
            price: 7
        }
    ])

    // console.log(result);
}

insert();