import WebSocket, { WebSocketServer } from 'ws';

const port = 4001;

const wss = new WebSocketServer({ port }, () => {
  console.log(`Listening on port ${port}.`);
});

let webAppClients: WebSocket[] = [];

wss.on('connection', (ws, req) => {
  const clientType = req.headers['sec-websocket-protocol'];

  if (clientType === 'web-app') {
    webAppClients.push(ws);
  }

  if (clientType === 'fitbit') {
    ws.on('message', (message) => {
      const { command, payload } = JSON.parse(message.toString());

      switch (command) {
        case 'heart-rate':
          const dateString = new Date().toLocaleString();
          console.log(
            `${dateString} | Heart rate = ${payload} | Number of clients: ${webAppClients.length}`,
          );
          webAppClients.forEach((webAppClient) => {
            webAppClient.send(payload);
          });
          break;

        default:
          console.log('Unrecognised websocket command');
      }
    });
  }

  console.log(`Client connected: ${clientType}`);
});

const clearClosedWebAppClients = () => {
  webAppClients = webAppClients.filter((client) => client.readyState === 1);
};
setInterval(clearClosedWebAppClients, 5000);
