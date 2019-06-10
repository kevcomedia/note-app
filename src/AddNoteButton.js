import React from 'react';

function AddNoteButton(props) {
  const handleClick = (e) => {
    props.dispatch({ type: 'add' });
  };
  return (
    <button type="button" onClick={handleClick}>
      New Note
    </button>
  );
}

export default AddNoteButton;
