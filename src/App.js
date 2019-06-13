import React, { useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import Toolbar from './Toolbar';
import Button from './Button';
import NoteList from './NoteList';
import Editor from './Editor';
import useNotes from './effects/useNotes';
import useStorage from './effects/useStorage';
import './App.css';

function App(props) {
  const editorRef = useRef();

  const [state, dispatch] = useNotes();
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

  useStorage(state, dispatch);

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
