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
          <Datepicker className="col s5 m5 l5" placeholder="YYYY/MM/DD" value={date} name="date" id="datepicker" />
          <Timepicker className="col s3 m3 l3" placeholder="10:30" value={time} name="time" id="timepicker" />
          <Checkbox className="col s4 m4 l4" label="Remote" value="true" name="remote" checked={remote} id="" />
          {/* <Switch className="col s12 m6 l6" label1="Local" label2="Remote" value="" name="remote" checked={remote} id="" /> */}
          {/* 
          <div className="input-field col s6 m4 l4">
            <select placeholder="Remote" id="remote" name="remote" onChange={(event) => handleInputChange(event, index, _id)} value={remote}>
              <option value="true">Remote</option>
              <option value="false">Local</option>
            </select>
          </div>
           */}
          <input className="col s12 m12 l12" placeholder="Street Address" onChange={(event) => handleInputChange(event, index, _id)} value={street} name="street"></input>
          <input className="col s8 m8 l8" placeholder="City" onChange={(event) => handleInputChange(event, index, _id)} value={city} name="city"></input>
          <input className="col s4 m4 l4" placeholder="State" onChange={(event) => handleInputChange(event, index, _id)} value={state} name="state"></input>
          <textarea placeholder="Notes" onChange={(event) => handleInputChange(event, index, _id)} value={notes} name="notes"></textarea>
        </div>
        {(_id) ? '' : <button className={"btn btn-card"} onClick={() => addNewInterview(index)}>Save New Interview</button>}
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
