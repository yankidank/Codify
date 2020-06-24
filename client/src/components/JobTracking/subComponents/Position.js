import React, { useState, useEffect, useCallback } from 'react';
import {getPosition, updatePosition, deleteJob} from "../../../utils/API";
import { useParams } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import _ from 'lodash';
import {convertMoneyToNumber} from '../../../utils/formatCleave';


function PositionCard() {
  const [position, setPosition] = useState([]);

  const {id} = useParams();

  const handleClick = () => {
    deleteJob(id);
    window.location.href="/jobs/"
  }

  const debouncedUpdatedPosition = useCallback( _.debounce(updatePosition, 500), []);

  const handleInputChange = (event) => {
    const newPosition = {...position};
    const inputName = event.target.name;
    let inputValue = event.target.value;
    if (inputName == 'salary') {
      inputValue = convertMoneyToNumber(inputValue);
    }
    newPosition[inputName] = inputValue;
    console.log(newPosition);
    setPosition(newPosition);
    debouncedUpdatedPosition(newPosition, id);
  }
  
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
          <input className="col s6 m6 l6" placeholder="Job Title" name="position" onChange={(event) => handleInputChange(event)} value={position.position || ""}></input>
          <input className="col s6 m6 l6" placeholder="City" name="city" onChange={(event) => handleInputChange(event)} value={position.city || ""}></input>
          <Cleave options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }} className="col s6 m6 l6" placeholder="Salary" name="salary" onChange={(event) => handleInputChange(event)} value={position.salary || ""}/>
          {/* <input className="col s6 m6 l6" placeholder="Salary" name="salary" onChange={(event) => handleInputChange(event)} defaultValue={position.salary || ""}></input> */}
          <input className="col s6 m6 l6" placeholder="State" name="state" onChange={(event) => handleInputChange(event)} value={position.state || ""}></input>
          {/* <textarea name="notes" placeholder="Notes" onChange={(event) => handleInputChange(event)}></textarea> */}
          <button className="btn btn-card">View Job Post</button>
          <button className="btn btn-card btn-remove" onClick={handleClick}>Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;

