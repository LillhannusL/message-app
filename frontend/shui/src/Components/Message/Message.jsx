import React from 'react';
import './Message.css';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import UpdateMessage from '../UpdateMessage/UpdateMessage';

function Message({ message, onClose, onUpdate }) {
	if (!message) return null;
	const [openUpdate, setOpenUpdate] = useState(false);

	const shortDate = message.createdAt.substring(0, 10);
	const shortTime = message.createdAt.substring(11, 19);

	const handleClick = () => {
		setOpenUpdate(true);
	};

	return (
		<Modal onClose={onClose}>
			{!openUpdate ? (
				<>
					<section className="message_content">
						<p className="message_text">{message.text}</p>
						<h5 className="message_username">{message.username}</h5>
						<h6 className="message_date">
							{shortDate} {shortTime}
						</h6>
					</section>
					<Button
						btnOnClick={handleClick}
						btnText={'Ändra meddelande'}
						className="messageBtn"
					/>
				</>
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
