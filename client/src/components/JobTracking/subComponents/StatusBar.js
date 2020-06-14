import React from 'react';
import PropTypes from 'prop-types';

function StatusBar() {
  return (
    <div className="col s12 m12 l12">
      <div className="row statusBar">
        <div className="col s3 m3 l3">
          <p>Saved</p>
          <div className="circle-status">
            <div className="row">
              <div className="col s6 m6 l6 circle-connection circle-inactive">
              </div>
              <div className="col s6 m6 l6 circle-connection">
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-applied"></div>
        </div>
        <div className="col s3 m3 l3 circle-active">
          <p>Applied</p>
          <div className="circle-status">
            <div className="row">
              <div className="col s6 m6 l6 circle-connection">
              </div>
              <div className="col s6 m6 l6 circle-connection circle-connect-await">
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-applied"></div>
        </div>
        <div className="col s3 m3 l3 circle-await">
          <p>Interview</p>
          <div className="circle-status">
            <div className="row">
              <div className="col s6 m6 l6 circle-connection circle-connect-await">
              </div>
              <div className="col s6 m6 l6 circle-connection circle-connect-await">
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-interview"></div>
        </div>
        <div className="col s3 m3 l3 circle-await">
          <p>Offer</p>
          <div className="circle-status">
            <div className="row">
              <div className="col s6 m6 l6 circle-connection circle-connect-await">
              </div>
              <div className="col s6 m6 l6 circle-connection circle-inactive">
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-offer"></div>
        </div>
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  state: PropTypes.string,
};

export default StatusBar;
