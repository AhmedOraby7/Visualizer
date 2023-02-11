import React from 'react';
import { Scatter } from 'react-chartjs-2';

const CustomScatterChart = (props) => {
  const data = {
    datasets: [
      {
        label: 'My Data',
        data: [
          { x: 2, y: 10 },
          { x: 3, y: 5 },
          { x: 4, y: 8 },
          { x: 5, y: 7 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        min: 1,
        max: 12,
      },
      y: {
        min: 1,
        max: 11,
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

export default CustomScatterChart;
