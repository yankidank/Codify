import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {updateStatus} from "../../../utils/API";

function StatusBar(props) {

  const [position, setPosition] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    status: ""
  });
  
  const {id} = props;

  const setStatus = (selection)=>{
    const type = selection
    updateStatus(type, id);
    setPosition({...position, "status": type});
    props.setStatus(type)    
  }

  const stateClass = {};
  const activeClass = {};
  const connectDefault = 'col s6 m6 l6 circle-connection';
  const activeDefault = 'col s3 m3 l3';
  if (props.status === 'saved'){
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
  } else if (props.status === 'applied'){
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
  } else if (props.status === 'interview'){
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
  } else if (props.status === 'offer'){
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
  } else {
    stateClass.one = connectDefault+' circle-connect-await'
    stateClass.two = connectDefault+' circle-connect-await'
    stateClass.three = connectDefault+' circle-connect-await'
    stateClass.four = connectDefault+' circle-connect-await'
    stateClass.five = connectDefault+' circle-connect-await'
    stateClass.six = connectDefault+' circle-connect-await'
    activeClass.one = activeDefault+' circle-await';
    activeClass.two = activeDefault+' circle-await';
    activeClass.three = activeDefault+' circle-await';
    activeClass.four = activeDefault+' circle-await';
  }

  return (
    <div className="col s12 m12 l12">
      <div className="row statusBar">
        <div className={activeClass.one}>{}
          <p>
            <a 
              href={`#${props.first.toLowerCase()}`} 
              onClick={()=>setStatus(props.first.toLowerCase())}
            >
              {props.first}
            </a>
          </p>
          <div className="circle-status">
            <div className="row">
              <div className="col s6 m6 l6 circle-connection circle-inactive">
              </div>
              <div className={stateClass.one}>
              </div>
            </div>
          </div>
          <a 
            href={`#${props.first.toLowerCase()}`} 
            onClick={()=>setStatus(props.first.toLowerCase())}
          >
            <div className="circle-inner" id="circle-one"></div>
          </a>
        </div>
        <div className={activeClass.two}>
          <p>
            <a 
              href={`#${props.second.toLowerCase()}`} 
              onClick={()=>setStatus(props.second.toLowerCase())}
            >
              {props.second}
            </a>
          </p>
          <div className="circle-status">
            <div className="row">
              <div className={stateClass.two}>
              </div>
              <div className={stateClass.three}>
              </div>
            </div>
          </div>
          <a 
            href={`#${props.second.toLowerCase()}`} 
            onClick={()=>setStatus(props.second.toLowerCase())}
          >
            <div className="circle-inner" id="circle-two"></div>
          </a>
        </div>
        <div className={activeClass.three}>
          <p>
            <a 
              href={`#${props.third.toLowerCase()}`} 
              onClick={()=>setStatus(props.third.toLowerCase())}
            >
              {props.third}
            </a>
          </p>
          <div className="circle-status">
            <div className="row">
              <div className={stateClass.four}>
              </div>
              <div className={stateClass.five}>
              </div>
            </div>
          </div>
          <a 
            href={`#${props.third.toLowerCase()}`} 
            onClick={()=>setStatus(props.third.toLowerCase())}
          >
            <div className="circle-inner" id="circle-three"></div>
          </a>
        </div>
        <div className={activeClass.four}>
          <p>
            <a 
              href={`#${props.fourth.toLowerCase()}`} 
              onClick={()=>setStatus(props.fourth.toLowerCase())}
            >
              {props.fourth}
            </a>
          </p>
          <div className="circle-status">
            <div className="row">
              <div className={stateClass.six}>
              </div>
              <div className="col s6 m6 l6 circle-connection circle-inactive">
              </div>
            </div>
          </div>
          <a 
            href={`#${props.fourth.toLowerCase()}`} 
            onClick={()=>setStatus(props.fourth.toLowerCase())}
          >
            <div className="circle-inner" id="circle-four"></div>
          </a>
        </div>
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  setStatus: PropTypes.func,
  first: PropTypes.string,
  second: PropTypes.string,
  third: PropTypes.string,
  fourth: PropTypes.string,
};

export default StatusBar;
