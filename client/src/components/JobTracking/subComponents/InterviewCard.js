// import React, { useEffect } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Timepicker from '../../Form/Timepicker'
import Datepicker from '../../Form/Datepicker'
import Checkbox from '../../Form/Checkbox'

function InterviewCard(props) {
  const {handleInputChange, time, addNewInterview, date, remote, street, city, state, notes, index, _id} = props;

  return (
      <div className="card card-padded card-position">
        <div className="interviewInputs">
          <div className="input-field col s5">
            <Datepicker 
              value={date} 
              name="date" 
              id={`datepicker interview-date-${_id}`}
              className="validate"
              type="text"	
              onChange={(event) => handleInputChange(event, index, _id)}
            />
            <label htmlFor={`interview-date-${_id}`} className={date ? "active" : ""}>Date</label>
          </div>
          <div className="input-field col s3">
            <Timepicker 
              name="time" 
              value={time}
              id={`interview-time-${_id}`} 
              className="validate"
              type="text"	
              onChange={(event) => handleInputChange(event, index, _id)}
            />
            <label htmlFor={`interview-time-${_id}`} className={time ? "active" : ""}>Time</label>
          </div>
          <div className="input-field col s4">
            <Checkbox 
              name="remote" 
              label="Remote" 
              value={remote} 
              onChange={(event) => handleInputChange(event, index, _id)}
            />
          </div>
          {/* <Switch className="col s12 m6 l6" label1="Local" label2="Remote" value="" name="remote" checked={remote} id="" /> */}
          {/* 
          <div className="input-field col s6 m4 l4">
            <select placeholder="Remote" id="remote" name="remote" onChange={(event) => handleInputChange(event, index, _id)} value={remote}>
              <option value="true">Remote</option>
              <option value="false">Local</option>
            </select>
          </div>
           */}
          <div className="input-field col s12">
            <input name="street" value={street} id={`interview-street-${_id}`} className="validate" type="text" onChange={(event) => handleInputChange(event, index, _id)}></input>
            <label htmlFor={`interview-street-${_id}`} className={street ? "active" : ""}>Street Address</label>
          </div>
          <div className="input-field col s8">
            <input name="city" value={city} id={`interview-city-${_id}`} className="validate" type="text" onChange={(event) => handleInputChange(event, index, _id)}></input>
            <label htmlFor={`interview-city-${_id}`} className={city ? "active" : ""}>City</label>
          </div>
          <div className="input-field col s4">
            <input name="state" value={state} id={`interview-state-${_id}`} className="validate" type="text" onChange={(event) => handleInputChange(event, index, _id)}></input>
            <label htmlFor={`interview-state-${_id}`} className={state ? "active" : ""}>State</label>
          </div>
          <div className="input-field col s12">
            <textarea name="notes" value={notes || ''} id={`interview-notes-${_id}`} className="materialize-textarea" type="text" onChange={(event) => handleInputChange(event, index, _id)} ></textarea>
            <label htmlFor={`interview-notes-${_id}`} className={notes ? "active" : ""}>Notes</label>
          </div>
        </div>
        {(_id) ? '' : <button className={"btn btn-card"} onClick={() => addNewInterview(index)}>Save Interview</button>}
      </div>
  );
}

InterviewCard.propTypes = {
  time: PropTypes.string,
  index: PropTypes.number,
  handleInputChange: PropTypes.func,
  addNewInterview: PropTypes.func,
  date: PropTypes.string,
  remote: PropTypes.bool,
  street: PropTypes.string,
  state: PropTypes.string,
  notes: PropTypes.string,
  city: PropTypes.string,
  _id: PropTypes.string
};

export default InterviewCard;
