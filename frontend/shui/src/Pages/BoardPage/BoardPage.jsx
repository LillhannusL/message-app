import React from 'react';
import { useState, useEffect } from 'react';
import './BoardPage.css';
import Card from '../../Components/Card/Card.jsx';
import Button from '../../Components/Button/Button.jsx';
import { FaPen } from 'react-icons/fa';
import { UseFetch } from '../../Hooks/UseFetch.js';
import NewMessage from '../../Components/NewMessage/NewMessage.jsx';
import Message from '../../Components/Message/Message.jsx';
import axios from 'axios';

function BoardPage() {
	const { messages: fethedMessages, isLoading, isError } = UseFetch();
	const [messages, setMessages] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	// const [isMessageOpen, setIsMessageOpen] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState(null);

	//uppdatera när de kommer ett nytt meddelande
	useEffect(() => {
		if (fethedMessages) {
			setMessages(fethedMessages);
		}
	}, [fethedMessages]);

	//Sortera meddelandena för att få de senaste först
	const sortedMessages = messages.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	//hanterar när man klickar på ett meddelande
	const handleCardClick = (id) => {
		const message = sortedMessages.find((m) => m.id === id);
		setSelectedMessage(message);
	};

	//hanterar och updaterar messages när de kommer nytt
	const handleUpdateMessages = (id, updatedData) => {
		setMessages((prev) =>
			prev.map((msg) => (msg.id === id ? { ...msg, ...updatedData } : msg))
		);
	};

	//om useFetch laddar
	if (isLoading)
		return (
			<section className="page">
				<p>Loading...</p>
			</section>
		);
	//om useFetch blir fel
	if (isError)
		return (
			<section className="page">
				s<p>Error!</p>
			</section>
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
						onClick={() => handleCardClick(message.id)}
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
			{isOpen && <NewMessage onClose={() => setIsOpen(false)} />}

			{selectedMessage && (
				<Message
					message={selectedMessage}
					onClose={() => setSelectedMessage(null)}
					onUpdate={handleUpdateMessages}
				/>
			)}
		</div>
	);
}

export default BoardPage;
