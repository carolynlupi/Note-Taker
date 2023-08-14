
 // variables
  var $noteTitle = $(".note-title");
  var $noteText = $(".note-textarea");
  var $saveNoteBtn = $(".save-note");
  var $newNoteBtn = $(".new-note");
  var $noteList = $(".list-container .list-group");

// this is used to keep track of the note in the textarea
  var activeNote = {};
  
// Handle saving a note
  var handleNoteSave = function () {
    var newNote = {
      id: generateUniqueId(),
      title: $noteTitle.val(),
      text: $noteText.val(),
    }

    $.ajax({
      type: 'POST',
      url: '/notes', // This should match your server route
      data: newNote,
      success: function (data) {
        console.log('Note saved:', data);
        getAndRenderNotes();
        renderActiveNote();
      },
      error: function (error) {
        console.error('Error saving note:', error);
      }
    });

    // Save the note to localStorage
    saveNoteToLocal(newNote);
    getAndRenderNotes();
    renderActiveNote();
  };

  function generateUniqueId() {
    // timestamp for simplicity
    return Date.now().toString();
  }

  // Save a note to localStorage
  var saveNoteToLocal = function (note) {
    var notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  var renderActiveNote = function () {
    // Hide the save button
    $saveNoteBtn.hide();

    if (activeNote.id) {
      // Populate the form fields with active note's data
      $noteTitle.attr("readonly", true).val(activeNote.title);
      $noteText.attr("readonly", true).val(activeNote.text);
    } else {
      // Clear the form fields
      $noteTitle.attr("readonly", false).val("");
      $noteText.attr("readonly", false).val("");
    }
  };

  // Retrieve notes from localStorage
  var getNotesFromLocal = function () {
    return JSON.parse(localStorage.getItem("notes")) || [];
  };

  var handleNoteDelete = function (event) {
    event.stopPropagation();

    var note = $(this).parent(".list-group-item").data();

    if (activeNote.id === note.id) {
      activeNote = {};
    }

    deleteNoteFromLocal(note.id);
    getAndRenderNotes();
    renderActiveNote();
  };

  var deleteNoteFromLocal = function (id) {
    var notes = getNotesFromLocal();
    
    var updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  var handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
  };

  var handleNewNoteView = function () {
    activeNote = {};
    renderActiveNote();
  };

  var handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      $saveNoteBtn.hide();
    } else {
      $saveNoteBtn.show();
    }
  };

  var renderNoteList = function (notes) {
    console.log("$noteList:", $noteList); 
    $noteList.empty();

    var noteListItems = [];

    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];

      var $li = $("<li class='list-group-item'>").data(note);
      var $span = $("<span>").text(note.title);
      var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );

      $li.append($span, $delBtn);
      noteListItems.push($li);
    }
    $noteList.append(noteListItems);
  };

  var getAndRenderNotes = function () {
    var notes = getNotesFromLocal();
    renderNoteList(notes);
  };

  $saveNoteBtn.on("click", handleNoteSave);
  $noteList.on("click", ".list-group-item", handleNoteView);
  $newNoteBtn.on("click", handleNewNoteView);
  $noteList.on("click", ".delete-note", handleNoteDelete);
  $noteTitle.on("keyup", handleRenderSaveBtn);
  $noteText.on("keyup", handleRenderSaveBtn);
 
  getAndRenderNotes();

