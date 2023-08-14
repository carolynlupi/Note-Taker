// adding in dependencies
const path = require('path');

// routing
module.exports = (app) => {
  // creating routes
  // return the notes.html file.
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  // GET * should return the index.html file.
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  })
};