import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './UpdateMessage.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

function UpdateMessage({ message, onClose, onUpdate }) {
	const [text, setText] = useState(message.text);
	const [username, setUsername] = useState(message.username);
	const id = message.id;

	//skickar put anrop
	const onSubmit = (data) => {
		axios
			.put(
				`https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/message/${message.id}`,
				data
			)
			.then((response) => {
				console.log(response.data);
				onUpdate(message.id, data);
				onClose();
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	};

	//hanterar vad som händer vid en submit
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			text: text || message.text,
			username: username || message.username,
			id,
		});
		onClose();
	};

	return (
		<Modal onClose={onClose}>
			<form onSubmit={handleSubmit} className="updateForm">
				<textarea
					value={text}
					className="updateForm-input"
					onChange={(e) => setText(e.target.value)}
					placeholder={message.text}
				/>
				<input
					value={username}
					className="updateForm-username"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					placeholder={message.username}
				/>
				<Button
					className="updateForm-submitbutton"
					type="submit"
					btnText="Uppdatera"
				/>
			</form>
		</Modal>
	);
}

export default UpdateMessage;
