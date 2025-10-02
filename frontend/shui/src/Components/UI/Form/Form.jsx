import React from 'react';
import './Form.css';
import Button from '../Button/Button.jsx';
import { useState } from 'react';

function Form({ onSubmit, onClose, text, setText, error }) {
	const [localError, setLocalError] = useState(false);
	const [username, setUsername] = useState('');

	//hanterar när man trycker på publicer knappen
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await onSubmit({ username, text });
			onClose();
		} catch (err) {
			setLocalError(true);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="form">
			<textarea
				value={text}
				className="form-input"
				onChange={(e) => {
					setText(e.target.value);
					if (localError) setLocalError(false);
				}}
				placeholder="Skriv något..."
			/>
			<input
				className="form-username"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Användarnamn"
			/>
			<Button className="form-submitbutton" type="submit" btnText="Publicera" />
		</form>
	);
}

export default Form;
