import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		try {
			await locals.pb.collection('users').requestPasswordReset(email);
		} catch (err) {
			return fail(400, { error: 'Failed to send password reset email.' });
		}

		return { success: true };
	}
};