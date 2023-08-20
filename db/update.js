const dbConnect = require('./connection');

const update = async () => {
    const db = await dbConnect();
    // const result = await db.insertOne({
    //     name: 'Oreo',
    //     type: 'biscuit',
    //     price: 10
    // })
    const result = await db.updateMany(
        {
            name: 'Tiger',
        },
        {
            $set: {
                type: 'cookie'
            }
        }
    )

    // console.log(result);
}

update();