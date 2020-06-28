import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Datepicker.css';
import M from "materialize-css";

// <Datepicker className="col s12 m12 l12" placeholder="YYYY/MM/DD" value={date} name="datepicker" id="datepicker" />

function Datepicker(props) {

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
			format: 'yyyy/mm/dd',
			firstDay: 1,
			showClearBtn: true,
			onSelect: (date) => {
				console.log('Calendar Date: '+date);
			},
    };
			var elems = document.querySelectorAll('.datepicker');
			M.Datepicker.init(elems, options);
	}, []);
	
	return (
		<div className="input-field">
			<div className={`${className} datepicker-wrapper`}>
				<input 
					type="text" 
					className="datepicker"
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

Datepicker.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string,
};

export default Datepicker;
