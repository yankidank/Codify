import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timepicker.css';
import M from 'materialize-css';

// <Timepicker placeholder="YYYY/MM/DD" value={date} name="timepicker" id="timepicker" />

function Timepicker(props) {
  const {
    placeholder, value, name, id
  } = props;

  // Track checkbox state
  const [click, setClick] = useState(false);

  // Set checkbox state on click
  const checkClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    // Change Status Menu
    const options = {
      autoClose: true,
      vibrate: true,
      onSelect: (date) => {
        console.log(`Calendar Date: ${date}`);
      },
    };
    const elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, options);
  }, []);

  return (
    <div className="timepicker-wrapper">
      <input
        type="text"
        className="timepicker"
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        onChange={checkClick}
      />
    </div>
  );
}

Timepicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.string,
};

export default Timepicker;
