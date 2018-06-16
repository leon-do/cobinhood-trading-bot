const {closedOrders} = require('./closedOrders')
const {openOrders} = require('./openOrders')
const {ticker} = require('./ticker')
const {wallet} = require('./wallet')

module.exports = {
	closedOrders,
    openOrders,
    ticker,
    wallet
}
