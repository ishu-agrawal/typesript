// npm i express
// npm i -g nx
// npx tsc --init
// npm init -y


// ------------

// npx create-react-app frontend 


// cd frontend 
 
// npm i axios 



import express from 'express';
import cors from 'cors';

// Initialize the express engine
const app: express.Application = express();
app.use(cors())
// Take a port 3000 for running server.
const port: number = 3001;


const data= {
    userName: "admin",
    password : "12345"
}

// Handling '/' Request
app.get('/', (_req, _res) => {
	_res.json(data);
});



// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
});
