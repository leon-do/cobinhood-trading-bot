// https://cobinhood.github.io/api-public/#get-order-history
const axios = require('axios')
const config = require('../config/config')

async function wallet() {
	try {
		const response = await axios.get('https://api.cobinhood.com/v1/wallet/balances', {
			headers: {
				authorization: config.apiKey
			}
		})
		return response.data.result.balances
	} catch (e) {
		console.log(e)
		return new Error ('unable-to-get-wallet')
	}
}

module.exports = { wallet }
