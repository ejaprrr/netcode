import { User } from '$lib/server/db/models/user';

const exists = async (query: object): Promise<boolean> => {
	try {
		const user = await User.exists({ ...query });
		return !!user;
	} catch (error) {
		console.error('Error checking if user exists:', error);
		return false;
	}
};

const create = async (payload: object): Promise<any> => {
	try {
		const user = await User.create({ ...payload });
		return user;
	} catch (error) {
		console.error('Error creating user:', error);
	}
};

const find = async (query: object): Promise<any> => {
	try {
		const user = await User.findOne({ ...query })
			.select('-password')
			.lean();
		return user;
	} catch (error) {
		console.error('Error finding user:', error);
		return undefined;
	}
};

export default {
	exists,
	create,
	find
};
