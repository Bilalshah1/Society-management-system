// way to add member 
const addMember = async(req, res) => {
    //newcode 
    const memberId = req.query.memberId;
    console.log(`Member added successfully: ${memberId}, tuple ID: ${memberId}`);
    res.send(`Member added successfully: ${memberId}, tuple ID: ${memberId}`);
    // res.status(200).send('Member added successfully.');
};
//to get members 
const getMembers = async(req, res) => {

    res.status(200).send('Get members functionality');
};

//delete members
const deleteMember = async (req, res) => {

    //newcode
    const memberId = req.query.memberId;
    console.log(`Member deleted successfully: ${memberId}, tuple ID: ${memberId}`);
    res.send(`Member deleted successfully: ${memberId}, tuple ID: ${memberId}`);
   
};
//update members??????????????????????????


module.exports = {
    getMembers,
    addMember,
    deleteMember
};









///////////////////////////


// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 5000;

// // middleware
// app.use(bodyParser.json());

// // importing routers 
// const tableRoutes = require('./routes/tableRoutes');
// const viewsRoutes = require('./routes/viewsRoutes');
// const membersRoutes = require('./routes/membersRoutes'); // Uncommented

// // Mount your routers
// app.use('/', tableRoutes);
// app.use('/', viewsRoutes);
// app.use('/', membersRoutes); // Uncommented

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

//////////////////////////dbshit////////////////////////
//     //way to get members data 
// const getMembers = (req, res) => {
//     const members = [
//         { id: 1, name: 'Joe mama', permissions: 1 },
//         { id: 2, name: 'ladis ', permissions:2 },
//     ];


//     res.json({ members });
// };

//////////////////testing testing ****123123
///this should be done through api instead 
// const pool = require('./db');

// const getMembers = async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM members');
//         const members = result.rows;
//         client.release(); // release the client back to the pool
//         res.json({ members });
//     } catch (err) {
//         console.error('Error fetching members', err);
//         res.status(500).send('Error fetching members');
//     }
// };
////////////////************************************ */


// const pool = require('../db');