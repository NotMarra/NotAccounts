import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const data = await request.formData();
		const password = data.get('password') as string;

		try {
			await locals.pb.collection('users').confirmEmailChange(params.token, password);
		} catch (err) {
			return fail(400, { error: 'Error changing email. Invalid password or token.' });
		}

		throw redirect(303, '/settings?emailChanged=true');
	}
};