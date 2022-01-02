const DeclarationService = require('../../services/DeclarationService')

module.exports = {
  submit: async (req, res) => {
    if (req.body) {
      isSuccessful = await DeclarationService.produce(req.body)
      isSuccessful ? res.json({ 'message': 'submitted' }) : res.status(400).json({ 'message': 'failed' })
    }
  },
  getAll: async (req, res) => {
    var declarations = await DeclarationService.getAllDeclarations().catch(err => {
      console.log('Error while retrieving all declarations: ' + err)
      res.json('ERROR: ' + err)
    })
    res.json(declarations)
  },
  getDeclarationByCitizenId: async (req, res) => {
    var declarations = await DeclarationService.getDeclarationsByCitizenId(req.params.citizenId).catch(err => {
      console.log('Error while retrieving declarations by citizen id: ' + err)
      res.json('ERROR: ' + err)
    })
    res.json(declarations)
  }
}