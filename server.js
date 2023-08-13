// Dependencies
const express = require('express');
const apiRoutes = require('/routes/apiRoutes'); 
const htmlRoutes = require('/routes/htmlRoutes');
const path = require('path');
const fs = require("fs");
const uuid = require("uuid");
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// Sets up express app to handle data parser, middleware to create req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the routes
app.use('/api', apiRoutes); // Mount the apiRoutes under '/api' path
app.use('/', htmlRoutes);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the htmlRoutes for other routes
app.use(htmlRoutes);

// Use CORS middleware
app.use(cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server available at localhost:${PORT}`);
});
