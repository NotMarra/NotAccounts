<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;

	// Sledujeme parametry v URL pro zobrazení hlášek
	$: verified = $page.url.searchParams.get('verified');
	$: resetSuccess = $page.url.searchParams.get('resetSuccess');
	$: redirectTo = $page.url.searchParams.get('redirectTo');
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
		<h1 class="mb-2 text-center">Vítejte zpět</h1>
		<p class="mb-6 text-center text-sm text-muted-foreground">Přihlaste se ke svému účtu</p>

		{#if verified}
			<div
				class="mb-6 rounded-md border border-primary/20 bg-primary/10 p-3 text-center text-sm font-medium text-primary"
			>
				E-mail byl úspěšně ověřen. Nyní se můžete přihlásit.
			</div>
		{/if}

		{#if resetSuccess}
			<div
				class="mb-6 rounded-md border border-primary/20 bg-primary/10 p-3 text-center text-sm font-medium text-primary"
			>
				Heslo bylo úspěšně změněno.
			</div>
		{/if}

		<form
			method="POST"
			action="?/login&redirectTo={redirectTo || ''}"
			use:enhance
			class="space-y-4"
		>
			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium">E-mail</label>
				<input type="email" name="email" id="email" required />
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="password" class="text-sm font-medium">Heslo</label>
				<input type="password" name="password" id="password" required />
			</div>

			{#if form?.error}
				<p class="text-sm font-medium text-destructive">{form.error}</p>
			{/if}

			<button
				type="submit"
				class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
			>
				Přihlásit se
			</button>
		</form>

		<div class="mt-6 flex flex-col gap-2 text-center text-sm">
			<p>
				Nemáte účet? <a href="/register?redirectTo={redirectTo || ''}" class="font-medium"
					>Vytvořit účet</a
				>
			</p>
			<a
				href="/forgot-password"
				class="text-muted-foreground underline-offset-4 hover:text-foreground"
				>Zapomněli jste heslo?</a
			>
		</div>
	</div>
</div>
