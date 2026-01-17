import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		await locals.pb.collection('users').confirmVerification(params.token);
	} catch (err) {
		throw error(400, 'Verification link is invalid or has expired.');
	}

	throw redirect(303, '/login?verified=true');
};