const colors = require('colors')

let first_arg = +process.argv[2]
const second_arg = +process.argv[3]

function isInteger(num) {
  return (num ^ 0) === num
}

if (!isInteger(first_arg) || !isInteger(second_arg)) {
  return console.log(colors.red('Вы ввели не целое или отрицательное число!'))
}

if (isNaN(first_arg) || isNaN(second_arg)) {
  return console.log(colors.red('Вы ввели не число!'))
}

let resultArrPrime = []

if (first_arg === 1) first_arg = 2

nextPrime: for (let i = first_arg; i <= second_arg; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) continue nextPrime
  }

  resultArrPrime.push(i)
}

if (!resultArrPrime.length) {
  return console.log(colors.red('В заданном диапазоне нет простых чисал!'))
}

const trafficLights = ['green', 'yellow', 'red']

let light = 0

resultArrPrime.forEach((num) => {
  const color = trafficLights[light]

  console.log(colors[color](num))

  light++

  if (light === 3) light = 0
})
