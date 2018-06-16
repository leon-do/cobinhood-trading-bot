// https://cobinhood.github.io/api-public/#cancel-order
const axios = require('axios')
const config = require('../config/config')

async function cancel(_orderId) {
	try {
		const response = await axios.delete(`https://api.cobinhood.com/v1/trading/orders/${_orderId}`, {
			headers: {
				authorization: config.apiKey,
				nonce: Date.now()
			}
		})
		return response.data.success
	} catch (e) {
		console.log(e)
		return new Error('unable-to-cancel-order')
	}
}

module.exports = { cancel }