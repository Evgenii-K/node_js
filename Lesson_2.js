const formatDistanceToNowStrict = require('date-fns/formatDistanceToNowStrict')
const EventsEmitter = require('events')
const emitter = new EventsEmitter()

if (process.argv.length < 3) {
  return console.log('Вы не ввели дату!')
}

class Handler {
  static showDistance(inputDate) {
    const distance = formatDistanceToNowStrict(inputDate, {
      includeSeconds: true,
    })
    console.log('До события осталось: ', distance)
  }

  static endDistance() {
    console.log('Событие свершилось!')
  }
}

emitter.on('showDistance', Handler.showDistance)
emitter.on('endDistance', Handler.endDistance)

const normalizeDate = (date) => {
  date = date.split('-').reverse()
  const year = date[0]
  const month = date[1] > 11 ? date[1] : `0${date[1]}`
  const day = date[2].length < 2 ? `0${date[2]}` : date[2]
  const minutes = date[3].length < 2 ? `0${date[3]}` : date[3]
  const hour = date[4].length < 2 ? `0${date[4]}` : date[4]

  return `${year}-${month}-${day}T${hour}:${minutes}:00.000`
}

const inputDateArray = []

for (let i = 2, length = process.argv.length; i < length; i++) {
  const date = process.argv[i]

  inputDateArray.push(new Date(normalizeDate(date)))
}

const run = async () => {
  console.clear()

  inputDateArray.forEach((date) => {
    if (date <= new Date()) {
      emitter.emit('endDistance')
    } else {
      emitter.emit('showDistance', date)
    }
  })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  await run()
}

run()

// const showDistance = (inputDate) => {
//   if (inputDate <= new Date()) {
//     console.log('Событие свершилось!')
//   } else {
//     const distance = formatDistanceToNowStrict(inputDate, {
//       includeSeconds: true,
//     })
//     console.log(distance)
//   }
// }

// setInterval(() => {
//   inputDateArray.forEach((date) => {
//     Promise.resolve().then(() => {
//       showDistance(date)
//     })
//   })
//   console.clear()
// }, 1000)
