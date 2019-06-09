import React from 'react';
import NoteList from './NoteList';
import Editor from './Editor';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <NoteList className="App__side" notes={props.notes} />
      <Editor className="App__main" selectedNote={props.notes[0]} />
    </div>
  );
}

export default App;
