import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('https://pb.notmarra.com');

    const cookieHeader = event.request.headers.get('cookie') || '';
    event.locals.pb.authStore.loadFromCookie(cookieHeader);

    try {
        if (event.locals.pb.authStore.isValid) {
            event.locals.user = event.locals.pb.authStore.model;
        } else {
            event.locals.user = null;
        }
    } catch (_) {
        event.locals.pb.authStore.clear();
        event.locals.user = null;
    }

    const response = await resolve(event);

    const cookieOptions = {
        httpOnly: true,
        secure: !dev,
        sameSite: 'lax' as const,
        path: '/',
    };

    if (!dev && event.url.hostname.includes('notmarra.com')) {
        (cookieOptions as any).domain = '.notmarra.com';
    }

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie(cookieOptions));

    return response;
};