<script lang="ts">
	import { page } from '$app/stores';
	import { verifyUserEmail } from '$lib/api';
	import { onMount } from 'svelte';
	import Loader from '../../../components/Loader.svelte';

	$: token = $page.params.token;

	let response: Boolean;
	let isLoading = true;

	onMount(async () => {
		response = await verifyUserEmail(token);
		isLoading = false;
	});
</script>

<div class="flex h-[100dvh] w-full items-center justify-center">
	{#if isLoading}
		<Loader />
	{:else if response}
		<div class="flex flex-col items-center rounded bg-slate-900 p-8">
			<h1 class="text-3xl">Email verified!</h1>

			<p class="mt-4">You can now close this window and continue using the application.</p>
		</div>
	{:else}
		<div class="flex flex-col items-center rounded bg-slate-900 p-8">
			<h1 class="text-3xl">Email verification failed!</h1>

			<p class="mt-4">Please try again or contact support.</p>
		</div>
	{/if}
</div>
