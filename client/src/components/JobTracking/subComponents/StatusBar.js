import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {getStatusReport} from "../../../utils/API";
import { useParams } from 'react-router-dom';

function StatusBar(props) {
  const [status, setStatus] = useState([]);

  const {id} = useParams();

  useEffect(() => {
		(async () => {
      let retrievedStatus = await getStatusReport(id);
      setStatus(retrievedStatus);
      console.log(status)
		})();
  }, []);


  const state = props.state;
  const stateClass = {};
  const activeClass = {};
  const connectDefault = 'col s6 m6 l6 circle-connection';
  const activeDefault = 'col s3 m3 l3';
  if (state === '1'){
    stateClass.one = connectDefault+' circle-connect-await'
    stateClass.two = connectDefault+' circle-connect-await'
    stateClass.three = connectDefault+' circle-connect-await'
    stateClass.four = connectDefault+' circle-connect-await'
    stateClass.five = connectDefault+' circle-connect-await'
    stateClass.six = connectDefault+' circle-connect-await'
    activeClass.one = activeDefault+' circle-active';
    activeClass.two = activeDefault+' circle-await';
    activeClass.three = activeDefault+' circle-await';
    activeClass.four = activeDefault+' circle-await';
  } else if (state === '2'){
    stateClass.one = connectDefault;
    stateClass.two = connectDefault;
    stateClass.three = connectDefault+' circle-connect-await'
    stateClass.four = connectDefault+' circle-connect-await'
    stateClass.five = connectDefault+' circle-connect-await'
    stateClass.six = connectDefault+' circle-connect-await'
    activeClass.one = activeDefault;
    activeClass.two = activeDefault+' circle-active';
    activeClass.three = activeDefault+' circle-await';
    activeClass.four = activeDefault+' circle-await';
  } else if (state === '3'){
    stateClass.one = connectDefault;
    stateClass.two = connectDefault;
    stateClass.three = connectDefault;
    stateClass.four = connectDefault;
    stateClass.five = connectDefault+' circle-connect-await'
    stateClass.six = connectDefault+' circle-connect-await'
    activeClass.one = activeDefault;
    activeClass.two = activeDefault;
    activeClass.three = activeDefault+' circle-active';
    activeClass.four = activeDefault+' circle-await';
  } else if (state === '4'){
    stateClass.one = connectDefault;
    stateClass.two = connectDefault;
    stateClass.three = connectDefault;
    stateClass.four = connectDefault;
    stateClass.five = connectDefault;
    stateClass.six = connectDefault;
    activeClass.one = activeDefault;
    activeClass.two = activeDefault;
    activeClass.three = activeDefault;
    activeClass.four = activeDefault+' circle-active';   
  }

  return (
    <div className="col s12 m12 l12">
      {console.log(status)}
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
  first: PropTypes.string,
  second: PropTypes.string,
  third: PropTypes.string,
  fourth: PropTypes.string,
};

export default StatusBar;
