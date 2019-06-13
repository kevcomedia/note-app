import React, { useRef } from 'react';
import Toolbar from './Toolbar';
import Button from './Button';
import NoteList from './NoteList';
import Editor from './Editor';
import useNotes from './hooks/useNotes';
import './App.css';

function App(props) {
  const editorRef = useRef();

  const [
    notes,
    selected,
    add,
    remove, // delete is a keyword, which sucks. Used remove instead.
    update,
    select,
  ] = useNotes(editorRef);

  return (
    <div className="App">
      <div className="App__side">
        <Toolbar>
          <Button label="New Note" icon="plus" onClick={add} />
          <Button label="Delete" icon="trash-alt" onClick={remove} />
        </Toolbar>
        <NoteList
          notes={notes}
          selectedNoteId={selected ? selected.id : null}
          onNoteSelect={select}
        />
      </div>
      <Editor
        className="App__main"
        selectedNote={selected}
        onChange={update}
        ref={editorRef}
      />
    </div>
  );
}

export default App;
