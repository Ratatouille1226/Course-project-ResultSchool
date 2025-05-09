import { sessions } from '../sessions';
import { findUser } from '../api';

export const authorize = async (authLogin, authPassword) => {
	//Получение пользователей по логину
	const user = await findUser(authLogin);

	//Возвращаем ошибки если логин не совпадает
	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			res: null,
		};
	}

	const { id, login, password, role_id } = user;

	//Проверка совпадения пароля
	if (authPassword !== password) {
		return {
			error: 'Пароль не совпадает',
			res: null,
		};
	}

	//Возвращаем действия авторизованного пользователя
	return {
		error: null,
		res: {
			id,
			login,
			role_id,
			session: sessions.create(user),
		},
	};
};
