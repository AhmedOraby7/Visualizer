import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DrawScatter from './components/DrawScatter';
import DrawCurve from './components/DrawCurve';

function App() {
  const [points, setPoints] = useState();
  const [showLine, setShowLine] = useState(false);
  const [lineId, setLineId] = useState(-1);

  useEffect(() => {
    axios
      .get('http://localhost:3001/points')
      .then((response) => setPoints(response.data))
      .catch((error) => console.error(error));
  }, []);

  const onRightClick = (id) => {
    setLineId(id);
    setShowLine(true);
  };

  return (
    <div>
      <DrawScatter points={points} onRightClick={onRightClick} />
      {showLine && <DrawCurve lineId={lineId} />}
    </div>
  );
}

export default App;
