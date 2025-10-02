import React from 'react';
import { useState, useEffect } from 'react';
import './BoardPage.css';
import Card from '../../Components/UI/Card/Card.jsx';
import Button from '../../Components/UI/Button/Button.jsx';
import { FaPen } from 'react-icons/fa';
import { UseFetch } from '../../Hooks/UseFetch.js';
import NewMessage from '../../Components/Messages/NewMessage/NewMessage.jsx';
import Message from '../../Components/Messages/Message/Message.jsx';
import UserMessages from '../../Components/Messages/UserMessages/UserMessages.jsx';

function BoardPage() {
	//hämtar alla meddelanden
	const {
		data: fetchedMessages,
		isLoading,
		isError,
	} = UseFetch(
		'https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/messages',
		'result.Items'
	);
	const [messages, setMessages] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [selectedUsername, setSelectedUsername] = useState(null);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);

	//hämtar en användares meddelanden
	const { data: userMessages, isLoading: isUserLoading } = UseFetch(
		selectedUsername
			? `https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/messages/${selectedUsername}`
			: null,
		'messages'
	);
	//uppdatera när de kommer ett nytt meddelande
	useEffect(() => {
		if (fetchedMessages) {
			setMessages(fetchedMessages);
		}
	}, [fetchedMessages]);

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

	//Sätter User och visar alla meddelande från den Usern
	const fetchMessagesbyUsername = (username) => {
		setSelectedUsername(username);
		setIsUserModalOpen(true);
	};

	return (
		<div className="boardPage">
			<div className="line"></div>
			<h1 className="boardPage_title">Shui Messages</h1>
			<div className="line"></div>
			<section className="card-box">
				{sortedMessages.map((msg) => (
					<Card
						key={msg.id}
						date={msg.createdAt}
						username={msg.username}
						text={msg.text}
						onClick={() => handleCardClick(msg.id)}
						onUsernameClick={() => fetchMessagesbyUsername(msg.username)}
					/>
				))}
			</section>

			{selectedUsername && userMessages && isUserModalOpen && (
				<UserMessages
					onClose={() => setIsUserModalOpen(false)}
					selectedUsername={selectedUsername}
					isUserLoading={isUserLoading}
					userMessages={userMessages}
				/>
			)}

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
