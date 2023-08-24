import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 

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

  const handleAddRow = async () => {
    try {
      const response = await axios.post('http://localhost:3001/add', {
        Employee_ID: uuidv4(),
        Employee_Name: 'New Employee'
      });
      const updatedData = response.data;
      setData(updatedData);
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete/${id}`);
      const updatedData = response.data;
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting row:', error);
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
                <button onClick={() => handleDeleteRow(item.Employee_ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateJsonFile}>Generate JSON File</button>
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
}

export default App;
