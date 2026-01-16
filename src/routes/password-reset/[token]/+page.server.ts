import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const data = await request.formData();
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		try {
			await locals.pb.collection('users').confirmPasswordReset(
				params.token,
				password,
				passwordConfirm
			);
		} catch (err) {
			return fail(400, { error: 'Nepodařilo se resetovat heslo. Odkaz může být neplatný.' });
		}

		throw redirect(303, '/login?resetSuccess=true');
	}
};