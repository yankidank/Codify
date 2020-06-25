import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

function Checkbox(props) {

	const {label, type, value, name, checked, className, id} = props;
		
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
		<div className="input-field">
			<div className="col s4 m4 l4 checkbox-wrapper">
				<label>
					<input
						type={type}
						value={value}
						name={name}
						checked={remoteChecked}
						className={className}
						style={boxCheck()}
						id={id}
						// onChange={ checkClick}
						onClick={ checkClick}
					/>
					<span>{label}</span>
				</label>
			</div>
		</div>
	)
}

Checkbox.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	checked: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string,
};

export default Checkbox;