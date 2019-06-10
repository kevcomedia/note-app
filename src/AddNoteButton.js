import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddNoteButton.css';

function AddNoteButton(props) {
  const handleClick = (e) => {
    props.dispatch({ type: 'add' });
  };
  return (
    <button className="add-note-button" type="button" onClick={handleClick}>
      <FontAwesomeIcon icon="plus" fixedWidth />
      New Note
    </button>
  );
}

export default AddNoteButton;
