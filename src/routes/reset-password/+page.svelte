<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Loader from '../../components/Loader.svelte';
	import { pb } from '$lib/pb';
	let isLoading = false;
	let send = false;

	let email = '';

	async function requestPasswordReset() {
		if (email === '') {
			return;
		}

		isLoading = true;
		try {
			const response = await pb.collection('users').requestPasswordReset(email);
			if (response) {
				send = true;
			}
		} catch (error) {
			console.error(error);
		}
		isLoading = false;
	}
</script>

<div class="flex h-[100dvh] w-full items-center justify-center">
	{#if isLoading}
		<Loader />
	{:else if send}
		<div class="flex flex-col items-center rounded bg-slate-900 p-8">
			<h1 class="text-3xl">Password Reset</h1>
			<p class="mt-4">An email has been sent to your email address.</p>
		</div>
	{:else}
		<div class="flex flex-col items-center rounded bg-slate-900 p-8">
			<h1 class="text-3xl">Password Reset</h1>
			<p class="my-4">Please enter your email.</p>
			<Input type="email" placeholder="Email" bind:value={email} />
			<br />
			<Button onclick={requestPasswordReset}>Reset Password</Button>
		</div>
	{/if}
</div>
