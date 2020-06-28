import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Timepicker.css';
import M from "materialize-css";

// <Timepicker className="col s12 m12 l12" placeholder="YYYY/MM/DD" value={date} name="timepicker" id="timepicker" />

function Timepicker(props) {

	const {placeholder, value, name, className, id} = props;
		
	// Track checkbox state
	const [click, setClick] = useState(false);

	// Set checkbox state on click
	const checkClick = () => {
		setClick(!click)
	}

	useEffect(() => {
		// Change Status Menu
    let options = {
			autoClose: true,
			vibrate: true,
			onSelect: (date) => {
				console.log('Calendar Date: '+date);
			},
    };
			var elems = document.querySelectorAll('.timepicker');
			M.Timepicker.init(elems, options);
	}, []);
	
	return (
		<div className="input-field">
			<div className={`${className} timepicker-wrapper`}>
				<input 
					type="text" 
					className="timepicker"
					placeholder={placeholder}
					value={value} 
					name={name} 
					id={id} 
					onChange={checkClick}
					/* onClick={checkClick}  */
				/>
			</div>
		</div>
	)
}

Timepicker.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string,
};

export default Timepicker;
