const VaccinationService = require('../../services/VaccinationService')

module.exports = {
  submit: async (req, res) => {
    if (req.body) {
      isSuccessful = await VaccinationService.produce(req.body)
      isSuccessful ? res.json({ 'message': 'submitted' }) : res.status(400).json({ 'message': 'failed' })
    }
  },
  getAll: async (req, res) => {
    var vaccinations = await VaccinationService.getAllVaccinations().catch(err => {
      console.log('Error while retrieving all vaccinations: ' + err)
      res.json('ERROR: ' + err)
    })
    res.json(vaccinations)
  },
  getVaccinationByCitizenId: async (req, res) => {
    var vaccinations = await VaccinationService.getVaccinationsByCitizenId(req.params.citizenId).catch(err => {
      console.log('Error while retrieving vaccinations by citizen id: ' + err)
      res.json('ERROR: ' + err)
    })
    res.json(vaccinations)
  }
}