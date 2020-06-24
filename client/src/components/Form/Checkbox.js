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
		<div className={type} style={boxCheck()}>
			<form>
				<label>
					<input
						type={type}
						value={value}
						name={name}
						checked={remoteChecked}
						className={className}
						id={id}
						// onChange={ checkClick}
						onClick={ checkClick}
					/>
					<span>{label}</span>
				</label>
			</form>
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
