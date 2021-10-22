import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeartRate from './components/HeartRate';
import HeartRateChart from './components/HeartRateChart/HeartRateChart';
import { HeartRate as HeartRateValue, ConnectionStatus } from './types';
import { connectToHeartRateMonitor } from './utils/heartRateClient';

interface AppProps {}

const StyledApp = styled.div`
  text-align: center;
  color: black;
`;

type History = { hr: number }[];

const historyMaxLength = 100;

const initialHeartRate: HeartRateValue = { value: null };
const initialConnectionStatus: ConnectionStatus = 'disconnected';
const initialHistory: History = Array(historyMaxLength).fill({ hr: null });

function App({}: AppProps) {
  const [heartRate, setHeartRate] = useState<HeartRateValue>(initialHeartRate);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    initialConnectionStatus,
  );
  const [history, setHistory] = useState<History>(initialHistory);

  useEffect(() => {
    const shiftData = () => {
      if (!heartRate.value) {
        setHistory([...history]);
        return;
      }
      const newValue = { hr: heartRate.value };
      const newHistory = [...history];
      newHistory.unshift(newValue);
      if (newHistory.length >= historyMaxLength) {
        newHistory.pop();
      }
      setHistory(newHistory);
    };
    setTimeout(() => {
      shiftData();
    }, 1000);
  }, [history]);

  useEffect(() => {
    if (heartRate.value) {
      const timeout = setTimeout(() => {
        setHeartRate({ value: null });
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [heartRate]);

  useEffect(() => {
    if (connectionStatus !== 'connected' && connectionStatus !== 'connecting') {
      connectToHeartRateMonitor({
        onConnecting: () => setConnectionStatus('connecting'),
        onConnected: () => setConnectionStatus('connected'),
        onMessage: (message) => {
          setHeartRate({ value: parseInt(message.data as string) });
        },
        onDisconnected: () => setConnectionStatus('disconnected'),
        onError: () => setConnectionStatus('disconnected'),
      });
    }
  }, [connectionStatus]);

  return (
    <StyledApp>
      <HeartRate connectionStatus={connectionStatus} heartRate={heartRate} />
      <HeartRateChart history={history} />
    </StyledApp>
  );
}

export default App;
