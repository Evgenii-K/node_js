const fs = require('fs')
const readline = require('readline')
const ACCESS_LOG = './Lesson_3/access.log'
const regIp = /\d+.\d+.\d+.\d+/
const searchIp = ['89.123.1.41', '34.48.240.111']

const data = fs.createReadStream(ACCESS_LOG)

const rl = readline.createInterface({
  input: data,
})

rl.on('line', (input) => {
  if (!input) return

  const ip = input.match(regIp)[0]

  if (!searchIp.includes(ip)) return

  fs.appendFile(`./Lesson_3/${ip}_requests.log`, `${input}\n`, (err) => {
    if (err) console.log(err)
  })
})

data.on('error', console.log)
