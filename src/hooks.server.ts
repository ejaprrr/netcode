import type { Handle } from '@sveltejs/kit';
import { PUBLIC_JWT_COOKIE_KEY } from '$env/static/public';
import { connect } from '$lib/server/db/mongoose';
import { getTokenIdClaim, verifyUser } from '$lib/server/auth';
import users from '$lib/server/db/services/user';

await connect();

const protectedEndpoints = ['users'];

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
	const token = event.cookies.get(PUBLIC_JWT_COOKIE_KEY);
	if (token) {
		await verifyUser(event, token);
	}

	if (
		protectedEndpoints.some((endpoint) => event.url.pathname.startsWith(`/api/${endpoint}`)) &&
		!event.locals.userId
	) {
		return new Response('Unauthorized', { status: 401 });
	}

	return resolve(event);
};
