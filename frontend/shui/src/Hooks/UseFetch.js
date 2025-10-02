import axios from 'axios';
import { useEffect, useState } from 'react';

export const UseFetch = (url, dataPath = 'result.Items') => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(null);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(url)
			.then((response) => {
				const pathParts = dataPath.split('.');
				let items = response.data;
				for (let part of pathParts) {
					items = items?.[part];
				}
				const cleanData = (items || []).map((item) => ({
					id: item.sk?.S,
					username: item.username?.S,
					text: item.text?.S,
					createdAt: item.createdAt?.S,
				}));
				setData(cleanData);
			})
			.catch((error) => {
				console.log('Fetch error: ', error);
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	}, [url, dataPath]);

	return { data, isLoading, isError };
};
