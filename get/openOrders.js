const axios = require('axios')
const config = require('../config/config')

async function openOrders() {
    try {
	    const response = await axios.get(`https://api.cobinhood.com/v1/trading/orders`,
		    {
			    headers: {
				    authorization: config.apiKey,
				    nonce: Date.now()
			    }
		    })
	    const orders = response.data.result.orders
	    return orders
    } catch (e) {
	    console.log(e)
	    return new Error('unable-to-get-openOrders')
    }

}

module.exports = {openOrders}