import { findUser } from './find-user';
import { addUser } from './add-user';
import { createSession } from './create-session';

export const server = {
	async authorize(authLogin, authPassword) {
		//Получение пользователей по логину
		const user = await findUser(authLogin);

		//Возвращаем ошибки если логин не совпадает
		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}

		//Проверка совпадения пароля
		if (authPassword !== user.password) {
			return {
				error: 'Пароль не совпадает',
				res: null,
			};
		}

		//Возвращаем действия авторизованного пользователя
		return {
			error: null,
			res: createSession(user.role_id),
		};
	},

	async registration(regLogin, regPassword) {
		//Получение пользователей по логину
		const user = await findUser(regLogin);

		//Возвращаем ошибки если логин занят
		if (user) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}
		//Создание пользователя (добавления в базу данных)
		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: createSession(user.role_id),
		};
	},
};
