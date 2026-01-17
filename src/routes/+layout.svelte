<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/img/logo_bg.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="darkreader-lock" />

	<title>NotAccount</title>
</svelte:head>
{@render children()}
