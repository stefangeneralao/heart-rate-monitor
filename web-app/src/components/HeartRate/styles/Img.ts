import styled from 'styled-components';
import type { AnimationStatus, HeartRate } from '../../../types';

interface Props {
  animationStatus?: AnimationStatus;
  heartRate?: HeartRate;
}

export const Img = styled.img<Props>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  width: ${(props) => (props.animationStatus === 'down-beat' ? '95%' : '100%')};
  height: ${(props) =>
    props.animationStatus === 'down-beat' ? '95%' : '100%'};
  transition-duration: ${(props) =>
    props.animationStatus === 'down-beat' ? '100ms' : '900ms'};
  filter: drop-shadow(0 10px 15px black)
    ${(props) => (props.heartRate?.value ? 'brightness(1)' : 'brightness(0)')};
`;

Img.defaultProps = {
  animationStatus: 'down-beat',
  heartRate: { value: null },
};
