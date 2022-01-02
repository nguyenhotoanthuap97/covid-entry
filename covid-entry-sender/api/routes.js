'use strict'

module.exports = (app) => {
  let statusCtrl = require('./controllers/StatusController')
  let vaccinationCtrl = require('./controllers/VaccinationController')
  let declarationCtrl = require('./controllers/DeclarationController')

  app.route('/status')
    .get(statusCtrl.get)
  app.route('/vaccination/submit')
    .post(vaccinationCtrl.submit)
  app.route('/declaration/submit')
    .post(declarationCtrl.submit)
}