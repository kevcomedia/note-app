import React from 'react';
import './Toolbar.css';

function Toolbar(props) {
  return (
    <div className="toolbar" role="toolbar" aria-label="Notes options">
      {props.children}
    </div>
  );
}

export default Toolbar;
