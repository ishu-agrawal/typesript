import express from 'express';
import cors from 'cors';

const app: express.Application = express();
app.use(cors());
app.use(express.json());

const port: number = 3001;

interface Employee {
  Employee_ID: string;
  Employee_Name: string;
}

let data: Employee[] = [
  { Employee_ID: '1', Employee_Name: 'ak' },
  { Employee_ID: '2', Employee_Name: 'ak' },
  { Employee_ID: '3', Employee_Name: 'ak' }
];

app.get('/', (_req, _res) => {
  _res.json(data);
});

app.post('/add', (req, res) => {
  const { Employee_ID, Employee_Name } = req.body;

  const newItem: Employee = {
    Employee_ID,
    Employee_Name
  };

  data.push(newItem);
  res.json(data);
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const index = data.findIndex((item) => item.Employee_ID === id);

  if (index !== -1) {
    data[index].Employee_Name = name;
    res.json(data);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  const index = data.findIndex((item) => item.Employee_ID === id);

  if (index !== -1) {
    data.splice(index, 1); // Remove the item at the index
    res.json(data);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`TypeScript with Express: http://localhost:${port}/`);
});
