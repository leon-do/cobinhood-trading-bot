const axios = require('axios')
const config = require('../config/config')

async function orderbook() {
	try {
		const response = await axios.get(`https://api.cobinhood.com/v1/market/orderbooks/${config.pair}`)
		return response.data.result.orderbook
	} catch (e) {
		console.log(e)
		return new Error ('unable-to-get-orderbook')
	}

}

module.exports = { orderbook }