import React from 'react';
import Cleave from 'cleave.js/react';
import PropTypes from 'prop-types';

function OfferCard(props) {
  const {
    startDate, date, salary, bonus, benefits, index, _id, handleInputChange, addNewOffer
  } = props;

  return (
    <div className="card card-padded card-offer">
      <div className="offerInputs">
        <div className="input-field col s6">
          <Cleave
            options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }}
            name="salary"
            value={salary}
            id={`offer-salary-${_id}`}
            className="validate"
            type="text"
            onChange={(event) => handleInputChange(event, index, _id)}
          />
          <label htmlFor={`offer-salary-${_id}`} className={salary ? 'active' : ''}>Salary</label>
        </div>
        <div className="input-field col s6">
          <Cleave
            options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }}
            name="bonus"
            value={bonus}
            id={`offer-bonus-${_id}`}
            className="validate"
            type="text"
            onChange={(event) => handleInputChange(event, index, _id)}
          />
          <label htmlFor={`offer-bonus-${_id}`} className={bonus ? 'active' : ''}>Bonus</label>
        </div>
        <div className="input-field col s6">
          <Cleave
            options={{ date: true, delimiter: '/', datePattern: ['Y', 'm', 'd'] }}
            name="date"
            value={date}
            id={`offer-date-${_id}`}
            className="validate datepicker"
            type="text"
            onChange={(event) => handleInputChange(event, index, _id)}
          />
          <label htmlFor={`offer-date-${_id}`} className={date ? 'active' : ''}>Offer Date</label>
        </div>
        <div className="input-field col s6">
          <Cleave
            options={{ date: true, delimiter: '/', datePattern: ['Y', 'm', 'd'] }}
            name="startDate"
            value={startDate || ''}
            id={`contact-startdate-${_id}`}
            className="validate datepicker"
            type="text"
            onChange={(event) => handleInputChange(event, index, _id)}
          />
          <label htmlFor={`contact-startdate-${_id}`} className={startDate ? 'active' : ''}>Start Date</label>
        </div>
        <div className="input-field col s12">
          <textarea name="benefits" value={benefits || ''} id={`contact-benefits-${_id}`} className="validate materialize-textarea" type="text" onChange={(event) => handleInputChange(event, index, _id)} />
          <label htmlFor={`contact-benefits-${_id}`} className={benefits ? 'active' : ''}>Benefits</label>
        </div>
        {(_id) ? '' : <button className="btn btn-card" onClick={() => addNewOffer(index)}>Save Offer</button>}
      </div>
    </div>
  );
}

OfferCard.propTypes = {
  startDate: PropTypes.string,
  date: PropTypes.string,
  salary: PropTypes.string,
  bonus: PropTypes.string,
  benefits: PropTypes.string,
  handleInputChange: PropTypes.func,
  addNewOffer: PropTypes.func,
  index: PropTypes.number,
  _id: PropTypes.string
};

export default OfferCard;
