import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Form from '../../UI/Form/Form.jsx';
import axios from 'axios';

function NewMessage({ onClose }) {
	//post anrop för att posta nya meddelanden som skickas till newMessage
	const handlesubmit = (data) => {
		axios
			.post(
				'https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/message',
				data
			)
			.then((response) => {
				console.log(response.data);
				window.location.reload();
			})
			.catch((error) => {
				console.log('Error:', error);
			});
	};

	return (
		<Modal onClose={onClose}>
			<Form onSubmit={handlesubmit} onClose={onClose} />;
		</Modal>
	);
}

export default NewMessage;
