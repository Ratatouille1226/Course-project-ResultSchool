import { getRoles } from '../api';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	//Отправляем сессию для проверки доступа пользователю к управлению пользователями
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}
	//Создание пользователя (добавления в базу данных)
	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
