import React, { forwardRef } from 'react';
import './Editor.css';

// forwardRef used so the textarea can be focused from outside (like when a note
// is selected).
const Editor = forwardRef(({ className, selectedNote, dispatch }, ref) => (
  <textarea
    className={`editor ${className}`}
    value={selectedNote ? selectedNote.text : ''}
    onChange={(e) => dispatch({type: 'update', text: e.target.value})}
    ref={ref}
  />
));

export default Editor;
