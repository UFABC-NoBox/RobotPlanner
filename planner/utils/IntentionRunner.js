const _ = require('lodash')

let Plans = require('../').plans
let Agents = require('../').agents
let Deliberators = require('../').deliberators

module.exports = IntentionRunner;

function IntentionRunner(name) {
  this.name = name

  this.inputs = {}
  this.visualizers = []
  this.planners = []
  this.intentions = []
  this.outputs = {}
}

IntentionRunner.prototype.execute = function (agent, world) {
  // 0. Initialization
  let plannerInputs = {}
  let plannerOutputs = {}
  let plannerWeights = {}

  // 1. Aggregate outputs from Visualizer (inputs for intentions)
  this.visualizers.map( p => {
    // 1.1 Execute Visualizer
    let visualizerOutputs = p(agent, world)
    // 1.2 Agregate Visualizer
    _.merge(intentionInputs, visualizerOutputs || {})
  })

  console.log(`Intention Inputs: `, intentionInputs)

  // 2. Compute weights
}

/*
  Register plans in array
*/
IntentionRunner.prototype.usePlan = function (plan) {
  // If given as string, find out generic Plan in global Plans array
  if(_.isString(plan)){
    plans = Plans[plan]
  }

  // Check if it exists
  if(!plan){
    throw new Exception(`Plan does not exist or not set: ${plan}`)
  }

  // Check if plan is already in array
  if(this.plans.indexOf(plan) >= 0){
    console.log(`Plan already registered in plans. Skipping... ${plan}`)
    return
  }

  // Register in plans
  this.plans.push(plan)
}
