/**
 * import scripts，引入其他脚本
 */
importScripts('../calc.js');

/**
 * 介绍UI主线程的消息
 */
onmessage = function(event) {
	const data = event.data;
	console.log('【Worker thread】Message received from main script');
	// 引入calc脚本，使用multipy方法
	const workerResult = multiply(data.v0, data.v1);
	console.log('【Worker thread】Posting message back to main script');

	// 发送给UI主线程
	postMessage(workerResult);
}