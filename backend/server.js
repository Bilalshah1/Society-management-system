const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
// middleware
app.use(bodyParser.json());
app.use(cors());

// importing routers 
const tableRoutes = require('./routes/tableRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const roleRoutes = require('./routes/rolesRoutes');
const userRoutes = require('./routes/userRoutes'); 


app.use('/api/table', tableRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/role', roleRoutes)
app.use('/api/user', userRoutes)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});












//////////----------------------------------------



// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 5000;

// // middleware
// app.use(bodyParser.json());

// // importing routers 
// const tableRoutes = require('./routes/tableRoutes');
// const viewsRoutes = require('./routes/viewsRoutes');
// // const membersRoutes = require('./routes/membersRoutes'); // Uncommented

// // Mount your routers
// app.use('/h', tableRoutes);
// app.use('/', viewsRoutes);
// // app.use('/', membersRoutes); // Uncommented

// // Route for testing
// app.get("/api", (req, res) => {
//   res.json({"users":["u1","u2","u3"]});
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });


////////////////////////////////////////////////////////
// import React ,{useEffect,useState} from 'react'
// // Route handler for /createtableRoute
// app.post('/createtableRoute', (req, res) => {
//   const { tableName, attribs, relations } = req.body;
  
//   // Handle the received data here, for example:
//   console.log('Received data:');
//   console.log('Table Name:', tableName);
//   console.log('Attributes:', attribs);
//   console.log('Relations:', relations);

//   // Respond with a success message
//   res.status(200).send('Table creation request received successfully.');
// });

