import React, { useState, useEffect, useCallback } from 'react';
import {getPosition, updatePosition, deleteJob} from "../../../utils/API";
import { useParams } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import Checkbox from '../../Form/Checkbox'
import _ from 'lodash';
import {convertMoneyToNumber} from '../../../utils/formatCleave';
import M from "materialize-css";

function PositionCard() {
  const [position, setPosition] = useState([]);
  const {id} = useParams();
  const [urlEditable, seturlEditable] = useState(false);

  const handleUrlEdit = () => {
    seturlEditable(!urlEditable)
    console.log(urlEditable)
  }

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
    
    document.addEventListener("DOMContentLoaded", function(){
      // Input Placeholders
      M.updateTextFields();
    });

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
          <div className="input-field col s12 m8">
            <input name="position" id="position-title" className="validate" type="text" onChange={(event) => handleInputChange(event)} value={position.position || ""} />
            <label htmlFor="position-title" className={position.position ? "active" : ""} >Job Title</label>
          </div>
          <div className="input-field col s12 m4">
            <Checkbox label="Remote" value="true" name="remote" checked={position.remote} id="" />
          </div>
          {/* <Switch className="col s12 m12 l12" label1="Local" label2="Remote" value="" name="remote" checked={position.remote} id="" /> */}
          <div className="input-field col s8">
            <input name="city" id="position-city" className="validate" type="text" onChange={(event) => handleInputChange(event)} value={position.city || ""}></input>
            <label htmlFor="position-city" className={position.city ? "active" : ""}>City</label>
          </div>
          <div className="input-field col s4">
            <input name="state" id="position-state" className="validate" type="text" onChange={(event) => handleInputChange(event)} value={position.state || ""}></input>
            <label htmlFor="position-state" className={position.state ? "active" : ""}>State</label>
          </div>
          <div className="input-field col s8">
            <Cleave options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }} name="salary" id="input-salary" className="validate" type="text" onChange={(event) => handleInputChange(event)} value={position.salary || ""}/>
            <label htmlFor="input-salary" className={position.salary ? "active" : ""}>Salary</label>
          </div>
          <div className="input-field col s4">
            <Cleave options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }} name="bonus" id="input-bonus" className="validate" type="text" onChange={(event) => handleInputChange(event)} value={position.bonus || ""}/>
            <label htmlFor="input-bonus" className={position.bonus ? "active" : ""}>Bonus</label>
          </div>
          <div className="input-field col s12">
            <textarea id="position-notes" className="materialize-textarea" name="notes" type="text" onChange={(event) => handleInputChange(event)} value={position.notes || ''} ></textarea>
            <label for="position-notes" className={position.notes ? "active" : ""}>Notes</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix" id="position-url-edit" onClick={handleUrlEdit}>edit</i>
            {!position.url || urlEditable ?
              <input name="url" id="position-url-input" className="validate" type="text" placeholder={!position.url ? 'Job Posting URL': ''} onChange={(event) => handleInputChange(event)} value={position.url || ''}></input>
            :
              <input className="url-input-linked" onClick={handleUrl} value={position.url}></input>
            }
          </div>
          <button className="btn btn-card btn-remove" onClick={handleDelete}>Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;

