import React, { useState, useEffect, useRef } from 'react';
import NoteList from './NoteList';
import Editor from './Editor';
import './App.css';

function App(props) {
  const editorRef = useRef();

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const selectedNote = props.notes.find((note) => note.id === selectedNoteId);

  useEffect(
    function focusEditor() {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.selectionEnd = 0;
      }
    },
    [selectedNoteId],
  );

  return (
    <div className="App">
      <NoteList
        className="App__side"
        notes={props.notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={setSelectedNoteId}
      />
      <Editor
        className="App__main"
        selectedNote={selectedNote}
        ref={editorRef}
      />
    </div>
  );
}

export default App;
