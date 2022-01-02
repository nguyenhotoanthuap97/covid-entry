const VaccinationService = require('../../services/VaccinationService')

module.exports = {
  submit: async (req, res) => {
    if (req.body) {
      isSuccessful = await VaccinationService.produce(req.body)
      isSuccessful ? res.json({ 'message': 'submitted' }) : res.status(400).json({ 'message': 'failed' })
    }
  }
}