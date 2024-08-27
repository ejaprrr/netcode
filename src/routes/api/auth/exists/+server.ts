import { User } from '$lib/server/db/models/user.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const tag = url.searchParams.get('tag');

	const exists = Boolean(await User.exists({ tag }));

	return json({ exists });
};
