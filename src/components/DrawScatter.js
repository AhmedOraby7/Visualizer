import React, { useState, useEffect, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import Chart from 'chart.js';
import Modal from 'react-bootstrap/Modal';

const DrawScatter = ({ points, onRightClick }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState({ datasets: [] });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [minMaxScale, setMinMaxScale] = useState({});

  useEffect(() => {
    if (points && points.length > 0) {
      setMinMaxScale(defineMinMaxScale(points));
      const datasets = [];

      points.forEach((point) => {
        const tempPoint = {
          label: point.id,
          data: [
            {
              x: point.col,
              y: point.row,
            },
          ],
        };
        datasets.push(tempPoint);
      });
      setData({ datasets });
    }
  }, [points]);

  const defineMinMaxScale = (points) => {
    let [minX, maxX, minY, maxY] = [
      Number.MAX_VALUE,
      -Number.MAX_VALUE,
      Number.MAX_VALUE,
      -Number.MAX_VALUE,
    ];
    points.forEach((point) => {
      minX = Math.min(minX, point.col);
      maxX = Math.max(maxX, point.col);
      minY = Math.min(minY, point.row);
      maxY = Math.max(maxY, point.row);
    });

    return {
      minX: Math.floor(minX),
      maxX: Math.ceil(maxX),
      minY: Math.floor(minY),
      maxY: Math.ceil(maxY),
    };
  };

  // Left Click
  const handleScatterClick = (elem) => {
    const pointDetails = elem[0].element;
    setSelectedPoint({
      index: elem[0].datasetIndex,
      x: pointDetails.x,
      y: pointDetails.y,
    });
    setShowModal(true);
  };

  // For a better UX we have to match the exact pixel.
  const getNearestPointLabel = (xCoordinate, yCoordinate, points) => {
    let pointId = -1;
    let similarity = Number.MAX_VALUE;
    points.forEach((point) => {
      // console.log(point, Math.abs(point[attr] - xCoordinate), similarity);
      const currentSim =
        Math.abs(point['col'] - xCoordinate) +
        Math.abs(point['row'] - yCoordinate);
      if (currentSim < similarity) {
        // console.log('POINT ID', pointId);
        similarity = Math.min(similarity, currentSim);
        pointId = point.id;
      }
    });
    console.log('SIM', similarity, pointId);
    if (similarity < 0.07) {
      return pointId;
    }
    return null;
  };

  const handleRightClick = (event, chart) => {
    event.preventDefault();
    const scales = chart.current.scales;
    const x = scales['x'].getValueForPixel(event.pageX);
    const y = scales['y'].getValueForPixel(event.pageY);
    // To do: If there are a lot of points stacked over each others.

    // if (
    //   getNearestPointLabel(x, points, 'col') !==
    //   getNearestPointLabel(y, points, 'row')
    // ) {
    //
    //   console.log('We can decide which point user selected');
    // }
    onRightClick(getNearestPointLabel(x, y, points));
  };

  const options = {
    scales: {
      x: {
        min: minMaxScale.minX,
        max: minMaxScale.maxX,
      },
      y: {
        min: minMaxScale.minY,
        max: minMaxScale.maxY,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (_, elem) => {
      if (elem && elem[0]) {
        handleScatterClick(elem);
      }
    },
  };

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1, width: '600px' }}>
        <Scatter
          width={500}
          height={300}
          ref={chartRef}
          data={data}
          onContextMenu={(event, elem) => {
            handleRightClick(event, chartRef);
          }}
          options={options}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}
      >
        {/* On Left Click */}
        {showModal && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Point Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {Object.keys(points[selectedPoint.index]).map(
                  (innerAttr, index) => {
                    return (
                      <span key={index}>
                        {' '}
                        {innerAttr}: {points[selectedPoint.index][innerAttr]}
                        <br />
                      </span>
                    );
                  }
                )}
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
};

export default DrawScatter;
