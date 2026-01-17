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
	login: async ({ request, locals, url }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		const redirectTo = url.searchParams.get('redirectTo');

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (err: any) {
			return fail(400, { error: 'Invalid email or password' });
		}

		if (redirectTo) {
			try {
				const dest = new URL(redirectTo);
				
				const isAllowedDomain = 
					dest.hostname.endsWith('notmarra.com') || 
					dest.hostname.endsWith('notmarra.local') || 
					dest.hostname === 'localhost'; 

				if (isAllowedDomain) {
					throw redirect(303, redirectTo);
				}
			} catch (e) {
				if (e && typeof e === 'object' && 'status' in e) throw e; 
			}
		}

		throw redirect(303, '/');
	}
};