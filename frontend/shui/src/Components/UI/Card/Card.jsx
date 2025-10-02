import React from 'react';
import './Card.css';

function Card({ date, text, username, onClick, onUsernameClick }) {
	const shortDate = date.substring(0, 10);
	const shortTime = date.substring(11, 19);

	return (
		<div className="card" onClick={onClick}>
			<h6 className="card_date">
				{shortDate} {shortTime}
			</h6>
			<div className="card_line"></div>
			<p className="card_text">{text}</p>
			<div className="card_line"></div>
			<h5
				className="card_username"
				onClick={(e) => {
					e.stopPropagation();
					onUsernameClick();
				}}
			>
				- {username}
			</h5>
		</div>
	);
}

export default Card;
