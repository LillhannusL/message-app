import { UpdateItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../db.mjs';
import { sendResponse } from '../../services/utils/response';

export const handler = async (event) => {
	try {
		//hämtar id från path och hämtar text från body
		const id = event.pathParameters.id;
		const { text: newText } = JSON.parse(event.body);

		const exsistResult = await client.send(
			new GetItemCommand({
				TableName: 'ShuiDataTable',
				Key: {
					pk: { S: 'NOTE#' },
					sk: { S: String(id) },
				},
			})
		);

		const exists = exsistResult.Item;
		if (!exists) {
			return sendResponse(404, {
				success: false,
				message: 'Post not found',
			});
		}

		//om ingen text skicka felmeddelande
		if (!newText) {
			return sendResponse(400, {
				success: false,
				message: 'Text is required',
			});
		}

		//update item
		const command = new UpdateItemCommand({
			TableName: 'ShuiDataTable',
			Key: {
				pk: { S: 'NOTE#' },
				sk: { S: id },
			},
			UpdateExpression: 'SET #text = :newText',
			ExpressionAttributeNames: { '#text': 'text' },
			ExpressionAttributeValues: { ':newText': { S: newText } },
			ReturnValues: 'ALL_NEW',
		});

		const result = await client.send(command);

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
		});
	}
};
