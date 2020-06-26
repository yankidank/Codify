// import React, { useEffect } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';

function InterviewCard(props) {
  const {handleInputChange, time, addNewInterview, date, remote, street, city, state, notes, index, _id} = props;

  return (
      <div className="card card-padded card-position">
        <div className="interviewInputs">
          <div className="input-field ">
            <Cleave options={{date:true, delimiter: '/', datePattern:['Y', 'm', 'd']}} className="col s4 m4 l4 datepicker" placeholder="2020/09/15" onChange={(event) => handleInputChange(event, index, _id)} value={date} name="date"/>
          </div>
          <div className="input-field ">
            <Cleave options={{time: true, timePattern: ['h', 'm']}} className="col s6 m4 l4" placeholder="10:30" onChange={(event) => handleInputChange(event, index, _id)} name="time" value={time}/>
          </div>
          <div className="input-field col s6 m4 l4">
            <select placeholder="Remote" id="remote" name="remote" onChange={(event) => handleInputChange(event, index, _id)} value={remote}>
              <option value="true">Remote</option>
              <option value="false">Local</option>
            </select>
          </div>
          <input className="col s12 m12 l12" placeholder="Street Address" onChange={(event) => handleInputChange(event, index, _id)} value={street} name="street"></input>
          <input className="col s6 m6 l6" placeholder="City" onChange={(event) => handleInputChange(event, index, _id)} value={city} name="city"></input>
          <input className="col s6 m6 l6" placeholder="State" onChange={(event) => handleInputChange(event, index, _id)} value={state} name="state"></input>
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
