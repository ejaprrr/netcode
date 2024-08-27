// @sveltejs
import { redirect } from '@sveltejs/kit';
// types
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.userId) redirect(303, '/app');
};
