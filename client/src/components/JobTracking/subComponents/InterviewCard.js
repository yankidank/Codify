import React, { useState, useEffect } from 'react';
import Cleave from 'cleave.js/react';
import { useParams } from 'react-router-dom';
import {getInterviews, addInterview} from "../../../utils/API";

function InterviewCard(props) {
  const {handleInputChange, addNewInterview, date, remote, street, city, state, zip, notes, index, _id} = props;

  return (
      <div className="card card-padded card-position">
        <div className="interviewInputs">
          <Cleave options={{date:true, delimiter: '/', datePattern:['m', 'd', 'Y']}} className="col s6 m4 l4 datepicker" placeholder="09/15/2020" onChange={(event) => handleInputChange(event, index)} value={date} name="date"/>
          <Cleave options={{time: true, timePattern: ['h', 'm']}} className="col s6 m4 l4" placeholder="10:30" onChange={(event) => handleInputChange(event, index)} name="time"/>
          <select className={"col s6 m4 l4"} placeholder="Remote" id="remote">
              <option value="true">Yes</option>
              <option value="false">No</option>
          </select>
          <input className="col s6 m4 l4" placeholder="Street Address" onChange={(event) => handleInputChange(event, index)} value={street} name="street"></input>
          <input className="col s6 m4 l4" placeholder="City" onChange={(event) => handleInputChange(event, index)} value={city} name="city"></input>
          <input className="col s6 m4 l4" placeholder="State" onChange={(event) => handleInputChange(event, index)} value={state} name="state"></input>
          <textarea placeholder="Notes" onChange={(event) => handleInputChange(event, index)} value={notes} name="notes"></textarea>
        </div>
        {(_id) ? '' : <button className={"btn btn-card"} onClick={() => addNewInterview(index)}>Save New Interview</button>}
      </div>
  );
}

export default InterviewCard;
