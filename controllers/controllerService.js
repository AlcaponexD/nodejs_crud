const serviceCoins = require('../services/ServiceCoins');

module.exports = {
    async list(req, res) {
        res.send(await serviceCoins.list())
    }
}