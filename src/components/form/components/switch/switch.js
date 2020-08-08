import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './switch.css';

// <Switch label="Remote" value="" name="remote" checked={position.remote} id="" />

function Switch(props) {
  const {
    label1, label2, value, name, checked, id
  } = props;

  // Track checkbox state
  const [check, setCheck] = useState(checked);

  // Empty default checked state
  let remoteChecked = '';
  // If remote passed is true, set as checked
  if (check) {
    remoteChecked = 'checked';
  }

  // Set checkbox state on click
  const checkClick = () => {
    setCheck(!check);
  };

  return (
    <div className="input-field">
      <div className="checkbox-wrapper switch">
        <label>
          {label1}
          <input
            type="checkbox"
            checked={remoteChecked}
            name={name}
            value={value}
            id={id}
            onChange={checkClick}
          />
          <span className="lever" />
          {label2}
        </label>
      </div>
    </div>
  );
}

Switch.propTypes = {
  label1: PropTypes.string,
  label2: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.string,
};

export default Switch;
