const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inquirer = require('inquirer');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const question = async (query) => new Promise((resolve) => rl.question(query, resolve));

// (async () => {
//   try {
//     const pathToFile = await question('Please enter path to the file: ');
//     const encode = await question('Please enter encode: ');
//     const pathFile = path.join(__dirname, pathToFile);
//     await fs.readFile(pathFile, encode, (err, data) => {
//       if (err) console.log(err);
//       else console.log(data);
//     });
//     rl.close();
//   } catch (error) {
//     console.log(error);
//     rl.close();
//   }
// })();

const isFile = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return fs.lstatSync(filePath).isFile();
};

const isDirectory = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return fs.lstatSync(filePath).isDirectory();
};

const list = (pathToFolder) => {
  console.log(pathToFolder);
  const fullPath = path.join(__dirname, pathToFolder);
  return fs.readdirSync(fullPath);
};

// console.log(list);

const listOfDir = (pathToFolder) => {
  inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list', // input, number, confirm, checkbox, password
        message: 'Choose a file to read',
        choices: list(pathToFolder),
      },
    ])
    .then((answer) => answer.fileName)
    .then((fileName) => {
      const fullPath = path.join(pathToFolder, fileName);
      if (isDirectory(fullPath)) listOfDir(fileName);
      // console.log(isDirectory(fullPath));
      // const data = fs.readFileSync(filePath, 'utf-8');
      // console.log(data);
    });
};

// inquirer
//   .prompt([
//     {
//       name: 'fileName',
//       type: 'list', // input, number, confirm, checkbox, password
//       message: 'Choose a file to read',
//       choices: list(''),
//     },
//   ])
//   .then((answer) => answer.fileName)
//   .then((fileName) => {
//     // const filePath = path.join(__dirname, fileName);
//     console.log(isDirectory(fileName));
//     // const data = fs.readFileSync(filePath, 'utf-8');
//     // console.log(data);
//   });

listOfDir('');
