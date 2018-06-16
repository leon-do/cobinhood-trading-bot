const {closedOrders} = require('./closedOrders')
const {openOrders} = require('./openOrders')
const {orderbook} = require('./orderbook')
const {ticker} = require('./ticker')
const {wallet} = require('./wallet')

module.exports = {
	closedOrders,
    openOrders,
	orderbook,
	ticker,
    wallet
}
