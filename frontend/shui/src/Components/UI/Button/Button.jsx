import React from 'react';
import './Button.css';

function Button({ btnText, btnOnClick, className, type = 'button' }) {
	return (
		<button type={type} className={`button ${className}`} onClick={btnOnClick}>
			{btnText}
		</button>
	);
}

export default Button;
