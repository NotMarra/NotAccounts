<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form;

	// Získáme redirectTo z aktuální URL, abychom ho mohli předat dál
	$: redirectTo = $page.url.searchParams.get('redirectTo');
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
		<h1 class="mb-2 text-center">Vytvořit účet</h1>

		<form
			method="POST"
			action="?/register&redirectTo={redirectTo || ''}"
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

			<div class="flex flex-col gap-1.5">
				<label for="passwordConfirm" class="text-sm font-medium">Potvrzení hesla</label>
				<input type="password" name="passwordConfirm" id="passwordConfirm" required />
			</div>

			{#if form?.error}
				<p class="text-sm font-medium text-destructive">{form.error}</p>
			{/if}

			<button
				type="submit"
				class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:opacity-90"
			>
				Registrovat a odeslat ověření
			</button>
		</form>
	</div>
</div>
