// $env
import { JWT_SECRET, SALT } from '$env/static/private';
// $lib
import { User } from '$lib/server/db/models/user';
// 3rd party
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// tag creation validation
const validateNewTag = async (tag: string) => {
	const exists = await User.exists({ tag });
	if (exists) {
		return 'tag is already taken';
	}
	if (tag.length < 4) {
		return 'tag must be at least 4 characters';
	}
	if (tag.length > 24) {
		return 'tag must be at most 24 characters';
	}
	if (!/^[a-zA-Z0-9_]+$/.test(tag)) {
		return 'tag must only contain english letters, numbers, and underscores';
	}
};

// password creation validation
const validateNewPassword = (password: string) => {
	if (password.length < 8) {
		return 'password must be at least 8 characters';
	}
	if (password.length > 64) {
		return 'password must be at most 64 characters';
	}
	if (password.includes(' ')) {
		return 'password must not contain spaces';
	}
	if (!/[a-z]/.test(password)) {
		return 'password must contain at least one lowercase letter';
	}
	if (!/[A-Z]/.test(password)) {
		return 'password must contain at least one uppercase letter';
	}
	if (!/[0-9]/.test(password)) {
		return 'password must contain at least one number';
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		return 'password must contain at least one special character';
	}
};

export const signUpUser = async (
	tag: string,
	password: string
): Promise<{ tagError?: string; passwordError?: string; jwt?: string }> => {
	const tagError = await validateNewTag(tag);
	const passwordError = validateNewPassword(password);

	if (tagError || passwordError) {
		return { tagError, passwordError };
	}
	const hashedPassword = await bcrypt.hash(password, SALT);
	const user = await User.create({ tag, password: hashedPassword });
	const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });
	return { jwt: token };
};

export const logInUser = async (
	tag: string,
	password: string
): Promise<{ tagError?: string; passwordError?: string; jwt?: string }> => {
	const user = await User.findOne({ tag });
	if (!user) {
		return { tagError: 'user not found' };
	}
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		return { passwordError: 'password incorrect' };
	}
	const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });
	return { jwt: token };
};
