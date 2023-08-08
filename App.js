import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [data, setData] = useState({})
  const fetchDetail = async () => {
    const api = await axios.get('http://localhost:3001/')
    const data = await api.data
    console.log({ data })
    localStorage.setItem('userData', [data.userName, data.password])
    setData(data)
  }

  const generateJsonFile = () => {
    const jsonString = JSON.stringify(data);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'data.json';
    // downloadLink.textContent = 'Download JSON';

     document.body.appendChild(downloadLink).click()
  }


  useEffect(() => {
    fetchDetail()
  }, [0])
  return (
    <div className="App">
      <h5>UserName: {data.userName}</h5>
      <h5>Password: {data.password}</h5>
      <button onClick={() => { generateJsonFile() }}>Kill Me</button>
    </div>
  );
}

export default App;


