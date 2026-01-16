// src/routes/logout/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals }) => {
		// 1. Vymažeme auth data z PocketBase instance na serveru
		locals.pb.authStore.clear();
		
		// 2. Vynulujeme locals.user
		locals.user = null;

		// 3. Přesměrujeme na login
		// Hook (v hooks.server.ts) se postará o to, aby se do prohlížeče 
		// poslala prázdná/expirovaná cookie díky exportToCookie().
		throw redirect(303, '/login');
	}
};