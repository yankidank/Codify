import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

// <Checkbox label="Remote" value="true" name="remote" checked={position.remote} id="" />

function Checkbox(props) {

	const {label, value, name, id} = props;
		
	// Track checkbox state
	const [check, setCheck] = useState(value);
	
	// Empty default checked state
	let remoteChecked = '';
	// If remote passed is true, set as checked
	if (check){
		remoteChecked = 'checked';
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
					id={id}
					checked={remoteChecked}
					onChange={checkClick}
				/>
				<span>{label}</span>
			</label>
		</div>
	)
}

Checkbox.propTypes = {
	label: PropTypes.string,
	value: PropTypes.bool,
	name: PropTypes.string,
	id: PropTypes.string,
};

export default Checkbox;
