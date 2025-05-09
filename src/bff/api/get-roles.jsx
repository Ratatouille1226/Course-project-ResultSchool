export const getRoles = async () => {
	const res = await fetch('http://localhost:3000/roles');
	const roles = await res.json();
	return roles;
};
