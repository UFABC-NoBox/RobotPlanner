const fs = require('fs')
const loader = require('../helpers/loader')

let plans = {
  utils: loader.load(fs.join(__dirname, 'utils')),
  agents: loader.load(fs.join(__dirname, 'agents')),
  planners: loader.load(fs.join(__dirname, 'planners')),
  intentions: loader.load(fs.join(__dirname, 'intentions')),
  objectives: loader.load(fs.join(__dirname, 'objectives')),
}

module.exports = plans
