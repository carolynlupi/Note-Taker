const express = require('express');
const router = express.Router(); // Create an instance of an Express router
const fs = require('fs');
const uniqid = require('uniqid'); // npm package for unique IDs

// Function to save note to db.json
function saveNoteToDB(note) {
    console.log('Saving note to db.json:', note);
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return;
    }

    const notes = JSON.parse(data);
    notes.push(note);

    fs.writeFile('db.json', JSON.stringify(notes, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to db.json:', err);
      } else {
        console.log('Note saved to db.json');
      }
    });
  });
}

// Route to handle saving a new note
router.post('/api/notes', (req, res) => {
    console.log('Received POST request to /api/notes', req.body);
    const newNote = {
      id: generateUniqueId(),
      title: req.body.title,
      text: req.body.text,
    };
  
    saveNoteToDB(newNote);
    res.json(newNote);
  });
  
  // Function to generate a unique ID
function generateUniqueId() {
    return Date.now().toString();
  }
  
module.exports = router; // Export the Express router