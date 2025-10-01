import React from 'react';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';

function NewMessage({ onClose, onSubmit }) {
	return (
		<Modal onClose={onClose}>
			<Form onSubmit={onSubmit} onClose={onClose} />;
		</Modal>
	);
}

export default NewMessage;
