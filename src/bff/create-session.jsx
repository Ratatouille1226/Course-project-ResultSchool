import { removeComment } from './session/index';
import { ROLE } from '../constants/index';

export const createSession = (roleId) => {
	const session = {
		//Разлогиниться (пробегаемся по ключам и удаляем все)
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};
	//Проверяем кто пользователь, и добавляем разрешенные действия
	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.MODERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.READER: {
			break;
		}
		default:
		//Ничего не делаем
	}

	return session;
};
