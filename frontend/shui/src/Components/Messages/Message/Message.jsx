import React from 'react';
import './Message.css';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../../UI/Modal/Modal.jsx';
import Button from '../../UI/Button/Button';
import UpdateMessage from '../UpdateMessage/UpdateMessage';

function Message({ message, onClose, onUpdateClick }) {
	if (!message) return null;

	const shortDate = message.createdAt.substring(0, 10);
	const shortTime = message.createdAt.substring(11, 19);

	// const handleClick = () => {
	// 	setTimeout(() => setOpenUpdate(true), 0);
	// 	console.log(message.id);
	// };

	return (
		<Modal onClose={onClose}>
			<section className="message">
				<h1 className="message_title">{message.username}</h1>
				<div className="message_content">
					<p className="message_date">
						{shortDate} {shortTime}
					</p>
					<p className="message_text">{message.text}</p>
				</div>
				<Button
					btnOnClick={() => onUpdateClick(message)}
					btnText={'Ändra meddelande'}
					className="messageBtn"
				/>
			</section>
		</Modal>
	);
}

export default Message;
