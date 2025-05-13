import { updatePost } from '../api';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}
	const updatePostData = await updatePost(newPostData);

	return {
		error: null,
		res: updatePostData,
	};
};
