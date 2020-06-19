import React, { useState, useEffect } from 'react';
import {getInterviews, addInterview} from "../../../utils/API";
import { useParams } from 'react-router-dom';
import M from "materialize-css";

function InterviewCard(props) {
  const [interview, setInterview] = useState([]);

  const {id} = useParams();

  const onPostInput = event => {
    event.preventDefault();
    const { target: { name, value }} = event;

    setInterview({ ...interview, [name]: value})
    console.log(interview)
  }

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

  useEffect(() => {
		(async () => {
			let retrievedInterview = await getInterviews(id);
	
			if(retrievedInterview){
        setInterview(retrievedInterview);
			} else {
				console.log("Add empty interview")
			}
		})();
	}, []);

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">
          Interviews
        </div>
        <div className="col s6">
          <div className="card-button" id="new-interview-btn">
            Add Interview
          </div>
        </div>
      </div>
      <div className="card card-padded card-position">
        <div className="interviewInputs">
          <input className="col s6 m4 l4 datepicker" placeholder="01/01/2000" onChange={onPostInput}></input>
          <input className="col s6 m4 l4" placeholder="10:30 AM" onChange={onPostInput}></input>
          <select className="col s6 m4 l4" placeholder="Remote" id="remote">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <input className="col s6 m4 l4" placeholder="Street Address" onChange={onPostInput}></input>
          <input className="col s6 m4 l4" placeholder="City" onChange={onPostInput}></input>
          <input className="col s6 m4 l4" placeholder="State" onChange={onPostInput}></input>
          <textarea placeholder="Notes"></textarea>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
