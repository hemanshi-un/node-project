import chalk from 'chalk';
import colors from 'colors';
// const app = require('./app.js');

// const fs = require('fs');
// fs.writeFileSync('test.txt', 'This is a test file created using Node.js fs module.');
// // console.log(app.z());

const arr = [2, 4, 7, 1, 3, 8, 3, 5];


let res = arr.filter((val) => {
    return val >= 4;
});

console.log(res);
console.log("Hello".bgBlue, "World".red);

console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));


const http = require('http');


http.createServer((req, resp) => {
    resp.write("<h1>Hello i'm Hemanshi Gajera. I am learning node.js</h1>");
    resp.end();
}).listen(3000);
