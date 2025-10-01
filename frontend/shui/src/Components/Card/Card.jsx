import React from 'react';
import './Card.css';

function Card({ date, text, username }) {
	const shortDate = date.substring(0, 10);
	return (
		<div className="card">
			<h6 className="card_date">{shortDate}</h6>
			<p className="card_text">{text}</p>
			<h5 className="card_username">- {username}</h5>
		</div>
	);
}

export default Card;
