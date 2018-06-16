const config = require('../../config/config')

/*
[ { currency: 'BTC',
       type: 'exchange',
       total: '0.00000160302182',
       on_order: '0',
       locked: false,
       usd_value: '0.0123009322077338',
       btc_value: '0.00000160302182' },
     { currency: 'ETH',
       type: 'exchange',
       total: '0.039097075598315406',
       on_order: '0',
       locked: false,
       usd_value: '23.726920462500867070032',
       btc_value: '0.0030900803766960162601566' } ]
*/
function wallet (_response) {
	try {
		const myWallet = _response.filter(val => val.total > 0.001)[0]
		// ignore 0.001 dust
		const coin = myWallet.currency
		const balance = myWallet.total
		// ETH=BTC => [ETH, BTC] => [ask, bid]
		let side
		if (config.pair.split('-').indexOf(coin) === 0) {
			side = 'ask'
		} else if (config.pair.split('-').indexOf(coin) === 1) {
			side = 'bid'
		} else {
			return new Error('unable-to-parse-wallet-side')
		}

		return {
			balance,
			coin,
			side
		}
	} catch (e) {
		console.log(e)
		return new Error('unable-to-parse-wallet')
	}
}

module.exports = {wallet}