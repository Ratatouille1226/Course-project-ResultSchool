import { generateDate } from './generate-date';

export const addUser = (regLogin, regPassword) =>
	//Создание пользователя (добавления в базу данных)
	fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login: regLogin,
			password: regPassword,
			registed_at: generateDate(),
			role_id: 2,
		}),
	}).then((createdUser) => createdUser.json());
