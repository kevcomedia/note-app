import React, { forwardRef } from 'react';
import './Editor.css';

// forwardRef used so the textarea can be focused from outside (like when a note
// is selected).
const Editor = forwardRef(({ className, selectedNote }, ref) => (
  <textarea
    className={`editor ${className}`}
    value={selectedNote ? selectedNote.text : ''}
    ref={ref}
  />
));

export default Editor;
