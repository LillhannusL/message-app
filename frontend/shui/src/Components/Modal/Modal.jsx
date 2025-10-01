import React from 'react';
import Button from '../Button/Button';
import './Modal.css';

function Modal({ onClose, children, showCloseBtn = true }) {
	//hanterar när man trycker utanför rutan
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className="modal_overlay" onClick={handleOverlayClick}>
			<div className="modal_content">
				{showCloseBtn && (
					<Button className="modal_EscBtn" btnOnClick={onClose} btnText="X" />
				)}
				{children}
			</div>
		</div>
	);
}

export default Modal;
