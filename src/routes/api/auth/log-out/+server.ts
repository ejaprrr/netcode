import { PUBLIC_JWT_COOKIE_KEY } from '$env/static/public';

export const GET = async ({ cookies }) => {
	cookies.delete(PUBLIC_JWT_COOKIE_KEY, { path: '/' });
	return new Response();
};
