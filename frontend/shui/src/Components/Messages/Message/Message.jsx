import React from 'react';
import './Message.css';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../../UI/Modal/Modal.jsx';
import Button from '../../UI/Button/Button';
import UpdateMessage from '../UpdateMessage/UpdateMessage';

function Message({ message, onClose, onUpdate }) {
	if (!message) return null;
	const [openUpdate, setOpenUpdate] = useState(false);

	const shortDate = message.createdAt.substring(0, 10);
	const shortTime = message.createdAt.substring(11, 19);

	const handleClick = () => {
		setOpenUpdate(true);
		console.log(message.id);
	};

	return (
		<Modal onClose={onClose}>
			{!openUpdate ? (
				<section className="message">
					<h2 className="message_title">{message.username}</h2>
					<div className="message_content">
						<h6 className="message_date">
							{shortDate} {shortTime}
						</h6>
						<p className="message_text">{message.text}</p>
					</div>
					<Button
						btnOnClick={handleClick}
						btnText={'Ändra meddelande'}
						className="messageBtn"
					/>
				</section>
			) : (
				<UpdateMessage
					message={message}
					onClose={onClose}
					onUpdate={onUpdate}
				/>
			)}
		</Modal>
	);
}

export default Message;
