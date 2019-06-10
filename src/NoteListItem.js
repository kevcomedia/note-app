import React from 'react';
import './NoteListItem.css';

function NoteListItem(props) {
  // Regex paren is non-capturing, because for some reason `split` splices the
  // captures to the output array.
  const noteLines = props.note.text.split(/(?:\r?\n)+/);
  const noteTitle = noteLines[0].trim();
  const noteFirstLine = noteLines[1] && noteLines[1].trim();

  let className = 'note-list-item';
  if (props.selected) {
    className += ' note-list-item_selected';
  }
  if (!props.note.text.trim()) {
    className += ' note-list-item_empty';
  }

  const handleClick = (e) => {
    props.dispatch({ type: 'select', selectedNoteId: props.note.id });
  };

  return (
    <li className={className} onClick={handleClick}>
      <h5 className="note-list-item__title">{noteTitle || '(empty note)'}</h5>
      {noteFirstLine && (
        <p className="note-list-item__first-line">{noteFirstLine}</p>
      )}
    </li>
  );
}

export default NoteListItem;
