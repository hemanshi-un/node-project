const dbConnect = require('./db.js');

const updateData = async () => {
    const db = await dbConnect();
    const result = await db.updateMany(
        { name: "s24" },
        { $set: { price: 26000, name: "s24 plus" } }
    );

    if (result.acknowledged) {
        console.log("Data updated successfully");
    }else {
        console.log("Data update failed");
    }
};

// const updateData = () => {
//     dbConnect().then((data) => {
//         data.updateOne(
//             { name: "s24" },
//             { $set: { price: 25000 } }
//         ).then((result) => {
//             console.log(result);
//         }).catch((err) => {
//             console.log(err);
//         });
//     }).catch((err) => {
//         console.log(err);
//     });
// }

updateData();
