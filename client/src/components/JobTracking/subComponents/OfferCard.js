import React from 'react';
import Cleave from 'cleave.js/react';
import PropTypes from 'prop-types';

function OfferCard(props) {
	const { startDate, date, salary, bonus, benefits, index, _id, handleInputChange, addNewOffer} = props;
	return (
		<div className="card card-padded card-offer">
			<div className="offerInputs">
				<Cleave
					options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }}
					className="col s6 m6 l6"
					placeholder="Salary"
					name="salary"
					onChange={(event) => handleInputChange(event, index, _id)}
					value={salary}
				/>
				<Cleave
					options={{ noImmediatePrefix: true, prefix: '$ ', numeral: true }}
					className="col s6 m6 l6"
					placeholder="Bonus"
					name="bonus"
					onChange={(event) => handleInputChange(event, index, _id)}
					value={bonus}
				/>
				<Cleave
					options={{ date: true, delimiter: '/', datePattern: ['Y', 'm', 'd'] }}
					className="col s6 m6 l6 datepicker"
					placeholder="Offer Date"
					name="date"
					onChange={(event) => handleInputChange(event, index, _id)}
					value={date}
				/>
				<Cleave
					options={{ date: true, delimiter: '/', datePattern: ['Y', 'm', 'd'] }}
					className="col s6 m6 l6 datepicker"
					placeholder="Start Date"
          name="startDate"
          onChange={(event) => handleInputChange(event, index, _id)}
					value={startDate}
				/>
				<textarea placeholder="Benefits" name="benefits" onChange={(event) => handleInputChange(event, index, _id)}
					value={benefits}></textarea>
				{(_id) ? '' : <button className="btn btn-card" onClick={()=>addNewOffer(index)}>Add New Offer</button>}
			</div>
		</div>
	);
}

OfferCard.propTypes = { 
  startDate : PropTypes.date,
  date : PropTypes.date,
  salary : PropTypes.number, 
  bonus : PropTypes.number,
  benefits : PropTypes.string, 
  handleInputChange : PropTypes.func, 
  addNewOffer : PropTypes.func,
  index : PropTypes.index,
  _id : PropTypes.string
}

export default OfferCard;
