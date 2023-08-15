const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const notesRoutes = require('./routes/notesRoutes'); 
const app = express();
const PORT = process.env.PORT || 3001;
const jsonServer = require('json-server');

const cors = require('cors'); // Import the cors package
const router = jsonServer.router('db.json');

// Use the cors middleware to allow requests from any origin
app.use(cors());

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Use the routes
app.use('/api', apiRoutes); // Handle API routes
app.use('/notes', notesRoutes); // Handle notes routes
app.use('/', htmlRoutes); // Handle HTML routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
