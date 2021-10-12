const fs = require('fs');
const executorDir = process.cwd();
const inquirer = require('inquirer');
const path = require('path');
const readline = require('readline');

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

const isDirectory = (fileName) => {
  return fs.lstatSync(fileName).isDirectory();
};

const backFolder = (directory) => {
  const reg = /\\/;
  const foldersInCarrentDir = directory.split(reg);
  return foldersInCarrentDir.slice(0, foldersInCarrentDir.length - 1).join('\\');
};

const list = (directory) => {
  return fs.readdirSync(directory);
};

const listOfDir = (directory) => {
  inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list',
        message: 'Choose a file to read',
        choices: [...list(directory), '- Enter path of the directory', '<- back', '<- exit ->'],
      },
    ])
    .then((answer) => answer.fileName)
    .then((fileName) => {
      const fullPath = path.join(directory, fileName);

      if (fileName === '<- exit ->') return;

      if (fileName === '<- back') {
        return listOfDir(backFolder(backFolder(fullPath)));
      }

      if (fileName === '- Enter path of the directory') return chooseDir();

      if (isDirectory(fullPath)) listOfDir(fullPath);

      if (isFile(fullPath)) return readFileList(fullPath);
    });
};

listOfDir(executorDir);

const chooseDir = () => {
  inquirer
    .prompt([
      {
        name: 'inputDir',
        type: 'input',
        message: 'Enter the full path of the directory',
      },
    ])
    .then((answer) => listOfDir(answer.inputDir));
};

const readFileList = (filePath) => {
  inquirer
    .prompt([
      {
        name: 'userAnswer',
        type: 'list',
        message: 'Enter the full path of the directory: ',
        choices: ['Read the whole file', 'Find in the file'],
      },
    ])
    .then((answer) => answer.userAnswer)
    .then((userAnswer) => {
      if (userAnswer === 'Read the whole file') {
        return readFile(filePath);
      } else {
        return findInFile(filePath);
      }
    });
};

const findInFile = (filePath) => {
  inquirer
    .prompt([
      {
        name: 'string',
        type: 'input',
        message: 'What do you want to find in the file? ',
      },
    ])
    .then((answer) => answer.string)
    .then((string) => readFile(filePath, string));
};

const readFile = (filePath, reg) => {
  if (!reg) reg = '';

  const data = fs.createReadStream(filePath, 'utf-8');

  const rl = readline.createInterface({
    input: data,
  });

  rl.on('line', (input) => {
    if (!input) return;

    if (!input.includes(reg)) return;

    console.log(input);
  });

  data.on('error', console.log);
  data.on('end', () => listOfDir(backFolder(filePath)));
};
