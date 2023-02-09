import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DrawScatter from './components/DrawScatter';

function App() {
  const [points, setPoints] = useState([]);
  const [curves, setCurves] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/points')
      .then((response) => setPoints(response.data))
      .catch((error) => console.error(error));
    axios
      .get('http://localhost:3001/curves')
      .then((response) => setCurves(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <DrawScatter points={points} curves={curves} />
    </>
  );
}

export default App;
