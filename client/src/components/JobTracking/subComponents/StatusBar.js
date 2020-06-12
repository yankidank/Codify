import React from 'react';
import PropTypes from 'prop-types';

function StatusBar(props) {
  return (
    <div className="col s12 m12 l6">
      <div className="statusBar">
        {props.state}
        <div>
          <p>SAVED</p>
          <div>STYLE DIV</div>
        </div>
        <div>
          <p>APPLIED</p>
          <div>STYLE DIV</div>
        </div>
        <div>
          <p>INTERVIEW</p>
          <div>STYLE DIV</div>
        </div>
        <div>
          <p>OFFER</p>
          <div>STYLE DIV</div>
        </div>
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  state: PropTypes.string,
};

export default StatusBar;
