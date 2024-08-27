// $env
import { JWT_SECRET, SALT } from '$env/static/private';
// $lib
import { User } from '$lib/server/db/models/user';
import {
	validateNewTag,
	validateNewPassword,
	validatePassword,
	validateTag
} from '$lib/validation';
// 3rd party
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUpUser = async (
	tag: string,
	password: string
): Promise<{ tagError?: string; passwordError?: string; jwt?: string }> => {
	const tagError = (await User.exists({ tag }))
		? 'tag is already taken'
		: await validateNewTag(tag);
	const passwordError = validateNewPassword(password);

	if (tagError || passwordError) {
		return { tagError, passwordError };
	}
	const hashedPassword = await bcrypt.hash(password, Number(SALT));
	const user = await User.create({ tag, password: hashedPassword });
	const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });
	return { jwt: token };
};

export const logInUser = async (
	tag: string,
	password: string
): Promise<{ tagError?: string; passwordError?: string; jwt?: string }> => {
	const user = await User.findOne({ tag });
	const tagError = await validateTag(tag);
	if (tagError) {
		return { tagError };
	}
	if (!user) {
		return { tagError: 'user not found' };
	}
	const passwordMatch = await bcrypt.compare(password, user.password);
	const passwordError = await validatePassword(password);
	if (passwordError) {
		return { passwordError };
	}
	if (!passwordMatch) {
		return { passwordError: 'incorrect password' };
	}
	const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });
	return { jwt: token };
};
