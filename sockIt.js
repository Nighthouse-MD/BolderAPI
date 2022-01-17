const webSocketsServerPort = 3005 || process.env.PORT;;
import { server as webSocketServer } from 'websocket';
import { createServer } from 'http';
// Spinning the http server and the websocket server.
const server = createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' new connection from origin ' + request.origin + '.');

    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;

    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
    connection.on('message', function (message) {
        //do stuff with the message
        // if (message.type === 'utf8') {
        //     const dataFromClient = JSON.parse(message.utf8Data);
        //     const json = { type: dataFromClient.type };
        //     if (dataFromClient.type === typesDef.USER_EVENT) {
        //         users[userID] = dataFromClient;
        //         userActivity.push(`${dataFromClient.username} joined to edit the document`);
        //         json.data = { users, userActivity };
        //     } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        //         editorContent = dataFromClient.content;
        //         json.data = { editorContent, userActivity };
        //     }
        //     sendMessage(JSON.stringify(json));
        // }
    });

    // user disconnected
    connection.on('close', function (connection) {
        console.log('connection closed for userID' + userID);
        delete clients[userID];
    });
});

const sendMessage = (json) => {
    // We are sending the current data to all connected clients
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
    });
}

export { sendMessage };