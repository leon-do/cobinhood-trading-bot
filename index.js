const {remora} = require('./remora')
const get = require('./get')
const parse = require('./get/parse/index')
const order = require('./order')
const lib = require('./lib')

start()
async function start() {
    try {
        const wallet = await get.wallet()
        console.log('wallet', wallet)
        const {coin, balance, side} = parse.wallet(wallet)

        const closedOrders = await get.closedOrders()
        console.log('closedOrders', closedOrders)
        const {lastClosedPrice} = parse.closedOrders(closedOrders)

        const openOrders = await get.openOrders()
        console.log('openOrders', openOrders)
        const {orderId, lastOpenPrice} = parse.openOrders(openOrders)

        const args = {
            coin, // ETH || BTC
            balance, // 9000 || very poor
	        lastTradedPrice: lastOpenPrice || lastClosedPrice, // lastOpenPrice takes priority
	        lastClosedPrice, // to check gainz
            side, // bid || ask
	        orderId // 8850805e-d783-46ec-9af5-30712035e760 || undefined
        }

        // remora is logic that clearly shows my genious and/or stpidity.
        newOrder = await remora(args)

        // if there is an open order, then cancel
        if (args.orderId) {
            const canceled = await order.cancel(args.orderId)
            lib.telegram(`order canceled: ${JSON.stringify(canceled)}`)
        }

        // place order
        const placed = await order.place(newOrder)
        lib.telegram(`order placed: ${JSON.stringify(placed)}`)

        // start again
	    await lib.wait(5000)
        return start()

    } catch (e) {
        console.log(e)
        lib.telegram(`error/restarting...: ${e.message}`)
        await lib.wait(5000)
        return start()
    }
}









