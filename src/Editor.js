import React from 'react';
import './Editor.css';

function Editor(props) {
  const className = `editor ${props.className}`;
  return <textarea className={className} value={props.selectedNote.text} />;
}

export default Editor;
