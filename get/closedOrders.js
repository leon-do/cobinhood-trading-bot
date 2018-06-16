const axios = require('axios')
const config = require('../config/config.js')

/*
{ id: 'b8d126d0-d586-4dbd-a483-0c43586b9337',
  trading_pair_id: 'ETH-BTC',
  side: 'bid',
  type: 'market_stop',
  price: '0.079099',
  size: '0.03909707',
  filled: '0.03909707',
  state: 'filled',
  timestamp: 1528398760874,
  eq_price: '0.079058',
  completed_at: '2018-06-08T02:19:03.437299Z',
  stop_price: '0.079099',
  source: 'exchange' }
*/
async function closedOrders() {
	try {
		let index = 1
		while(true) {
			const response = await axios.get(`https://api.cobinhood.com/v1/trading/order_history?page=${index}`,
				{
					headers: {
						authorization: config.apiKey,
						nonce: Date.now()
					}
				})
			const orders = response.data.result.orders

			const lastFill = orders.find(val => {return val.state === 'filled'})

			if (lastFill) {
				return lastFill
			} else {
				index++
			}
		}
	} catch (e) {
		console.log(e)
		return new Error('unable-to-get-closedOrders')
	}
}

module.exports = { closedOrders }