import React, { useEffect, useRef, useReducer } from 'react';
import NoteList from './NoteList';
import Editor from './Editor';
import './App.css';

const initialState = {
  notes: [
    { id: 1, text: 'Hello world!\n\nThis is some text\n\nHi there.' },
    { id: 2, text: 'The quick brown fox\n\njumps over\n\nthe lazy dog.' },
  ],
  selectedNoteId: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      if (state.selectedNoteId === null) {
        return state;
      }
      const selectedNoteIndex = state.notes.findIndex(
        ({ id }) => id === state.selectedNoteId,
      );

      const newNotes = [...state.notes];
      newNotes.splice(selectedNoteIndex, 1);

      const selectedNote = state.notes[selectedNoteIndex];
      newNotes.unshift({ ...selectedNote, text: action.text });
      return { notes: newNotes, selectedNoteId: state.selectedNoteId };

    case 'select':
      return { notes: state.notes, selectedNoteId: action.selectedNoteId };

    default:
      throw new Error();
  }
}

function App(props) {
  const editorRef = useRef();

  const [state, dispatch] = useReducer(reducer, initialState);
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId,
  );

  useEffect(
    function focusEditor() {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.selectionEnd = 0;
      }
    },
    [state.selectedNoteId],
  );

  return (
    <div className="App">
      <NoteList
        className="App__side"
        notes={state.notes}
        selectedNoteId={state.selectedNoteId}
        dispatch={dispatch}
      />
      <Editor
        className="App__main"
        selectedNote={selectedNote}
        dispatch={dispatch}
        ref={editorRef}
      />
    </div>
  );
}

export default App;
