import React, { use } from 'react';
import { useState } from 'react';
import './NewMessage.css';
import Button from '../Button/Button';

function NewMessage({ onClose, onSubmit }) {
	const [text, setText] = useState('');
	const [username, setUsername] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ username, text });
		onClose();
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<form onSubmit={handleSubmit} className="modal-form">
					<Button className="modalEscBtn" btnOnClick={onClose} btnText={'X'} />
					<textarea
						value={text}
						className="modal-input"
						onChange={(e) => setText(e.target.value)}
						placeholder="Skriv något..."
					/>
					<input
						className="modal-username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Användarnamn"
					/>
					<button className="modal-submitbutton" type="submit">
						Publicera
					</button>
				</form>
			</div>
		</div>
	);
}

export default NewMessage;
