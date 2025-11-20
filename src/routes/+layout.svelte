<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import Menu from '$lib/assets/Sidebar.svelte';
	import { pages } from '../stores/constants';

	let activeUrl = $state(page.url.pathname);
	let { children } = $props();

	$effect(() => {
		activeUrl = page.url.pathname;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider>
	<Menu items={pages} {activeUrl} />
	<main class="h-dvh w-full">
		<Sidebar.Trigger class="m-3" />
		{@render children?.()}
	</main>
</Sidebar.Provider>
