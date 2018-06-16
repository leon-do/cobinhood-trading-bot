const axios = require('axios')
const config = require('../config/config')
/*
{ trading_pair_id: 'ETH-BTC',
  timestamp: 1528427820000,
  '24h_high': '0.079792',
  '24h_low': '0.078111',
  '24h_open': '0.079365',
  '24h_volume': '266.86050270999976',
  last_trade_price: '0.079085',
  highest_bid: '0.078802',
  lowest_ask: '0.079128' }
*/
async function ticker() {
	try {
		const response = await axios.get(`https://api.cobinhood.com/v1/market/tickers/${config.pair}`)
		return response.data.result.ticker
	} catch (e) {
		console.log(e)
		return new Error('unable-to-get-ticker')
	}
}

module.exports = { ticker }