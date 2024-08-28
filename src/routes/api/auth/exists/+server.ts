import { json } from '@sveltejs/kit';
import users from '$lib/server/db/services/user';

export const GET = async ({ url }) => {
	const tag = url.searchParams.get('tag');

	const exists = await users.exists({ tag });

	return json({ exists });
};
