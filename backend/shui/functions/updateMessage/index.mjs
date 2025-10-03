import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../db.mjs';
import { sendResponse } from '../../services/utils/response';

export const handler = async (event) => {
	try {
		//hämtar id från path och hämtar text från body
		const id = event.pathParameters.id;
		const { text: newText } = JSON.parse(event.body);
		const { username: newUsername } = JSON.parse(event.body);

		//update item
		const command = new UpdateItemCommand({
			TableName: 'ShuiDataTable',
			Key: {
				pk: { S: 'NOTE#' },
				sk: { S: id },
			},
			UpdateExpression: 'SET #text = :newText, #username = :newUsername',
			ExpressionAttributeNames: { '#text': 'text', '#username': 'username' },
			ExpressionAttributeValues: {
				':newText': { S: newText },
				':newUsername': { S: newUsername },
			},
			ReturnValues: 'ALL_NEW',
		});

		const result = await client.send(command);

		if (!result.Attributes) {
			return sendResponse(404, { success: false, message: 'Item not found' });
		}

		//skicka result
		return sendResponse(200, {
			success: true,
			message: 'Post updated!',
			updatedItem: result.Attributes,
		});

		//fånga om fel
	} catch (error) {
		console.log(error);
		return sendResponse(500, {
			success: false,
			message: 'Could not update message',
			error,
		});
	}
};
