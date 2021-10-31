const fs = require('fs')
const fsPromises = require('fs/promises')
const Log_file = './Lesson_3/logi.log'

const requests = [
  '127.0.0.1 - - [30/Jan/2021:11:10:16 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"',
  '127.0.0.1 - - [30/Jan/2021:11:10:17 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"',
]

requests.forEach((log) => {
  fs.writeFile(
    Log_file,
    `${log}\n`,
    {
      flag: 'a',
    },
    (err) => {
      if (err) console.log
    },
  )
})
// try {
//   const data = fs.readFileSync(Log_file, {})
//   console.log(data.toString())
// } catch (error) {
//   console.log(error)
// }

// fs.readFile(Log_file, (err, data) => {
//   if (err) console.log(err)
//   else console.log(data.toString())
// })

fsPromises.readFile(Log_file, 'utf-8').then(console.log).catch(console.log)
