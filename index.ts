import express from 'express';
import cors from 'cors';

// Initialize the express engine
const app: express.Application = express();
app.use(cors())
// Take a port 3000 for running server.
const port: number = 3001;


let data =[
    {Employee_ID : '1234', Employee_Name : 'ak'},
    {Employee_ID : '124', Employee_Name : 'ak'},
    {Employee_ID : '134', Employee_Name : 'ak'}
    ]

// Handling '/' Request
app.get('/', (_req, _res) => {
	_res.json(data);
});



// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
});
