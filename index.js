const http = require('http');
const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const dbConnect = require('./db.js');
const fs = require('fs');
const path = require('path');
const dataFile = require('./data.js');
const reqFilter = require('./middleware.js');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/nodedb");
const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    category: String
});

const addMongooseData = async () => {
    const ProductModel = mongoose.model('products', ProductSchema);
    let modelData = new ProductModel({name: "s28", price: 20000});
    let result = await modelData.save();

    console.log(result);
}

// app.use(reqFilter);

// const main = async () => {
//     const db = await dbConnect();
//     let data = await db.find().toArray();
//     console.log(data);
// }

// main();

app.get('/profile', (_, res) => {
    const user = {
        name: "Hemanshi Gajera",
        age: 20,
        city: "Surat",
        skills: ["JavaScript", "Node.js", "Express", "React"]
    };
    res.render('profile', { user });
});

app.get('/', async (req, res) => {
    let dbData = await dbConnect();
    dbData = await dbData.find().toArray();
    res.send(dbData);
});

app.post('/store', async (req, res) => {
    let dbData = await dbConnect();
    let result = await dbData.insertOne(req.body);

    res.send(result);
});

app.put('/update/:id', async (req, res) => {
    const dbData = await dbConnect();
    let result = await dbData.updateOne({_id: new mongoDb.ObjectId(req.params.id)}, {$set: req.body});

    res.send(result);
});

app.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id);
    const dbData = await dbConnect();
    let result = await dbData.deleteOne({_id: new mongoDb.ObjectId(req.params.id)});

    res.send(result);
});

app.listen(5000);

http.createServer((req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify(dataFile));
    resp.end();
}).listen(4500);

// const input = process.argv;

// if (input[2] == 'add') {
//     fs.writeFileSync(input[3], input[4]);
// }else if(input[2] == 'delete'){
//     fs.unlinkSync(input[3]);
// }else{
//     console.log("Invalid input");
// }

// const basePath = path.join(__dirname, 'Files');

// for(let i = 0; i < 5; i++){
//     fs.writeFileSync(`${basePath}/apple${i+1}.txt`, `This is apple file number ${i+1}`);
// }

// fs.readdir(basePath, (err, files) => {
//     files.forEach((file) => {        
//         let filePath = path.join(basePath, file);
        
//         fs.unlinkSync(filePath, (err) => {
//             if (err) throw err;
//             console.log(`Deleted ${file}`);
//         });

//         fs.appendFile(filePath, `\nThis is an appended line in ${file}`, (err) => {
//             if (err) throw err;
//             console.log(`Appended content to ${file}`);
//         })

//         fs.rename(filePath, path.join(basePath, `new_${file}`), (err) => {
//             if (err) throw err;
//             console.log(`Renamed ${file} to new_${file}`);
//         });

//         fs.readFile(filePath, 'utf-8', (err, data) => {
//             if (err) throw err;
//             console.warn(`Content of ${file}: ${data}`);
//         });
//     });
// });

// import chalk from 'chalk';
// import colors from 'colors';
// import http from 'http';
// // const app = require('./app.js');

// // const fs = require('fs');
// // fs.writeFileSync('test.txt', 'This is a test file created using Node.js fs module.');
// // // console.log(app.z());

// const arr = [2, 4, 7, 1, 3, 8, 3, 5];


// let res = arr.filter((val) => {
//     return val >= 4;
// });

// console.log(res);
// console.log("Hello".bgBlue, "World".red);

// console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));


// http.createServer((req, resp) => {
//     resp.write("<h1>Hello i'm Hemanshi Gajera. I am learning node.js</h1>");
//     resp.end();
// }).listen(3000);
