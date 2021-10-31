const EventEmitter = require('events')
const emitter = new EventEmitter()
const RequestTypes = [
  {
    type: 'send',
    payload: 'to send',
  },
  {
    type: 'receive',
    payload: 'to receive',
  },
  {
    type: 'sign',
    payload: 'to sign',
  },
]

class Customer {
  constructor({ type, payload }) {
    this.type = type
    this.payload = payload
  }
}

const generateIntInRang = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateNewCustomer = () => {
  const params = RequestTypes[generateIntInRang(0, RequestTypes.length - 1)]
  return new Customer(params)
}

const run = async () => {
  const { type, payload } = generateNewCustomer()

  emitter.emit(type, payload)

  await new Promise((resolve) => setTimeout(resolve, generateIntInRang(1000, 5000)))
  run()
}

class Handler {
  static send(payload) {
    console.log(payload)
  }

  static receive(payload) {
    console.log(payload)
  }

  static sign(payload) {
    console.log(payload)
  }
}

emitter.on('send', Handler.send)
emitter.on('receive', Handler.receive)
emitter.on('sign', Handler.sign)

run()
