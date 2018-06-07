/**
 * import scripts，引入其他脚本
 */
importScripts('../calc.js');

onconnect = function(e) {
	const port = e.ports[0];
	// port.start();

	port.onmessage = function(event) {
		const data = event.data;
		const workerResult = multiply(data.v0, data.v1);
		console.log('【Worker thread】Posting message back to main script');
		port.postMessage(workerResult);
	}
}