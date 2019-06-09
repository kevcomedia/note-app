import React from 'react';
import './NoteListItem.css';

function NoteListItem(props) {
  // Regex paren is non-capturing, because for some reason `split` splices the
  // captures to the output array.
  const noteLines = props.note.text.split(/(?:\r?\n)+/);
  const noteTitle = noteLines[0].trim();
  const noteFirstLine = noteLines[1].trim();

  let className = 'note-list-item';
  if (props.selected) {
    className += ' note-list-item_selected';
  }

  return (
    <li className={className}>
      <h5 className="note-list-item__title">{noteTitle}</h5>
      <p className="note-list-item__first-line">{noteFirstLine}</p>
    </li>
  );
}

export default NoteListItem;
