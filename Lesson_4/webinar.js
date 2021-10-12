#!
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inquirer = require('inquirer');
const executorDir = process.cwd();
console.log('cwd: ', executorDir);

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
  // const filePath = path.join(executorDir, fileName);
  return fs.lstatSync(fileName).isFile();
};

const isDirectory = (fileName) => {
  // const filePath = path.join(__dirname, fileName);
  return fs.lstatSync(fileName).isDirectory();
};

// const list = (directory, folderName) => {
//   const fullPath = path.join(directory, folderName);
//   return fs.readdirSync(fullPath);
// };

const list = (directory, folderName) => {
  const fullPath = path.join(directory, folderName);
  return fs.readdirSync(fullPath);
};

// console.log(list);

const listOfDir = (directory, folderName) => {
  inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list', // input, number, confirm, checkbox, password
        message: 'Choose a file to read',
        choices: [...list(directory, folderName), 'Back'],
      },
    ])
    .then((answer) => answer.fileName)
    .then((fileName) => {
      const fullPath = path.join(directory, fileName);

      if (fileName === 'Back') {
        const reg = /\\/;
        // const folderInCarrentDir = path.join(directory, fullPath).split(reg);
        const folderInCarrentDir = fullPath.split(reg);
        const backFolder = folderInCarrentDir.slice(0, folderInCarrentDir.length - 2).join('\\');
        return listOfDir(backFolder, '');
      }

      if (isDirectory(fullPath)) {
        console.log('fullPath: ', fullPath);
        console.log('directory: ', directory);
        const nextFolder = path.join(directory, fullPath);
        console.log('nextDir: ', nextFolder);
        return listOfDir(fullPath, '');
      }

      if (isFile(fullPath)) {
        // const filePath = path.join(directory, fullPath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        console.log(data);
      }
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

listOfDir(executorDir, '');

// const reg = /\//;

// const ls = `C:/\/Users/\/insoj/\/OneDrive/\/Документы_Geek/\/Brains/\/node_js`;

// console.log(ls.split(reg));

const reg = '';

const str = 'Gkjkfd i privet';

console.log(str.includes(reg));
