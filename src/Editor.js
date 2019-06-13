import React, { forwardRef } from 'react';
import './Editor.css';

// forwardRef used so the textarea can be focused from outside (like when a note
// is selected).
const Editor = forwardRef(({ className, selectedNote, onChange }, ref) => (
  <textarea
    className={`editor ${className}`}
    value={selectedNote ? selectedNote.text : ''}
    onChange={(e) => onChange(e.target.value)}
    ref={ref}
  />
));

export default Editor;
