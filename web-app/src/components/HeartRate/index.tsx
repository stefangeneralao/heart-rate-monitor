import React, { useState, useEffect } from 'react';
import heartImg from 'src/heart.svg';
import { AnimationStatus, ConnectionStatus, HeartRate } from '../../types';
import { HeartRate as StyledHeartRate, Img, P } from './styles';

const initialAnimationStatus: AnimationStatus = 'no-beat';

interface IProps {
  heartRate: HeartRate;
  connectionStatus: ConnectionStatus;
}

function HeartRate({ heartRate, connectionStatus }: IProps) {
  const [animationStatus, setAnimationStatus] = useState<AnimationStatus>(
    initialAnimationStatus,
  );

  useEffect(() => {
    if (animationStatus !== 'no-beat' || !heartRate.value) {
      return;
    }

    const cycleLength = (60 / heartRate.value) * 1000 || 1000;
    setAnimationStatus('up-beat');

    setTimeout(() => {
      setAnimationStatus('down-beat');

      setTimeout(() => {
        setAnimationStatus('up-beat');

        setTimeout(() => {
          setAnimationStatus('no-beat');
        }, (cycleLength * 2) / 4);
      }, (cycleLength * 1) / 4);
    }, (cycleLength * 1) / 4);
  }, [animationStatus, heartRate.value]);

  if (connectionStatus !== 'connected' || !heartRate.value) {
    return (
      <StyledHeartRate>
        <Img src={heartImg} alt="heart" />
        <P>{'-'}</P>
      </StyledHeartRate>
    );
  }

  return (
    <StyledHeartRate>
      <Img
        src={heartImg}
        alt="heart"
        animationStatus={animationStatus}
        heartRate={heartRate}
      />
      <P>{heartRate.value}</P>
    </StyledHeartRate>
  );
}

export default HeartRate;
