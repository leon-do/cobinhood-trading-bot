/*
[{
"id": "8850805e-d783-46ec-9af5-30712035e760",
"trading_pair_id": "COB-ETH",
"side": "bid",
"type": "limit",
"price": "0.0001195",
"size": "212",
"filled": "212",
"state": "filled",
"timestamp": 1526018972869,
"eq_price": "0.0001194999996323",
"completed_at": "2018-05-11T06:09:38.946678Z",
"source": "exchange"
}]
*/
function openOrders(_response) {
	try {
		if (_response.length === 0) {
			// no open orders
			return false
		} else if (_response.length === 1) {
			return {
				orderId: _response[0].id,
				lastOpenPrice: _response[0].price,
			}
		} else {
			return new Error('parsing-too-many-openOrders')
		}
	} catch (e) {
		console.log(e)
		return new Error('unable-to-parse-openOrders')
	}
}

module.exports = {openOrders}