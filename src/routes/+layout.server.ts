import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	// Posíláme info o uživateli do celého appu
	return {
		user: locals.user
	};
};