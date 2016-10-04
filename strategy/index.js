const fs = require('fs')
const loader = require('../helpers/loader')

let strategy = {
  run: null,
  utils: null,

  plans: null,
  intentions: null,
  visualizers: null,
}

// Load all folder modules
for(let k in strategy) {
  strategy[k] = loader.load(fs.join(__dirname, k))
}

module.exports = strategy
