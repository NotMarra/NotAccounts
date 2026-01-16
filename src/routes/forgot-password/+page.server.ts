import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		try {
			// PocketBase pošle resetovací e-mail, pokud e-mail v DB existuje
			await locals.pb.collection('users').requestPasswordReset(email);
		} catch (err) {
			// Z bezpečnostních důvodů je lepší neříkat, jestli e-mail existuje nebo ne
			// Ale pro tvou potřebu můžeme vrátit chybu
			return fail(400, { error: 'Nepodařilo se odeslat e-mail pro reset.' });
		}

		return { success: true };
	}
};