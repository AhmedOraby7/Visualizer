import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const DrawCurve = ({ curve }) => {
  const [data, setData] = useState();

  const mapCurveToDataset = ({ id, x, y }) => {
    if (!curve || !curve.x || !curve.y) {
      return null;
    }
    return {
      label: `Curve ${id}`,
      fill: false,
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
      data: x.map((val, index) => ({ x: val, y: y[index] })),
    };
  };

  useEffect(() => {
    if (curve) {
      setData({
        datasets: [mapCurveToDataset(curve)],
      });
    }
  }, [curve]);

  return (
    <>
      {data && (
        <Line
          data={data}
          options={{
            id: 'Line',
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      )}
    </>
  );
};

export default DrawCurve;
