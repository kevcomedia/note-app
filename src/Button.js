import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.css';

function Button(props) {
  const { label, icon, className, ...propsRest } = props;
  return (
    <button className={`btn ${className}`} type="button" {...propsRest}>
      {icon && <FontAwesomeIcon icon={icon} fixedWidth />}
      {label}
    </button>
  );
}

Button.defaultProps = {
  className: '',
};

export default Button;
