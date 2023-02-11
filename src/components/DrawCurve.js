import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';

const DrawCurve = ({ lineId }) => {
  const lineRef = useRef(null);
  const [curvesData, setCurvesData] = useState();
  const [curves, setCurves] = useState();
  const [lineIndex, setLineIndex] = useState(-1);

  useEffect(() => {
    axios
      .get('http://localhost:3001/curves')
      .then((response) => setCurves(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (curves && lineId) {
      setLineIndex(curves.findIndex((el) => el.id === lineId));
    }
  }, [curves, lineId]);

  useEffect(() => {
    var data = [];
    var labels = [];

    if (curves && lineIndex >= 0) {
      for (let index = 0; index < curves[lineIndex].x.length; index++) {
        labels.push(curves[lineIndex].x[index]);
        data.push(curves[lineIndex].y[index]);
      }
      setCurvesData({
        labels: labels,
        datasets: [
          {
            data: data,
            tension: 0.4,
            pointRadius: 0,
            hitRadius: 0,
          },
        ],
      });
    }
  }, [curves, lineIndex]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
    },
  };

  return (
    <>
      {curvesData && (
        <div style={{ position: 'relative', zIndex: 1, width: '600px' }}>
          <Line
            data={curvesData}
            ref={lineRef}
            width={500}
            height={300}
            options={options}
          />
        </div>
      )}
    </>
  );
};

export default DrawCurve;
