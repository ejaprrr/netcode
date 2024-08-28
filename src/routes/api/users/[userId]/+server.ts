import { json } from '@sveltejs/kit';
import users from '$lib/server/db/services/user';

export const GET = async ({ params }) => {
	const { userId } = params;
	const user = await users.find({ _id: userId });
	if (!user) {
		return new Response('Not Found', { status: 404 });
	}

	return json({ ...user });
};
