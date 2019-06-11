import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DeleteNoteButton(props) {
  const handleClick = (e) => {
    props.dispatch({ type: 'delete' });
  };
  return (
    <button
      className="delete-note-button"
      type="button"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon="trash-alt" fixedWidth />
      Delete
    </button>
  );
}

export default DeleteNoteButton;
