import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../db.mjs';
import { sendResponse } from '../../services/utils/response.js';

export const handler = async (event) => {
	const { username } = event.pathParameters;

	const command = new QueryCommand({
		TableName: 'ShuiDataTable',
		IndexName: 'usernameIndex',
		KeyConditionExpression: 'username = :username AND begins_with(pk, :pk)',
		ExpressionAttributeValues: {
			':username': { S: username },
			':pk': { S: 'NOTE#' },
		},
	});

	const messages = await client.send(command);

	return sendResponse(200, {
		messages: messages.Items,
	});
};
