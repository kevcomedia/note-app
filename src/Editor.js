import React from 'react';
import './Editor.css';

function Editor({ className, selectedNote }) {
  return (
    <textarea
      className={`editor ${className}`}
      value={selectedNote ? selectedNote.text : ''}
    />
  );
}

export default Editor;
