import React from 'react';
import './Form.css';
import Button from '../Button/Button';
import { useState } from 'react';

function Form({ onSubmit, onClose }) {
	const [text, setText] = useState('');
	const [username, setUsername] = useState('');

	//hanterar när man trycker på publicer knappen
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ username, text });
		onClose();
	};

	return (
		<form onSubmit={handleSubmit} className="form">
			<textarea
				value={text}
				className="form-input"
				onChange={(e) => setText(e.target.value)}
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
