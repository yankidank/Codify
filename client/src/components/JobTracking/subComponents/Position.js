import React, { useState, useEffect } from 'react';
import {getPosition, getJob} from "../../../utils/API";
import { useParams } from 'react-router-dom';


function PositionCard(props) {
  const [position, setPosition] = useState([]);

  const {id} = useParams();

  useEffect(() => {
		(async () => {

      if (id){
        let retrievedPosition = await getPosition(id);
	
        if(retrievedPosition){
          setPosition(retrievedPosition);
        } else {
          console.log("Add empty position")
        }
      }
		})();
	}, []);

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s12 card-title">
          Position
        </div>
      </div>
      <div className="card card-padded card-position">
        <div className="positionInputs">
          <input className="col s6 m6 l6" placeholder="Job Title" defaultValue={position.position || ""}></input>
          <input className="col s6 m6 l6" placeholder="City" defaultValue={position.city || ""}></input>
          <input className="col s6 m6 l6" placeholder="Salary" defaultValue={position.salary || ""}></input>
          <input className="col s6 m6 l6" placeholder="State" defaultValue={position.state || ""}></input>
          <textarea placeholder="Notes"></textarea>
          <button className="btn btn-card">View Job Post</button>
          <button className="btn btn-card btn-remove">Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;
