(function() {
	const ws = new WebSocket("ws://localhost:8080");

	ws.onopen = function(evt) {
		const msg = 'Hello, i am a WebSocket client.';
		console.log(`Connection opened, send message: ${msg}`);
		ws.send(msg);
	};

	ws.onmessage = function(evt) {
		console.log( "Received Message: " + evt.data);
		// ws.close();
	};

	ws.onclose = function(evt) {
		console.log("Connection closed.");
	};
})()