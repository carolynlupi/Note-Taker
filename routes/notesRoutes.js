const express = require('express');
const router = express.Router(); // Create an instance of an Express router
const fs = require('fs');

// Route to handle requests to /notes
router.get('/', (req, res) => {
  // Read the notes from your db.json file and send them as a response
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).json({ error: 'An error occurred while reading notes' });
      return;
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Route to handle saving a new note
router.post('/notes', (req, res) => {
  // Handle the logic to save the new note to your db.json file
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

// Function to save note to db.json
function saveNoteToDB(note) {
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

module.exports = router; // Export the Express router
