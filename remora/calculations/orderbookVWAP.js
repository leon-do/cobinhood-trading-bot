function orderbookVWAP(_orderbook) {
	let numerator = 0
	let denominator = 0
	for (const order of _orderbook) {
		const price = order[0]
		const count = order[2]
		numerator += price * count
		denominator += Number(count)
	}
	const VWAP = numerator / denominator
	return VWAP
}


module.exports = { orderbookVWAP }