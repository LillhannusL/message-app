import { dynamoDBClient } from '@aws-skd/client-dynamodb';

const client = new dynamoDBClient({ region: 'eu-north-1' });

export { client };
