//Не передаем сюда диспатч потому что обработаем этот экшен как промис в компоненте PostForm

import { setPostData } from './set-post-data';

export const savePostAsync = (requestServer, newPostData) => (dispatch) =>
	requestServer('savePost', newPostData).then((updatePost) => {
		dispatch(setPostData(updatePost.res));
	});
