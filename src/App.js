import React, { useState } from 'react';
import NoteList from './NoteList';
import Editor from './Editor';
import './App.css';

function App(props) {
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const selectedNote = props.notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="App">
      <NoteList
        className="App__side"
        notes={props.notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={setSelectedNoteId}
      />
      <Editor className="App__main" selectedNote={selectedNote} />
    </div>
  );
}

export default App;
