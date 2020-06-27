import React, { useState, useEffect, useCallback } from 'react';
import {getPosition, updatePosition, deleteJob} from "../../../utils/API";
import { useParams } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import _ from 'lodash';
import {convertMoneyToNumber} from '../../../utils/formatCleave';


function PositionCard() {
  const [position, setPosition] = useState([]);

  const {id} = useParams();

  const handleUrl = () => {
    window.open(position.url, "_blank", "toolbar=no,scrollbars=yes,resizable=yes,left=200,width=800,height=800");
  }

  const handleDelete = () => {
    deleteJob(id);
    window.location.href="/jobs/"
  }

  const debouncedUpdatedPosition = useCallback( _.debounce(updatePosition, 500), []);

  const handleInputChange = (event) => {
    const newPosition = {...position};
    const inputName = event.target.name;
    let inputValue = event.target.value;
    if (inputName === 'salary' || inputName === 'bonus') {
      inputValue = convertMoneyToNumber(inputValue);
    }
    newPosition[inputName] = inputValue;
    //console.log(newPosition);
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
          //console.log("Add empty position")
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
          <input className="col s12 m12 l12" placeholder="Job Title" name="position" onChange={(event) => handleInputChange(event)} value={position.position || ""}></input>
          <input className="col s6 m6 l6" placeholder="City" name="city" onChange={(event) => handleInputChange(event)} value={position.city || ""}></input>
          <input className="col s6 m6 l6" placeholder="State" name="state" onChange={(event) => handleInputChange(event)} value={position.state || ""}></input>
          <Cleave options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }} className="col s6 m6 l6" placeholder="Salary" name="salary" onChange={(event) => handleInputChange(event)} value={position.salary || ""}/>
          <Cleave options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }} className="col s6 m6 l6" placeholder="Bonus" name="bonus" onChange={(event) => handleInputChange(event)} value={position.bonus || ""}/>
          <textarea className="col s12 m12 l12" placeholder="Responsibilities" name="responsibilities" onChange={(event) => handleInputChange(event)} value={position.responsibilities || ''} ></textarea>
          <textarea className="col s12 m12 l12" placeholder="Requirements" name="requirements" onChange={(event) => handleInputChange(event)} value={position.requirements || ''} ></textarea>
          <textarea className="col s12 m12 l12" placeholder="Benefits" name="benefits" onChange={(event) => handleInputChange(event)} value={position.benefits || ''} ></textarea>
          <textarea className="col s12 m12 l12" placeholder="Notes" name="notes" onChange={(event) => handleInputChange(event)} value={position.notes || ''} ></textarea>
          <input className="col s12 m12 l12" placeholder="URL" defaultValue={position.url || ""}></input>
          {position.url ? <button className="btn btn-card" onClick={handleUrl}>View Job Post</button> : '' }
          <button className="btn btn-card btn-remove" onClick={handleDelete}>Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;

