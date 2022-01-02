const DeclarationService = require('../../services/DeclarationService')

module.exports = {
  submit: async (req, res) => {
    if (req.body) {
      isSuccessful = await DeclarationService.produce(req.body)
      isSuccessful ? res.json({ 'message': 'submitted' }) : res.status(400).json({ 'message': 'failed' })
    }
  }
}