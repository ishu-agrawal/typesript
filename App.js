import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const fetchDetail = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      const fetchedData = response.data;
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

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/edit/${id}`, {
        name: editedName
      });
      const updatedData = response.data;
      setData(updatedData);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Employee_ID}</td>
              <td>
                {editingId === item.Employee_ID ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  item.Employee_Name
                )}
              </td>
              <td>
                {editingId === item.Employee_ID ? (
                  <button onClick={() => handleSaveEdit(item.Employee_ID)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(item.Employee_ID, item.Employee_Name)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateJsonFile}>Generate JSON File</button>
    </div>
  );
}

export default App;
