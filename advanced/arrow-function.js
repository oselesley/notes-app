const people = [{
  name: 'tobi',
  age: 28
}, {
  name: 'wale',
  age: 22
}, {
  name: 'seyi',
  age: 25
}]

console.log(people.find(person => person.age === 22).name)

const car = {
  name: 'Honda',
  model: 'Civic',
  getSummary () {
    return `The ${this.name} model is ${this.model}`
  }
}

console.log(car.getSummary())
