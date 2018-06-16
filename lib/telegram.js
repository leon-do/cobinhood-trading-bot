const config = require('../config/config.js')
const Slimbot = require('slimbot')
const slimbot = new Slimbot(config.telegram)
const fs = require('fs')

slimbot
.on('message', () => {
    const tradeStatus = fs.readFileSync('./get/tradeStatus.txt')
    slimbot.sendMessage(403089417, tradeStatus)
})
.startPolling();


function telegram(_message) {
    slimbot.sendMessage(403089417, _message)
}

module.exports = {telegram}