// src/routes/register/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirm') as string;

		// 1. Získání cílové adresy pro přesměrování
		const redirectTo = url.searchParams.get('redirectTo');

		try {
			// 2. Vytvoření uživatele v PocketBase
			await locals.pb.collection('users').create({
				email,
				password,
				passwordConfirm,
			});

			// 3. OKAMŽITÉ odeslání verifikačního e-mailu
			await locals.pb.collection('users').requestVerification(email);

			// 4. Přihlášení uživatele (aby se mu vytvořila session cookie)
			await locals.pb.collection('users').authWithPassword(email, password);

		} catch (err: any) {
			console.error('Registration error:', err);
			return fail(400, { error: 'Registrace selhala. Možná e-mail již existuje.' });
		}

		// 5. Bezpečné přesměrování zpět na subdoménu (stejná logika jako u loginu)
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

		// Pokud není redirectTo, pošleme ho na nastavení nebo home
		throw redirect(303, '/settings');
	}
};