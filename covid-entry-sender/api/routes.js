'use strict'

module.exports = (app) => {
  let statusCtrl = require('./controllers/StatusController')
  let vaccinationCtrl = require('./controllers/VaccinationController')
  let declarationCtrl = require('./controllers/DeclarationController')

  app.route('/status')
    .get(statusCtrl.get)
  app.route('/vaccination/submit')
    .post(vaccinationCtrl.submit)
  app.route('/vaccinations')
    .get(vaccinationCtrl.getAll)
  app.route('/vaccinations/:citizenId')
    .get(vaccinationCtrl.getVaccinationByCitizenId)
  app.route('/declaration/submit')
    .post(declarationCtrl.submit)
    app.route('/declarations')
    .get(declarationCtrl.getAll)
    app.route('/declarations/:citizenId')
    .get(declarationCtrl.getDeclarationByCitizenId)
}