import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Form from '../../UI/Form/Form.jsx';
import axios from 'axios';
import { useState } from 'react';

function NewMessage({ onClose }) {
	const [text, setText] = useState('');
	const [error, setError] = useState(false);

	//post anrop för att posta nya meddelanden som skickas till newMessage
	async function handlesubmit(data) {
		return axios
			.post(
				'https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/message',
				data
			)
			.then((response) => {
				console.log(response.data);
				setError(false);
				window.location.reload();
			});
	}

	return (
		<Modal onClose={onClose}>
			<Form
				onSubmit={handlesubmit}
				onClose={onClose}
				text={text}
				setText={setText}
				error={error}
				setError={setError}
			/>
		</Modal>
	);
}

export default NewMessage;
