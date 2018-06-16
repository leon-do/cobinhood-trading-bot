// https://cobinhood.github.io/api-public/#place-order
const axios = require('axios')
const config = require('../config/config')

async function place(_newOrder) {
	try {
		const response = await axios.post('https://api.cobinhood.com/v1/trading/orders', _newOrder, {
			headers: {
				authorization: config.apiKey,
				nonce: Date.now(),
			}
		})
		return response.data.result.order
	} catch (e) {
		console.log(e)
		return new Error('unable-to-place-order')
	}
}

module.exports = { place }
