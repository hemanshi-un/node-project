// const http = require('http');
// const mongoDb = require('mongodb');
const express = require('express');
require('./config');
const product = require('./product');
const multer = require('multer');
const eventEmitter = require('events');
// const dbConnect = require('./db.js');
// const fs = require('fs');
// const path = require('path');
// const dataFile = require('./data.js');
// const reqFilter = require('./middleware.js');
// const os = require('os');
// console.log(os.arch());
// console.log(os.hostname());
// console.log(os.freemem() / (1024 * 1024 * 1024));
// console.log(os.totalmem() / (1024 * 1024 * 1024));
// console.log(os.platform());
// console.log(os.userInfo());
// console.log(os.homedir());
// console.log(os.cpus());
// console.log(os.version());
// console.log(os.machine());

const app = express();
app.use(express.json());
// app.set('view engine', 'ejs');

// app.use(reqFilter);

// const main = async () => {
//     const db = await dbConnect();
//     let data = await db.find().toArray();
//     console.log(data);
// }

// main();

app.post('/store', async (req, res) => {
    let data = new product(req.body);
    let result = await data.save();
    console.log(result);
    res.send(result);
});

app.get('/list', async (req, res) => {
    let data = await product.find();
    res.send(data);
});

app.get('/get-product/:id', async (req, res) => {
    let data = await product.findOne({_id: req.params.id});
    res.send(data);
});

app.put('/update/:id', async (req, res) => {
    let data = await product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );

    res.send(data);
});

app.delete('/delete/:id', async (req, res) => {
    let data = await product.deleteOne({_id: req.params.id});
    res.send(data);
});

app.get('/search/:key', async (req, res) => {
    let data = await product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { brand: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });

    res.send(data);
});

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {            
            // console.log(file.originalname.split('.')[file.originalname.split('.').length - 1]);
            cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
        }
    })
}).single('user_file');

app.post('/upload', uploadFile, (req, res) => {    
    
    res.send('File uploaded successfully');
});

// app.get('/profile', (_, res) => {
//     const user = {
//         name: "Hemanshi Gajera",
//         age: 20,
//         city: "Surat",
//         skills: ["JavaScript", "Node.js", "Express", "React"]
//     };
//     res.render('profile', { user });
// });

// app.get('/', async (req, res) => {
//     let dbData = await dbConnect();
//     dbData = await dbData.find().toArray();
//     res.send(dbData);
// });

// app.post('/store', async (req, res) => {
//     let dbData = await dbConnect();
//     let result = await dbData.insertOne(req.body);

//     res.send(result);
// });

// app.put('/update/:id', async (req, res) => {
//     const dbData = await dbConnect();
//     let result = await dbData.updateOne({_id: new mongoDb.ObjectId(req.params.id)}, {$set: req.body});

//     res.send(result);
// });

// app.delete('/delete/:id', async (req, res) => {
//     console.log(req.params.id);
//     const dbData = await dbConnect();
//     let result = await dbData.deleteOne({_id: new mongoDb.ObjectId(req.params.id)});

//     res.send(result);
// });

app.listen(5000);

// http.createServer((req, resp) => {
//     resp.writeHead(200, { 'Content-Type': 'application/json' });
//     resp.write(JSON.stringify(dataFile));
//     resp.end();
// }).listen(4500);

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
