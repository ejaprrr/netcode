// @sveltejs
import { redirect } from '@sveltejs/kit';
// $env
import { PUBLIC_JWT_COOKIE_KEY } from '$env/static/public';
// $lib
import { logInUser } from '$lib/server/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const { tag, password } = Object.fromEntries(form.entries()) as {
			tag: string;
			password: string;
		};

		const { tagError, passwordError, jwt } = await logInUser(tag, password);

		if (!tagError && !passwordError && jwt) {
			cookies.set(PUBLIC_JWT_COOKIE_KEY, jwt, { path: '/', httpOnly: true });
			redirect(303, '/app');
		}

		return { tagError, passwordError };
	}
};
