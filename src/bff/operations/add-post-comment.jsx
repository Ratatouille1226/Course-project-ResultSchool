import { addComment, getPost, getComments } from '../api';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const addPostComment = async (hash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];
	//Отправляем сессию для проверки доступа пользователю к управлению пользователями
	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await addComment(userId, postId, content);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
