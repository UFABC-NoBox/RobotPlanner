module.exports = Goalier

function Goalier(intentionRunner){
  this.intentionRunner = intentionRunner

  // Configure needed Plans
  intentionRunner.usePlan('BorderPlans')

  // Configure needed Intentions
  intentionRunner.useIntention('test', (inputs) => {
    return {
      x: 10,
      y: 20,
      theta: null,
    }
  })

  // Configure output attributes
  intentionRunner.useIntentionAttribute('x')
  intentionRunner.useIntentionAttribute('y')
  intentionRunner.useIntentionAttribute('theta')
  intentionRunner.useIntentionAttribute('beep')
}
