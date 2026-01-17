import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		const redirectTo = url.searchParams.get('redirectTo') || '/';
		throw redirect(302, redirectTo);
	}
};


export const actions: Actions = {
	register: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirm') as string;

		const redirectTo = url.searchParams.get('redirectTo');

		try {
			await locals.pb.collection('users').create({
				email,
				password,
				passwordConfirm,
			});

			await locals.pb.collection('users').requestVerification(email);

			await locals.pb.collection('users').authWithPassword(email, password);

		} catch (err: any) {
			console.error('Registration error:', err);
			return fail(400, { error: 'Registration failed. Email may already exist.' });
		}

		if (redirectTo) {
			try {
				const dest = new URL(redirectTo);
				if (dest.hostname.endsWith('notmarra.com') || dest.hostname.endsWith('notmarra.local')) {
					throw redirect(303, redirectTo);
				}
			} catch (e) {
				if (e instanceof Error && 'status' in e) throw e;
			}
		}

		throw redirect(303, '/');
	}
};