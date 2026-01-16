import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		// Potvrzení verifikace pomocí tokenu z URL
		await locals.pb.collection('users').confirmVerification(params.token);
	} catch (err) {
		throw error(400, 'Verifikační odkaz je neplatný nebo již vypršel.');
	}

	// Po úspěchu ho pošleme na login s informací v URL
	throw redirect(303, '/login?verified=true');
};