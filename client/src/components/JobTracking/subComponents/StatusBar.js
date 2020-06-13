import React from 'react';
import PropTypes from 'prop-types';

function StatusBar(props) {
  return (
    <div className="col s12 m12 l12">
      {/* {props.state} */}
      <div className="statusBar">
        <div className="circle-status">
          <p>Saved</p>
          <div className="circle-status-first">
            <div className="circle-connection">
              <div className="circle-outer">
                <div className="circle-inner" id="circle-save">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="circle-status">
          <p>Applied</p>
          <div className="circle-connection">
            <div className="circle-outer">
              <div className="circle-inner" id="circle-apply">
              </div>
            </div>
          </div>
        </div>
        <div className="circle-status">
          <p className="circle-active">Interview</p>
          <div className="circle-connection">
            <div className="circle-outer">
              <div className="circle-inner" id="circle-interview">
              </div>
            </div>
          </div>
        </div>
        <div className="circle-status">
          <p>Offer</p>
          <div className="circle-status-last">
            <div className="circle-connection circle-inactive">
              <div className="circle-outer">
                <div className="circle-inner circle-inactive" id="circle-offer">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  state: PropTypes.string,
};

export default StatusBar;
