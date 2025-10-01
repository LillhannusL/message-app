import React from 'react';
import './Card.css';

function Card({ date, text, username, onClick }) {
	const shortDate = date.substring(0, 10);
	const shortTime = date.substring(11, 19);

	return (
		<div className="card" onClick={onClick}>
			<h6 className="card_date">
				{shortDate} {shortTime}
			</h6>
			<p className="card_text">{text}</p>
			<h5 className="card_username">- {username}</h5>
		</div>
	);
}

export default Card;
