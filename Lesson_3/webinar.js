const fs = require('fs')

const Log_file = './Lesson_3/logi.log'

const data = [
  '127.0.0.1 - - [30/Jan/2021:11:10:16 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"',
  '127.0.0.1 - - [30/Jan/2021:11:10:17 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"',
]

data.forEach((log) => {
  fs.writeFile(
    Log_file,
    log,
    {
      flag: 'a',
    },
    (err) => console.log(err),
  )
})

fs.readFile(
  Log_file,
  {
    encoding: 'utf-8',
  },
  (err, data) => console.log(data),
)
