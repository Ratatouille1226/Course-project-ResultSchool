import { findUser, addUser } from '../api';
import { sessions } from '../sessions';

export const registration = async (regLogin, regPassword) => {
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
			roleId: user.roleId,
			session: sessions.create(user),
		},
	};
};
