import React from 'react';
import './Button.css';

function Button({ btnText, btnOnClick }) {
	return (
		<button className="button" onClick={btnOnClick}>
			{btnText}
		</button>
	);
}

export default Button;
