// adding in dependencies 
const path = require('path');
const fs = require('fs')

// npm package that allows for unique ids to be created
var uniqid = require('uniqid');

// routing
module.exports = (app) => {
    // read the db.json file and return all saved notes as JSON.
    app.get('/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json', 'utf8');
        console.log('Read DB:', db);
        db = JSON.parse(db);
    });

    // receive a new note to save on the request body, 
    // add it to the db.json file, and then return the new note to the client. 
    app.post('/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(userNote);
    });

    // receive a query parameter containing the id of a note to delete.
    app.delete('/notes/:id', (req, res) => {
        // reading notes from db.json
        let db = JSON.parse(fs.readFileSync('db/db.json'));
        // removing note with id
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        // Rewriting notes to db.json
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        // Sending the response after deleting the note
        res.json(deleteNotes);
    });

};