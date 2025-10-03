import React from 'react';
import Modal from '../../UI/Modal/Modal';
import './UserMessages.css';

function UserMessages({
	onClose,
	selectedUsername,
	isUserLoading,
	userMessages,
}) {
	return (
		<Modal onClose={onClose}>
			<div className="user">
				<h1 className="user_title">{selectedUsername}</h1>
				{isUserLoading ? (
					<p>Loading...</p>
				) : (
					<ul className="user_ul">
						{userMessages.map((msg) => {
							const shortDate = msg.createdAt.substring(0, 10);
							const shortTime = msg.createdAt.substring(11, 19);
							return (
								<li className="user_li" key={msg.id}>
									<p className="user_date">
										{shortDate} {shortTime}
									</p>
									<p className="user_text">{msg.text}</p>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</Modal>
	);
}

export default UserMessages;
