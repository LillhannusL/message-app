import React from 'react';
import './BoardPage.css';
import Card from '../../Components/Card/Card.jsx';

function BoardPage() {
	return (
		<div className="boardPage">
			<div className="card-box">
				<Card text="hello" />
				<Card text="hello" />
				<Card text="hello" />
				<Card text="hello" />
				<Card text="hello" />
			</div>
		</div>
	);
}

export default BoardPage;
