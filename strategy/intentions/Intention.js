module.exports = Intention

function Intention(name, calculate) {
  this.name = name
  this._calculate = calculate
}

/*
  The `calculate` method is used for computing the real intention given inputs
  from the previous layer. It should NEVER really on it's own weight, as
  weights might not be available at this time.
  Intentions are ALWAYS Weight independent.
*/
Intention.prototype.calculate = (inputs) => {
  return this._calculate(inputs)
}
