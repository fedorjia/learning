const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wsserver = new WebSocket.Server({ server });

wsserver.on('connection', (ws) => {

	//connection is up, let's add a simple simple event
	ws.on('message', (message) => {

		//log the received message and send it back to the client
		console.log('received: %s', message);
		ws.send(`Hi, I am WebSocket server, i have received your message :)`);
	});

	//send immediatly a feedback to the incoming connection
	ws.send('Connection ok, Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8080, () => {
	console.log(`Server started on port ${server.address().port} :)`);
});