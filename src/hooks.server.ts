// @sveltejs
import type { Handle } from '@sveltejs/kit';
// $env
import { JWT_SECRET } from '$env/static/private';
import { PUBLIC_JWT_COOKIE_KEY } from '$env/static/public';
// $lib
import { User } from '$lib/server/db/models/user';
import { connect } from '$lib/server/db/mongoose';
// 3rd party
import jwt from 'jsonwebtoken';

// create a session with the database
await connect();

// handle token verification and user locals
export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
	const token = event.cookies.get(PUBLIC_JWT_COOKIE_KEY);
	if (!token) return resolve(event);

	await jwt.verify(token, JWT_SECRET, { ignoreExpiration: false }, async (error, decoded) => {
		const { userId } = decoded as { userId: string };

		if (error || !userId || !(await User.exists({ _id: userId })))
			event.cookies.delete(PUBLIC_JWT_COOKIE_KEY, { path: '/' });
		else event.locals.userId = userId;
	});

	return resolve(event);
};
