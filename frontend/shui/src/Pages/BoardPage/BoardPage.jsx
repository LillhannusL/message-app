import React from 'react';
import { useState, useEffect } from 'react';
import './BoardPage.css';
import Card from '../../Components/UI/Card/Card.jsx';
import Button from '../../Components/UI/Button/Button.jsx';
import { FaPen } from 'react-icons/fa';
import { UseFetch } from '../../Hooks/UseFetch.js';
import NewMessage from '../../Components/Messages/NewMessage/NewMessage.jsx';
import Message from '../../Components/Messages/Message/Message.jsx';
import UpdateMessage from '../../Components/Messages/UpdateMessage/UpdateMessage.jsx';
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
	const [selectedMessagetoUpdate, setselectedMessagetoUpdate] = useState(null);
	const [selectedUsername, setSelectedUsername] = useState(null);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [inputUsername, setInputUsername] = useState('');

	//hämtar en användares meddelanden
	const { data: userMessages, isLoading: isUserLoading } = UseFetch(
		selectedUsername
			? `https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/messages/${selectedUsername}`
			: null,
		'messages'
	);
	//Sätter meddelande när de har laddats från useFetch
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

	//Uppdaterar meddelande i state när det ändras
	const handleUpdateMessages = (id, updatedData) => {
		setMessages((prev) =>
			prev.map((msg) => (msg.id === id ? { ...msg, ...updatedData } : msg))
		);
	};

	//Öppnar UserMessages modal med vald användare
	const fetchMessagesbyUsername = (username) => {
		setSelectedUsername(username);
		setIsUserModalOpen(true);
	};

	// Klick på "Ändra meddelande" från Message modal
	const handleUpdateClick = (message) => {
		setselectedMessagetoUpdate(message);
		setSelectedMessage(null);
	};

	//Hanterar Enter i sökrutan
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (inputUsername.trim()) {
			const exists = messages.some(
				(msg) => msg.username === inputUsername.trim()
			);

			if (exists) {
				setSelectedUsername(inputUsername.trim());
				setIsUserModalOpen(true);
			}
			setInputUsername('');
		}
	};

	//Loader state
	if (isLoading)
		return (
			<section className="page">
				<p>Loading...</p>
			</section>
		);
	//Error state
	if (isError)
		return (
			<section className="page">
				s<p>Error!</p>
			</section>
		);

	return (
		<div className="boardPage">
			<div className="line"></div>
			<h1 className="boardPage_title">Shui Messages</h1>
			<div className="line"></div>

			{/*Sökfält */}
			<form className="boardPage_search" onSubmit={handleSearchSubmit}>
				<input
					type="text"
					placeholder="Skriv användarnamn..."
					value={inputUsername}
					onChange={(e) => setInputUsername(e.target.value)}
					className="boardPage_search-input"
				/>
			</form>

			{/*Renderar alla meddelanden */}
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

			{/*Modal för att visa meddelande för en User */}
			{selectedUsername && userMessages && isUserModalOpen && (
				<UserMessages
					onClose={() => setIsUserModalOpen(false)}
					selectedUsername={selectedUsername}
					isUserLoading={isUserLoading}
					userMessages={userMessages}
				/>
			)}

			{/*Nytt meddelande knapp. Visas bara om inga modaler är öppna */}
			{!isOpen &&
				!selectedMessage &&
				!isUserModalOpen &&
				!selectedMessagetoUpdate && (
					<Button
						className="boardPage-button"
						aria-label="Skriv nytt meddelande"
						btnOnClick={() => setIsOpen(true)}
						btnText={<FaPen />}
					/>
				)}

			{/*Modal för nytt meddelande */}
			{isOpen && <NewMessage onClose={() => setIsOpen(false)} />}

			{/*Modal för valt meddelande */}
			{selectedMessage && (
				<Message
					message={selectedMessage}
					onClose={() => setSelectedMessage(null)}
					onUpdate={handleUpdateMessages}
					onUpdateClick={handleUpdateClick}
				/>
			)}

			{/*modal för att uppdatera meddelande */}
			{selectedMessagetoUpdate && (
				<UpdateMessage
					message={selectedMessagetoUpdate}
					onClose={() => setselectedMessagetoUpdate(null)}
					onUpdate={handleUpdateMessages}
				/>
			)}
		</div>
	);
}

export default BoardPage;
