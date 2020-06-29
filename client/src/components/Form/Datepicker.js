import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Datepicker.css';
import M from "materialize-css";

// <Datepicker value={date} name="datepicker" id="datepicker" />

function Datepicker(props) {

	const {value, name, id} = props;
		
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
		<div className="datepicker-wrapper">
			<input 
				type="text" 
				className="datepicker"
				value={value} 
				name={name} 
				id={id} 
				onChange={checkClick}
				/* onClick={checkClick}  */
			/>
		</div>
	)
}

Datepicker.propTypes = {
	value: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	id: PropTypes.string,
};

export default Datepicker;
