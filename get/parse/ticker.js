/*
{ trading_pair_id: 'ETH-BTC',
  timestamp: 1528436400000,
  '24h_high': '0.079384',
  '24h_low': '0.078111',
  '24h_open': '0.079384',
  '24h_volume': '302.7567595999998',
  last_trade_price: '0.079125',
  highest_bid: '0.078894',
  lowest_ask: '0.079125' }
*/
function ticker(_response) {
	try {
		return {
			price: _response.last_trade_price
		}
	} catch (e) {
		console.log(e)
		return new Error('unable-to-parse-ticker')
	}
}

module.exports = {ticker}