import axios from 'axios';
import { useEffect, useState } from 'react';

export const UseFetch = () => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(null);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('https://258pt6fzhf.execute-api.eu-north-1.amazonaws.com/messages')
			.then((response) => {
				const items = response.data.result.Items;
				const cleanMessages = items.map((item) => ({
					id: item.sk?.S,
					username: item.username?.S,
					text: item.text?.S,
					createdAt: item.createdAt?.S,
				}));
				setMessages(cleanMessages);
			})
			.catch((error) => {
				console.log('Fetch error: ', error);
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return { messages, isLoading, isError };
};
