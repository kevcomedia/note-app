import React from 'react';
import NoteListItem from './NoteListItem';
import './NoteList.css';

function NoteList(props) {
  const className = `note-list ${props.className}`;
  const noteListItems = props.notes.map((note) => (
    <NoteListItem
      note={note}
      key={note.id}
      selected={note.id === props.selectedNoteId}
      onClick={(id) => props.onNoteSelect(id)}
    />
  ));

  if (noteListItems.length > 0) {
    return <ul className={className}>{noteListItems}</ul>;
  } else {
    return <p className="no-notes">You have no notes.</p>;
  }
}

export default NoteList;
