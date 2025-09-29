import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../db.mjs';
import { sendResponse } from '../../services/utils/response';

export const handler = async (event) => {
	console.log(event);
	try {
		const command = new QueryCommand({
			TableName: 'ShuiDataTable',
			KeyConditionExpression: 'pk = :pk',
			ExpressionAttributeValues: {
				':pk': { S: 'NOTE#' },
			},
		});

		const result = await client.send(command);
		console.log(result.Items);

		return sendResponse(200, {
			success: true,
			result,
		});
	} catch (error) {
		console.log(error);
		return sendResponse(500, {
			success: false,
			message: 'Something went wrong',
		});
	}
};
