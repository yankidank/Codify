import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Cleave from 'cleave.js/react';
// import Checkbox from '../../../form/components/checkbox';
import _ from 'lodash';
import M from 'materialize-css';
import convertMoneyToNumber from '../../../../utils/formatCleave';
import { getPosition, updatePosition, deleteJob } from '../../../../utils/API';

function PositionCard() {
  const [position, setPosition] = useState([]);
  const { id } = useParams();
  const [urlEditable, seturlEditable] = useState(false);

  const handleUrlEdit = () => {
    seturlEditable(!urlEditable);
  };

  const handleUrl = () => {
    window.open(position.url, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,left=200,width=800,height=800');
  };

  const handleDelete = () => {
    deleteJob(id);
    window.location.href = '/jobs/';
  };

  const debouncedUpdatedPosition = useCallback(_.debounce(updatePosition, 500), []);

  const handleInputChange = (event) => {
    const newPosition = { ...position };
    const inputName = event.target.name;
    let inputValue = event.target.value;
    if (inputName === 'bonus') {
      inputValue = convertMoneyToNumber(inputValue);
    }
    newPosition[inputName] = inputValue;
    setPosition(newPosition);
    debouncedUpdatedPosition(newPosition, id);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const retrievedPosition = await getPosition(id);

        if (retrievedPosition) {
          setPosition(retrievedPosition);
        } else {
          // console.log("Add empty position")
        }
      }
    })();

    document.addEventListener('DOMContentLoaded', () => {
      // Input Placeholders
      M.updateTextFields();
    });
  }, [id]);

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s12 card-title">
          Position
        </div>
      </div>
      <div className="card card-padded card-position">
        <div className="positionInputs">
          <div className="input-field col s8">
            <input name="position" value={position.position || ''} id="position-title" className="validate" type="text" onChange={(event) => handleInputChange(event)} />
            <label htmlFor="position-title" className={position.position ? 'active' : ''}>Job Title</label>
          </div>
          <div className="input-field col s4">
            <select placeholder="Remote" id="remote" name="remote" onChange={(event) => handleInputChange(event)} value={position.remote}>
              <option value="true">Remote</option>
              <option value="false">Local</option>
            </select>
          </div>
          {/*
          <div className="input-field col s12 m4">
            <Checkbox
              label="Remote"
              value={position.remote}
              name="remote"
              id=""
            />
          </div>
           */}
          {/* <Switch label1="Local" label2="Remote" value="" name="remote" checked={position.remote} id="" /> */}
          <div className="input-field col s8">
            <input name="city" value={position.city || ''} id="position-city" className="validate" type="text" onChange={(event) => handleInputChange(event)} />
            <label htmlFor="position-city" className={position.city ? 'active' : ''}>City</label>
          </div>
          <div className="input-field col s4">
            <input name="state" value={position.state || ''} id="position-state" className="validate" type="text" onChange={(event) => handleInputChange(event)} />
            <label htmlFor="position-state" className={position.state ? 'active' : ''}>State</label>
          </div>
          <div className="input-field col s8">
            <input name="salary" value={position.salary || ''} id="position-salary" className="validate" type="text" onChange={(event) => handleInputChange(event)} />
            <label htmlFor="input-salary" className={position.salary ? 'active' : ''}>Salary</label>
          </div>
          <div className="input-field col s4">
            <Cleave options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }} name="bonus" value={position.bonus || ''} id="input-bonus" className="validate" type="text" onChange={(event) => handleInputChange(event)} />
            <label htmlFor="input-bonus" className={position.bonus ? 'active' : ''}>Bonus</label>
          </div>
          <div className="input-field col s12">
            <textarea name="notes" value={position.notes || ''} id="position-notes" className="materialize-textarea" type="text" onChange={(event) => handleInputChange(event)} />
            <label htmlFor="position-notes" className={position.notes ? 'active' : ''}>Notes</label>
          </div>
          <div className="input-field col s12">
            <i className={!urlEditable ? 'material-icons postfix url-icon-edit' : 'material-icons postfix url-icon-link'} id="position-url-edit" onClick={handleUrlEdit}>{position.url ? 'edit' : ''}</i>
            {!position.url || urlEditable
              ? <input name="url" value={position.url || ''} id="position-url-input" className="validate" type="text" placeholder={!position.url ? 'Job Posting URL' : ''} onChange={(event) => handleInputChange(event)} />
              : <input value={position.url} className="url-input-linked" onClick={handleUrl} />}
          </div>
          <button className="btn btn-card btn-remove" onClick={handleDelete}>Remove Job Post</button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;
