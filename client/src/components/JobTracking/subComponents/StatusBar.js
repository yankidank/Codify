import React from 'react';
import PropTypes from 'prop-types';

function StatusBar(props) {
  const state = props.state;
  const stateClass = {};
  const activeClass = {};
  if (state === '1'){
    stateClass.one = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.two = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.three = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.four = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.five = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.six = 'col s6 m6 l6 circle-connection circle-connect-await'
    activeClass.one = 'col s3 m3 l3 circle-active';
    activeClass.two = 'col s3 m3 l3 circle-await';
    activeClass.three = 'col s3 m3 l3 circle-await';
    activeClass.four = 'col s3 m3 l3 circle-await';
  } else if (state === '2'){
    stateClass.one = 'col s6 m6 l6 circle-connection'
    stateClass.two = 'col s6 m6 l6 circle-connection'
    stateClass.three = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.four = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.five = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.six = 'col s6 m6 l6 circle-connection circle-connect-await'
    activeClass.one = 'col s3 m3 l3';
    activeClass.two = 'col s3 m3 l3 circle-active';
    activeClass.three = 'col s3 m3 l3 circle-await';
    activeClass.four = 'col s3 m3 l3 circle-await';
  } else if (state === '3'){
    stateClass.one = 'col s6 m6 l6 circle-connection'
    stateClass.two = 'col s6 m6 l6 circle-connection'
    stateClass.three = 'col s6 m6 l6 circle-connection'
    stateClass.four = 'col s6 m6 l6 circle-connection'
    stateClass.five = 'col s6 m6 l6 circle-connection circle-connect-await'
    stateClass.six = 'col s6 m6 l6 circle-connection circle-connect-await'
    activeClass.one = 'col s3 m3 l3';
    activeClass.two = 'col s3 m3 l3';
    activeClass.three = 'col s3 m3 l3 circle-active';
    activeClass.four = 'col s3 m3 l3 circle-await';
  } else if (state === '4'){
    stateClass.one = 'col s6 m6 l6 circle-connection'
    stateClass.two = 'col s6 m6 l6 circle-connection'
    stateClass.three = 'col s6 m6 l6 circle-connection'
    stateClass.four = 'col s6 m6 l6 circle-connection'
    stateClass.five = 'col s6 m6 l6 circle-connection'
    stateClass.six = 'col s6 m6 l6 circle-connection'
    activeClass.one = 'col s3 m3 l3';
    activeClass.two = 'col s3 m3 l3';
    activeClass.three = 'col s3 m3 l3';
    activeClass.four = 'col s3 m3 l3 circle-active';   
  }
  console.log(stateClass)

  return (
    <div className="col s12 m12 l12">
      <div className="row statusBar">
        <div className={activeClass.one}>
          <p>{props.first}</p>
          <div className="circle-status">
            <div className="row">
              <div className="col s6 m6 l6 circle-connection circle-inactive">
              </div>
              <div className={stateClass.one}>
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-one"></div>
        </div>
        <div className={activeClass.two}>
          <p>{props.second}</p>
          <div className="circle-status">
            <div className="row">
              <div className={stateClass.two}>
              </div>
              <div className={stateClass.three}>
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-two"></div>
        </div>
        <div className={activeClass.three}>
          <p>{props.third}</p>
          <div className="circle-status">
            <div className="row">
              <div className={stateClass.four}>
              </div>
              <div className={stateClass.five}>
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-three"></div>
        </div>
        <div className={activeClass.four}>
          <p>{props.fourth}</p>
          <div className="circle-status">
            <div className="row">
              <div className={stateClass.six}>
              </div>
              <div className="col s6 m6 l6 circle-connection circle-inactive">
              </div>
            </div>
          </div>
          <div className="circle-inner" id="circle-four"></div>
        </div>
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  state: PropTypes.string,
};

export default StatusBar;
