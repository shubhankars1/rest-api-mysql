const dbConnect = require('./connection');

const deleteItem = async () => {
    const db = await dbConnect();

    const result = await db.deleteMany(
        {
            name: 'Tiger',
        }
    )

    if (result.acknowledged) {
        console.log('record deleted successfully');
    }

    // console.log(result);
}

deleteItem();