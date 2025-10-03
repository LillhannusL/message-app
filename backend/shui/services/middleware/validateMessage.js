export function validateMessage(message) {
	if (!message) {
		return { valid: false, message: 'Missing message body' };
	}

	if (!message.username || message.username.trim() === '') {
		return { valid: false, message: 'Username is required' };
	}
	if (!message.text || message.text.trim() === '') {
		return { valid: false, message: 'Text is required' };
	}

	return { valid: true };
}
