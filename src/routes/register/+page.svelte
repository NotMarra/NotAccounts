<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form;
	$: redirectTo = $page.url.searchParams.get('redirectTo');

	// Form states
	let email = '';
	let password = '';
	let passwordConfirm = '';

	// Validation logic
	$: isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	$: passwordRules = {
		length: password.length >= 8,
		hasNumber: /\d/.test(password),
		hasUpper: /[A-Z]/.test(password),
		hasLower: /[a-z]/.test(password)
	};

	$: isPasswordStrong = Object.values(passwordRules).every(Boolean);
	$: passwordsMatch = password === passwordConfirm && password !== '';
	$: isFormValid = isEmailValid && isPasswordStrong && passwordsMatch;
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
		<h1 class="mb-6 text-center text-2xl font-bold">Create Account</h1>

		<form
			method="POST"
			action="?/register&redirectTo={redirectTo || ''}"
			use:enhance
			class="space-y-4"
		>
			<div class="flex flex-col gap-1.5">
				<label for="email" class="text-sm font-medium">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					bind:value={email}
					required
					class="rounded border p-2 {!isEmailValid && email ? 'border-red-500' : ''}"
				/>
				{#if email && !isEmailValid}
					<span class="text-xs text-red-500">Please enter a valid email address.</span>
				{/if}
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="password" class="text-sm font-medium">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					bind:value={password}
					required
					class="rounded border p-2"
				/>
				<div class="mt-1 grid grid-cols-2 gap-1 text-xs">
					<p class={passwordRules.length ? 'text-green-600' : 'text-gray-400'}>
						● Min. 8 characters
					</p>
					<p class={passwordRules.hasUpper ? 'text-green-600' : 'text-gray-400'}>
						● Uppercase letter
					</p>
					<p class={passwordRules.hasLower ? 'text-green-600' : 'text-gray-400'}>
						● Lowercase letter
					</p>
					<p class={passwordRules.hasNumber ? 'text-green-600' : 'text-gray-400'}>
						● At least one number
					</p>
				</div>
			</div>

			<div class="flex flex-col gap-1.5">
				<label for="passwordConfirm" class="text-sm font-medium">Confirm Password</label>
				<input
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					bind:value={passwordConfirm}
					required
					class="rounded border p-2 {!passwordsMatch && passwordConfirm ? 'border-red-500' : ''}"
				/>
				{#if passwordConfirm && !passwordsMatch}
					<span class="text-xs text-red-500">Passwords do not match.</span>
				{/if}
			</div>

			{#if form?.error}
				<p class="text-sm font-medium text-destructive">{form.error}</p>
			{/if}

			<button
				type="submit"
				disabled={!isFormValid}
				class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted"
			>
				Register
			</button>
		</form>
	</div>
</div>
