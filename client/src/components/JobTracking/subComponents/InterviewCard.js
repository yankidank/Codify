import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';
import M from "materialize-css";

function InterviewCard(props) {
  const {handleInputChange, time, addNewInterview, date, remote, street, city, state, notes, index, _id} = props;

  useEffect(() => {
    // Change Status Menu
    let dropdowns = document.getElementById('#remote');
    let options = {
        inDuration: 300,
        outDuration: 300,
        hover: true,
        coverTrigger: false, // Displays dropdown below the button
    };
    M.Dropdown.init(dropdowns, options);
  })

  return (
      <div className="card card-padded card-position">
        <div className="interviewInputs">
          <div className="input-field ">
            <Cleave options={{date:true, delimiter: '/', datePattern:['Y', 'm', 'd']}} className="col s6 m4 l4 datepicker" placeholder="2020/09/15" onChange={(event) => handleInputChange(event, index, _id)} value={date} name="date"/>
          </div>
          <div className="input-field ">
            <Cleave options={{time: true, timePattern: ['h', 'm']}} className="col s6 m4 l4" placeholder="10:30" onChange={(event) => handleInputChange(event, index, _id)} name="time" value={time}/>
          </div>
          <div className="input-field col s6 m4 l4">
            <select placeholder="Remote" id="remote" value={remote}>
              <option value="true">Remote</option>
              <option value="false">Local</option>
            </select>
          </div>
          <input className="col s6 m4 l4" placeholder="Street Address" onChange={(event) => handleInputChange(event, index, _id)} value={street} name="street"></input>
          <input className="col s6 m4 l4" placeholder="City" onChange={(event) => handleInputChange(event, index, _id)} value={city} name="city"></input>
          <input className="col s6 m4 l4" placeholder="State" onChange={(event) => handleInputChange(event, index, _id)} value={state} name="state"></input>
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
