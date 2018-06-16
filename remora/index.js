const get = require('../get/index')
const lib = require('../lib/index')
const {orderbookVWAP} = require('./calculations/orderbookVWAP')
const config = require('../config/config')
const fs = require('fs')

/*
{ coin: 'ETH',
  balance: '0.039097075598315406',
  lastTradedPrice: '0.079099',
  lastClosedPrice: '0.079099',
  side: 'ask',
  orderId: undefined }
*/
async function remora(_args) {
	// keep trying until something is returned
	while (true) {
		// get VWAP from orderbook
		const orderbook = await get.orderbook()
		// get the appropriate VWAP: ask or bid)
		const VWAP = _args.side === 'ask' ? orderbookVWAP(orderbook.bids) : orderbookVWAP(orderbook.asks);

		/*
			Logic:
			sellers/askers want to sell at the highest price so...
			if the VWAP goes above our lastTradedPrice...
			then create a stop loss at the VWAP
		 */
		if (_args.side === 'ask' && VWAP > _args.lastTradedPrice) {
			// https://cobinhood.github.io/api-public/#place-order
			return {
				trading_pair_id: config.pair,
				stop_price: VWAP.toString(),
				side: 'ask',
				type: 'market_stop',
				size: _args.balance.toString()
			}
		}

		/*
		Logic:
		buyer/bidder want to buy at the lowest price so...
		if the VWAP goes below our lastTradedPrice...
		then create a stop loss at the VWAP
		*/
		if (_args.side === 'bid' && VWAP < _args.lastTradedPrice) {
			// size is in base and requires fuxed up math
			const size = Math.floor(Number(_args.balance) / VWAP * 100000000)/100000000
			// https://cobinhood.github.io/api-public/#place-order
			return {
				trading_pair_id: config.pair,
				stop_price: VWAP.toString(),
				side: 'ask',
				type: 'market_stop',
				size: size.toString()
			}
		}

		// display/save trade status
		const tradeStatus = {
			now: VWAP,
			last: _args.lastClosedPrice,
			side: _args.side,
			'now/last': VWAP / _args.lastClosedPrice
		}
		console.log(tradeStatus)
		fs.writeFileSync('./get/tradeStatus.txt', JSON.stringify(tradeStatus, false, 4))

		// wait 5 seconds then trying again
		await lib.wait(5000)
	}

}

module.exports = {remora}