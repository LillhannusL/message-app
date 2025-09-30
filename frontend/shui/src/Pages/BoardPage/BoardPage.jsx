import React from 'react';
import './BoardPage.css';
import Card from '../../Components/Card/Card.jsx';
import Button from '../../Components/Button/Button.jsx';
import { FaPen } from 'react-icons/fa';
import { UseFetch } from '../../Hooks/UseFetch.js';

function BoardPage() {
	const { messages, isLoading, isError } = UseFetch();

	if (isLoading)
		return (
			<section className="page">
				<p>Loading...</p>
			</section>
		);
	if (isError)
		return (
			<section className="page">
				<p>Error!</p>
			</section>
		);

	return (
		<div className="boardPage">
			<section className="card-box">
				{messages.map((message) => (
					<Card
						key={message.id}
						date={message.createdAt}
						username={message.username}
						text={message.text}
					/>
				))}
			</section>
			<Button className="button" btnText={<FaPen />} />
		</div>
	);
}

export default BoardPage;
