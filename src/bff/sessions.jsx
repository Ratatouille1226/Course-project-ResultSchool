export const sessions = {
	list: {},
	create(user) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = user;

		return user;
	},
	remove(hash) {
		delete this.list[hash];
	},
};
