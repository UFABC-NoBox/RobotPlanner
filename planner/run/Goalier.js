module.exports = Goalier

function Goalier(intentionRunner){
  this.intentionRunner = intentionRunner

  // Configure needed Plans
  intentionRunner.usePlan('BorderPlans')

  // Configure needed Intentions
}
