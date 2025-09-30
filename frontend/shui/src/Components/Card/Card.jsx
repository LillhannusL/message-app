import React from 'react';
import './Card.css';

function Card({ date, text, username }) {
	const shortDate = date.substring(0, 10);
	return (
		<div className="card">
			<h5>{shortDate}</h5>
			<p>{text}</p>
			<h6>{username}</h6>
		</div>
	);
}

export default Card;
