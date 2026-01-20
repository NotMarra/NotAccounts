import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login');
	return { user: locals.user };
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const formData = await request.formData();
		
		const avatar = formData.get('avatar') as File;
		if (avatar && avatar.size === 0) {
			formData.delete('avatar');
		}

		try {
			if (!locals.user) return fail(401);
			
			await locals.pb.collection('users').update(locals.user.id, formData);
		} catch (err: any) {
			return fail(400, { error: 'Failed to update profile.' });
		}

		return { success: true };
	},

	changePassword: async ({ request, locals }) => {
		const data = await request.formData();
		const oldPassword = data.get('oldPassword') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		try {
			await locals.pb.collection('users').update(locals.user!.id, {
				oldPassword,
				password,
				passwordConfirm
			});
		} catch (err: any) {
			return fail(400, { pwError: 'Failed to change password. Is the old password correct?' });
		}
		return { pwSuccess: true };
	},

	requestEmailChange: async ({ request, locals }) => {
		const data = await request.formData();
		const newEmail = data.get('newEmail') as string;

		try {
			await locals.pb.collection('users').requestEmailChange(newEmail);
		} catch (err: any) {
			return fail(400, { emailError: 'Failed to send email change request.' });
		}
		return { emailSuccess: true };
	},

	deleteAccount: async ({ locals, cookies }) => {
		try {
			await locals.pb.collection('users').delete(locals.user!.id);
			locals.pb.authStore.clear();

			cookies.delete('pb_auth', {
				path: '/',
				domain: dev ? undefined : '.notmarra.com',
				secure: !dev,
				httpOnly: true,
				sameSite: 'lax'
			});
		} catch (err: any) {
			return fail(400, { deleteError: 'Failed to delete account.' });
		}
		throw redirect(303, '/register');
	},

	resendVerification: async ({ locals }) => {
		if (!locals.user || !locals.user.email) {
			return fail(401);
		}

		try {
			await locals.pb.collection('users').requestVerification(locals.user.email);
		} catch (err: any) {
			return fail(400, { verificationError: 'Failed to send verification email.' });
		}

		return { verificationSuccess: true };
	},

	logout: async ({ locals, cookies }) => {
		locals.pb.authStore.clear();

		cookies.delete('pb_auth', {
			path: '/',
			domain: dev ? undefined : '.notmarra.com',
			secure: !dev,
			httpOnly: true,
			sameSite: 'lax'
		});

		throw redirect(303, '/login');
	}
};