import { generateDate } from '../utils/generateDate';

export const addUser = (login, password) =>
	fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registed_at: generateDate(),
			role_id: 2,
		}),
	}).then((createdUser) => createdUser.json());
