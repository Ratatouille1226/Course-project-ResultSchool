import { findUser } from './find-user';
import { addUser } from './add-user';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},

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
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	async registration(regLogin, regPassword) {
		//Получение пользователей по логину
		const existedUser = await findUser(regLogin);

		//Возвращаем ошибки если логин занят
		if (existedUser) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}
		//Создание пользователя (добавления в базу данных)
		const user = await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
