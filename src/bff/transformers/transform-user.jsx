export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	password: dbUser.password,
	registed_at: dbUser.registed_at,
	roleId: dbUser.roleId,
});
