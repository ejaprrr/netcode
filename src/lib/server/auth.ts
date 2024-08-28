import type { RequestEvent } from '@sveltejs/kit';
import { JWT_SECRET, SALT } from '$env/static/private';
import { PUBLIC_JWT_COOKIE_KEY } from '$env/static/public';
import users from '$lib/server/db/services/user';
import { validateNewTag, validateNewPassword, validateTag, validatePassword } from '$lib/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthFeedback {
	tagError?: string;
	passwordError?: string;
	jwt?: string;
}

export const createToken = (userId: string): string => {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const getTokenIdClaim = (token: string): string | undefined => {
	let userId;
	jwt.verify(token, JWT_SECRET, { ignoreExpiration: false }, (error, decoded) => {
		if (!error) {
			userId = (decoded as { userId: string }).userId;
		}
	});
	return userId;
};

export const signUpUser = async (tag: string, password: string): Promise<AuthFeedback> => {
	const exists = await users.exists({ tag });

	const tagError = exists ? 'tag is already taken' : await validateNewTag(tag);
	const passwordError = validateNewPassword(password);
	if (tagError || passwordError) {
		return { tagError, passwordError };
	}

	const hashedPassword = await bcrypt.hash(password, Number(SALT));
	const user = await users.create({ tag, password: hashedPassword });

	return !user._id ? {} : { jwt: createToken(user._id.toString()) };
};

export const logInUser = async (tag: string, password: string): Promise<AuthFeedback> => {
	const user = await users.find({ tag });
	const tagError = (await validateTag(tag)) ?? (user ? undefined : 'user not found');
	if (tagError) {
		return { tagError };
	}

	const passwordMatch = await bcrypt.compare(password, user.password);
	const passwordError =
		(await validatePassword(password)) ?? (passwordMatch ? undefined : 'incorrect password');
	if (passwordError) {
		return { passwordError };
	}

	return { jwt: createToken(user._id.toString()) };
};

export const verifyUser = async (event: RequestEvent, token: string) => {
	const idClaim = getTokenIdClaim(token);
	if (idClaim) {
		const exists = await users.exists({ _id: idClaim });
		if (exists) {
			return (event.locals.userId = idClaim);
		}
	}
	return event.cookies.delete(PUBLIC_JWT_COOKIE_KEY, { path: '/' });
};
