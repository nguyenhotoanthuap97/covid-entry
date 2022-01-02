'use strict'

module.exports = (app) => {
  let statusCtrl = require('./controllers/StatusController')
  app.route('/status')
    .get(statusCtrl.get)
}