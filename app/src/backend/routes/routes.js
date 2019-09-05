module.exports = function (app) {
    var controller = require('../controllers/controller')

    /* Index route */
    app.get('/', function (req, res) {
        res.send(' <h1 style="font-size:300%;"> Network Tokenized Access! </h1>')
    })

    app.get('/totalConsumption', controller.getTotalConsumption)
    app.get('/userConsumption/:userIP', controller.getUserConsumption)
    app.get('/networkOcupation', controller.getNetworkOcupation)
    app.get('/accessPrice', controller.accessPrice)
    app.get('/userConsumption/:userIP', controller.getUserConsumption)
    app.get('/userCost/:userIP', controller.costPerUser)
    app.get('/userBalance/:userIP', controller.userBalance)


}