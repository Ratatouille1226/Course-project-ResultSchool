import { transformUser } from '../transformers';

export const findUser = async (loginToFind) =>
	fetch(`http://localhost:3000/users?login=${loginToFind}`)
		.then((loadedUsers) => loadedUsers.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
