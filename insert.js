const dbConnect = require('./db.js');

const insertData = async () => {
    const db = await dbConnect();
    const result = await db.insertMany([
        {name: "s24", brand: "samsung", price: 20000, category: "mobile"},
        {name: "s23", brand: "samsung", price: 30000, category: "mobile"},
        {name: "s22", brand: "samsung", price: 40000, category: "mobile"}
    ]);

    if (result.acknowledged) {
        console.log("Data inserted successfully");
    }else {
        console.log("Data insertion failed");
    }
};

// const insertData = () => {
//     dbConnect().then((data) => {
//         data.insertMany([
//             { name: "Hemanshi Gajera", age: 20, city: "Surat" },
//             { name: "John Doe", age: 22, city: "Rajkot" },
//             { name: "Jane Smith", age: 27, city: "Ahmedabad" },
//             { name: "Bob Johnson", age: 25, city: "Baroda" }
//         ]).then((result) => {
//             console.log(result);
//         }).catch((err) => {
//             console.log(err);
//         });
//     }).catch((err) => {
//         console.log(err);
//     });
// };

insertData();