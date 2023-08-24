import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  // const [counter, setCounter] = useState(1);

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

  const handleSaveEdit = (id) => {
    // Find the edited item and update its name
    const updatedData = data.map(item =>
      item.Employee_ID === id ? { ...item, Employee_Name: editedName } : item
    );

    axios.put(`http://localhost:3001/edit/${id}`, { name: editedName })
      .then(() => {
        setData(updatedData);
        setEditingId(null);
        setEditedName('');
      })
      .catch((error) => {
        console.error('Error saving edit:', error);
      });
  };

  const handleAddRow = () => {
    const prevId = data[data.length - 1].Employee_ID;
    const newId = (parseInt(prevId) + 1).toString();

    const newItem = {
      Employee_ID: newId,
      Employee_Name: editedName || 'New Employee' // Use entered name or default
    };

    axios.post('http://localhost:3001/add', newItem)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error adding row:', error);
      });

    setEditedName(''); // Reset editedName state  
  };

  const handleDeleteRow = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error deleting row:', error);
      });
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
