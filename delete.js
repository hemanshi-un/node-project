const dbConnect = require('./db.js');

const deleteData = async () => {
    const db = await dbConnect();
    const result = await db.deleteMany({ name: "s23"});

    if (result.deletedCount == 0) {
        console.log("Data not found");
    }else if (result.acknowledged) {
        console.log("Data deleted successfully");
    }else {
        console.log("Data deletion failed");
    }
}

// const deleteData = () => {
//     dbConnect().then((data) => {
//         data.deleteOne({ name: "s22" }).then((result) => {
//             if(result.deletedCount == 0) {
//                 console.log("Data not found");
//             }
//             console.log(result);
//         }).catch((err) => {
//             console.log(err);
//         })
//     }).catch((err) => {
//         console.log(err);
//     });
// };

deleteData();