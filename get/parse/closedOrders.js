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
function closedOrders(_response) {
    try {
	    return {
		    lastClosedPrice: _response.price,
	    }
    } catch (e) {
    	console.log(e)
	    return new Error('unable-to-parse-closedOrders')
    }
}

module.exports = { closedOrders}