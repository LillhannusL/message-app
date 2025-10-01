import React from 'react';
import { useState } from 'react';
import './BoardPage.css';
import Card from '../../Components/Card/Card.jsx';
import Button from '../../Components/Button/Button.jsx';
import { FaPen } from 'react-icons/fa';
import { UseFetch } from '../../Hooks/UseFetch.js';
import NewMessage from '../../Components/NewMessage/NewMessage.jsx';
import axios from 'axios';

function BoardPage() {
	const { messages, isLoading, isError } = UseFetch();
	const [isOpen, setIsOpen] = useState(false);

	//om den laddar
	if (isLoading)
		return (
			<section className="page">
				<p>Loading...</p>
			</section>
		);
	//om de blir fel
	if (isError)
		return (
			<section className="page">
				s<p>Error!</p>
			</section>
		);

	//post anrop för att posta nya meddelanden som skickas till newMessage
	const handlesubmit = (data) => {
		axios
			.post(
				'https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/message',
				data
			)
			.then((response) => {
				console.log(response.data);
				window.location.reload();
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	};

	//Sortera meddelandena för att få de senaste först
	const sortedMessages = messages.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	return (
		<div className="boardPage">
			<section className="card-box">
				{sortedMessages.map((message) => (
					<Card
						key={message.id}
						date={message.createdAt}
						username={message.username}
						text={message.text}
					/>
				))}
			</section>
			{!isOpen && (
				<Button
					className="boardPage-button"
					btnOnClick={() => setIsOpen(true)}
					btnText={<FaPen />}
				/>
			)}

			{isOpen && (
				<NewMessage onClose={() => setIsOpen(false)} onSubmit={handlesubmit} />
			)}
		</div>
	);
}

export default BoardPage;
