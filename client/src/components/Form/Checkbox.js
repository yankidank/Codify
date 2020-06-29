import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

// <Checkbox label="Remote" value="true" name="remote" checked={position.remote} id="" />

function Checkbox(props) {

	const {label, value, name, checked, id} = props;
		
	// Track checkbox state
	const [check, setCheck] = useState(checked);
	
	// Empty default checked state
	let remoteChecked = '';
	// If remote passed is true, set as checked
	if (check){
		remoteChecked = 'checked';
	}
	
	// Change style when checked
	const boxCheck = () => {
		return check ? {} : {}
	}

	// Set checkbox state on click
	const checkClick = () => {
		setCheck(!check)
	}
	
	return (
		<div className="checkbox-wrapper">
			<label>
				<input
					type="checkbox"
					value={value}
					name={name}
					checked={remoteChecked}
					style={boxCheck()}
					id={id}
					onChange={checkClick}
					onClick={checkClick}
				/>
				<span>{label}</span>
			</label>
		</div>
	)
}

Checkbox.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	id: PropTypes.string,
};

export default Checkbox;
