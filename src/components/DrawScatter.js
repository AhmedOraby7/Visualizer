import React, { useState, useEffect, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import Chart from 'chart.js';
import Modal from 'react-bootstrap/Modal';
import DrawCurve from './DrawCurve';

const DrawScatter = ({ points, curves }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState({ datasets: [] });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (points.length > 0) {
      const datasets = [];
      points.forEach((point) => {
        const tempPoint = {
          label: point.id,
          data: [
            {
              x: point.row,
              y: point.col,
            },
          ],
        };
        datasets.push(tempPoint);
      });
      setData({ datasets });
    }
  }, [points]);

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

  const handleRightClick = (event, chart) => {
    event.preventDefault();
    console.log(event, chart);
  };

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1, width: '600px' }}>
        <Scatter
          ref={chartRef}
          data={data}
          onContextMenu={(event, elem) => {
            handleRightClick(event, chartRef);
          }}
          options={{
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
          }}
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
