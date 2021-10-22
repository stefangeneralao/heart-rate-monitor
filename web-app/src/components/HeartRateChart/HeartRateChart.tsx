import React from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

const StyledLineChart = styled(LineChart)`
  margin: auto;
`;

interface IProps {
  history: { hr: number }[];
}

const HeartRateChart = ({ history }: IProps) => {
  return (
    <StyledLineChart width={500} height={300} data={history}>
      <XAxis dataKey="second" tick={false} />
      <YAxis />
      <Line
        type="monotone"
        dataKey="hr"
        stroke="#8884d8"
        isAnimationActive={false}
        dot={false}
      />
    </StyledLineChart>
  );
};

export default HeartRateChart;
