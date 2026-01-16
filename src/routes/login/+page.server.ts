// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	// Pokud uživatel už má validní session
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

		// 1. Získání cílové adresy z URL parametru (?redirectTo=...)
		const redirectTo = url.searchParams.get('redirectTo');

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (err: any) {
			return fail(400, { error: 'Neplatný e-mail nebo heslo' });
		}

		// 2. Bezpečnostní kontrola: Přesměrováváme jen na naše domény
		if (redirectTo) {
			try {
				const dest = new URL(redirectTo);
				// Povolíme přesměrování jen pokud končí na .notmarra.com nebo je to lokální cesta
				if (dest.hostname.endsWith('notmarra.com') || dest.hostname.endsWith('notmarra.local')) {
					throw redirect(303, redirectTo);
				}
			} catch (e) {
				// Pokud je URL nevalidní nebo redirect vyvolá výjimku (což SvelteKit dělá schválně)
				if (e instanceof Error && 'status' in e) throw e; 
			}
		}

		// Výchozí přesměrování, pokud redirectTo chybí nebo je nebezpečné
		throw redirect(303, '/');
	}
};