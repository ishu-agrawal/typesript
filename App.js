import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const fetchDetail = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      const fetchedData = response.data;
      localStorage.setItem('userData', JSON.stringify(fetchedData));
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateJsonFile = () => {
    const jsonString = JSON.stringify(data);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'data.json';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Employee_ID</th>
            <th>Employee_Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Employee_ID}</td>
              <td>{item.Employee_Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateJsonFile}>Generate JSON File</button>
    </div>
  );
}

export default App;
