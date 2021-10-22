import * as messaging from "messaging";

const wsUri = "ws://172.20.10.2:3001";
let websocket;

const connect = () => {
  const onOpen = () => {
    console.log("Websocket opened");
  };

  const onClose = () => {
    console.log("Websocket closed");
  };

  const onError = (evt) => {
    console.error(`Websocket failed: ${evt.data}`);
  };

  websocket = new WebSocket(wsUri, "fitbit");
  websocket.addEventListener("open", onOpen);
  websocket.addEventListener("close", onClose);
  websocket.addEventListener("error", onError);
};
connect();

setInterval(() => {
  if (!websocket || websocket.readyState !== 1) {
    console.log("Reconnecting to websocket");
    connect();
  }
}, 1000);

messaging.peerSocket.addEventListener("message", (evt) => {
  if (
    websocket.readyState === 1 &&
    evt.data &&
    evt.data.command === "heart-rate"
  ) {
    const payload = JSON.stringify({
      command: evt.data.command,
      payload: evt.data.heartRate,
    });

    console.log("Sending to server:", payload);
    try {
      websocket.send(payload);
    } catch {
      console.log("Failed to send payload");
    }
  }
});

console.log("hello companion");
