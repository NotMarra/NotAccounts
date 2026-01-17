<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: verified = $page.url.searchParams.get('verified');
	$: resetSuccess = $page.url.searchParams.get('resetSuccess');
	$: redirectTo = $page.url.searchParams.get('redirectTo');
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
		<h1 class="mb-2 text-center">Welcome back</h1>
		<p class="mb-6 text-center text-sm text-muted-foreground">Sign in to your account</p>

		{#if verified}
			<div
				class="mb-6 rounded-md border border-primary/20 bg-primary/10 p-3 text-center text-sm font-medium text-primary"
			>
				Email has been successfully verified. You can now sign in.
			</div>
		{/if}

		{#if resetSuccess}
			<div
				class="mb-6 rounded-md border border-primary/20 bg-primary/10 p-3 text-center text-sm font-medium text-primary"
			>
				Password has been successfully changed.
			</div>
		{/if}

		<form
			method="POST"
			action="?/login&redirectTo={redirectTo || ''}"
			use:enhance
			class="space-y-4"
		>
			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium">Email</label>
				<input type="email" name="email" id="email" required />
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="password" class="text-sm font-medium">Password</label>
				<input type="password" name="password" id="password" required />
			</div>

			{#if form?.error}
				<p class="text-sm font-medium text-destructive">{form.error}</p>
			{/if}

			<button
				type="submit"
				class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
			>
				Sign in
			</button>
		</form>

		<div class="mt-6 flex flex-col gap-2 text-center text-sm">
			<p>
				Don't have an account? <a href="/register?redirectTo={redirectTo || ''}" class="font-medium"
					>Create account</a
				>
			</p>
			<a
				href="/forgot-password"
				class="text-muted-foreground underline-offset-4 hover:text-foreground"
				>Forgot your password?</a
			>
		</div>
	</div>
</div>
