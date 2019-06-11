import React from 'react';

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
      Delete
    </button>
  );
}

export default DeleteNoteButton;
