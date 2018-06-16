// async wait in milliseconds
function wait(ms) {
	return new Promise(res => {
		setTimeout(() => {
			res(true)
		}, ms)
	})
}

module.exports = { wait }