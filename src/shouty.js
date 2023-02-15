class Person {
  constructor(network) {
    this.messages = []
    this.network = network
    this.network.subscribe(this)
  }
  moveTo(distance) {

  }
  shout(message) {
    this.network.broadcast(message)
  }
  hear(message) {
    this.messages.push(message)
  }

  messagesHeard() {
    return this.messages
  }
}

class Network {
  constructor() {
    this.subscribers = []
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
  broadcast(message) {
    this.subscribers.forEach(subscriber => subscriber.hear(message))
  }

  hear(message) {
    this.broadcast(message)
  }
  send(message) {
    this.subscribers.forEach(subscriber => subscriber.moveTo(message))
  }
  stop() {
    this.subscribers = []
  }
  start() {

  }
  stop() {

  }
}

module.exports = { Person, Network }
