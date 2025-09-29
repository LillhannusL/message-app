import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../db.mjs';
import { sendResponse } from '../../services/utils/response';
import { v4 as uuidv4 } from 'uuid';

export const handler = async (event) => {
	console.log(event);
	try {
		//skapar ett id
		const id = uuidv4().slice(0, 5);

		//hämtar de som finns i body
		const message = JSON.parse(event.body);

		//Skapar ett nytt meddelande
		const command = new PutItemCommand({
			TableName: 'ShuiDataTable',
			Item: {
				pk: { S: `USER#${message.username}` },
				sk: { S: `NOTE#${id}` },
				username: { S: message.username },
				text: { S: message.text },
				createdAt: { S: new Date().toISOString() },
			},
		});

		await client.send(command);

		return sendResponse(200, {
			success: true,
			message: 'Message Created!',
			messageId: id,
			username: message.username,
			text: message.text,
			createdAt: message.createdAt,
		});
	} catch (error) {
		console.log(error);
		return sendResponse(500, {
			success: false,
			message: 'Something went wrong',
		});
	}
};
