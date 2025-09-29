import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../db.mjs';
import { sendResponse } from '../../services/utils/response';
import { v4 as uuidv4 } from 'uuid';
import { validateMessage } from '../../services/middleware/validateMessage';

export const handler = async (event) => {
	console.log(event);
	try {
		//skapar ett id
		const id = uuidv4().slice(0, 5);

		//hämtar de som finns i body
		const post = JSON.parse(event.body);

		//Validering
		const { valid, message } = validateMessage(post);
		if (!valid) {
			return sendResponse(400, {
				success: false,
				message,
			});
		}

		//Skapar ett nytt meddelande
		const command = new PutItemCommand({
			TableName: 'ShuiDataTable',
			Item: {
				pk: { S: `NOTE#` },
				sk: { S: String(id) },
				username: { S: post.username },
				text: { S: post.text },
				createdAt: { S: new Date().toISOString() },
			},
		});

		await client.send(command);

		return sendResponse(200, {
			success: true,
			message: 'Message Created!',
			messageId: id,
			username: post.username,
			text: post.text,
			createdAt: post.createdAt,
		});
	} catch (error) {
		console.log(error);
		return sendResponse(500, {
			success: false,
			message: 'Something went wrong',
		});
	}
};
