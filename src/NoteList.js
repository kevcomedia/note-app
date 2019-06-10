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
      dispatch={props.dispatch}
    />
  ));
  return <ul className={className}>{noteListItems}</ul>;
}

export default NoteList;
