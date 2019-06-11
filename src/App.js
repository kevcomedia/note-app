import React, { useEffect, useRef, useReducer } from 'react';
import Toolbar from './Toolbar';
import Button from './Button';
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

function addNote(state) {
  const nextId =
    1 + state.notes.map((note) => note.id).reduce((a, b) => (b > a ? b : a), 0);
  const newNotes = [...state.notes];
  newNotes.unshift({ text: '', id: nextId });
  return { ...state, notes: newNotes, selectedNoteId: nextId };
}

function deleteNote(state) {
  if (state.selectedNoteId === null || state.notes.length === 0) {
    return state;
  }

  const selectedNoteIndex = state.notes.findIndex(
    ({ id }) => id === state.selectedNoteId,
  );

  const newNotes = [...state.notes];
  newNotes.splice(selectedNoteIndex, 1);

  return { notes: newNotes, selectedNoteId: null };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return addNote(state);

    case 'delete':
      return deleteNote(state);

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
      <div className="App__side">
        <Toolbar>
          <Button
            label="New Note"
            icon="plus"
            onClick={() => dispatch({ type: 'add' })}
          />
          <Button
            label="Delete"
            icon="trash-alt"
            onClick={() => dispatch({ type: 'delete' })}
          />
        </Toolbar>
        <NoteList
          notes={state.notes}
          selectedNoteId={state.selectedNoteId}
          dispatch={dispatch}
        />
      </div>
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
