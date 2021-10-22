import { IMessageEvent, w3cwebsocket as W3CWebSocket } from 'websocket';

interface ConnectToHeartRateMonitor {
  onConnecting: () => void;
  onConnected: () => void;
  onMessage: (message: IMessageEvent) => void;
  onDisconnected: () => void;
  onError: () => void;
}

export const connectToHeartRateMonitor = ({
  onConnecting,
  onConnected,
  onMessage,
  onDisconnected,
  onError,
}: ConnectToHeartRateMonitor) => {
  onConnecting();

  const host =
    import.meta.env.MODE === 'production'
      ? 'wss://stefangeneralao.com/'
      : 'ws://localhost:4001';

  const client = new W3CWebSocket(`${host}/heart-rate-websocket`, 'web-app');

  client.onopen = () => {
    onConnected();
  };

  client.onmessage = (message) => {
    onMessage(message);
  };

  client.onclose = () => {
    onDisconnected();
  };

  client.onerror = () => {
    onError();
  };
};
