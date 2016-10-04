const _ = require('lodash')

let Plans = require('../').plans
let Agents = require('../').agents
let Deliberators = require('../').deliberators

module.exports = IntentionRunner;

function IntentionRunner(name) {
  this.name = name

  this.inputs = {}
  this.visualizers = []
  this.planner = null
  this.intentions = {}
  this.outputs = {}

  // Holds the list of attributes that will be computed
  this.intentionAttributes = []

  this.warns = {}

  this.MIN_WEIGHT = 0.01
  this.MAX_INTENTIONS = 10
}

IntentionRunner.prototype.execute = function (agent, world) {
  // 0. Initialization
  let plannerInputs = {}
  let intentionInputs = {}
  let intentionWeights = {}
  let intentionOutputs = {}

  // 1. Aggregate outputs from Visualizer (inputs for intentions)
  this.visualizers.map( p => {
    // 1.1 Execute Visualizer
    let visualizerOutputs = p(agent, world)
    // 1.2 Agregate Visualizer
    _.merge(plannerInputs, visualizerOutputs || {})
  })

  this.inputs = intentionInputs
  console.log(`Planner Inputs: `, intentionInputs)

  // 2. Execute plans
  this.planner.plan(intentionInputs)
  intentionWeights = this.planner.weights()

  // 3. Normalize weights
  let weightSum = ( 1 / _.values(intentionWeights).sum() ) || 0
  intentionWeights = _.mapValues(intentionWeights, v => v * weightSum)

  // 4. Choose intentions based on weights

  // 4.1 Select the ones with weight > MIN_WEIGHT
  let choosenIntentions = _.filter(intentionWeights, w => w >= this.MIN_WEIGHT)

  // 4.2 Sort and limit to MAX_INTENTIONS
  // TODO

  // 5. Execute selected intentions
  for(let intentionName in choosenIntentions) {
    let weight = choosenIntentions[intentionName]

    // 5.1 Get registered intention
    let intention = this.intentions[intentionName]

    // 5.2 Check if intention was registered
    if(!intention){
      // This intention is not registered
      if(intentionName in this.warns){
        continue;
      }

      console.log(`Warn: ${intentionName} being used but not registered`)
      this.warns[intentionName] = true
      continue;
    }

    // 5.3 Execute intention
    intentionOutputs[intentionName] = intention(intentionInputs)
  }

  // 6. Sum intentions

  // 6.1 Initialize variables
  let intentionAttributesWeight = {}
  let intentionAttributesSum = {}

  for(let intention in this.intentionAttributes) {
    intentionAttributesWeight[intention] = 0
    intentionAttributesSum[intention] = 0
  }

  // 6.2 Sum each existing attribute values and weight in selected intentions
  _.forIn(intentionOutputs, (outputs, intention) => {
    let weight = intentionWeights[intention]

    // 6.2.1 Iterate all needed attribute outputs in the current intention
    for(let attr in intentionAttributesSum){
      let value = output[attr]

      // Sum if is valid number
      if(_.isNumber(value)) {
        intentionAttributesWeight[attr] += weight
        intentionAttributesSum[attr] += value * weight
      }
    }
  })

  // 6.3 Clear output object
  this.outputs = {}

  // 6.4 Normalize outputs
  for(let intention in intentionAttributesSum) {
    let weight = intentionAttributesWeight[intention]
    let value = intentionAttributesSum[intention]

    // Normalize
    value = value / weight

    // Filter
    if(!_.isNumber(value)){
      value = null
    }

    this.outputs[intention] = value
  }

  console.log(`Planner Outputs: `, this.outputs)
}

/*
  Register visualizer in array
*/
IntentionRunner.prototype.visualize = function (visualizer) {
  // If given as string, find out generic Plan in global Plans array
  if(_.isString(visualizer)){
    visualizer = Plans[visualizer]
  }

  // Check if it exists
  if(!plan){
    throw `Plan does not exist or not set: ${plan}`
  }

  // Check if plan is already in array
  if(this.plans.indexOf(plan) >= 0){
    console.log(`Plan already registered in plans. Skipping... ${plan}`)
    return
  }

  // Register in plans
  this.plans.push(plan)
}

/*
  Register a intention
*/
IntentionRunner.prototype.useIntention = function (name, method) {
  // Validate method call
  if(!_.isString(name)){
    throw `Invalid intention: ${name}`
  }

  if(!_.isFunction(method)){
    throw `Must provide a valid method for intention ${name}`
  }

  // Is the intention already registered?
  if(name in this.intentions){
    throw `Intention '${name}' already registered`
  }

  this.intentions[name] = method
}

/*
  Add an attribute to be used during computing
*/
IntentionRunner.prototype.useIntentionAttribute = function (name) {
  if(this.intentionAttributes.indexOf(name) >= 0)
    return console.log(`Attribute '${name}' already registered`)

  this.intentionAttributes.push(name)
}
