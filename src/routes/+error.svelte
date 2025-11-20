<script lang="ts">
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { page } from '$app/state';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	let quote: { content: string; author: string } | null = $state(null);
	let loading = $state(true);
	let error = $state(false);

	$effect(() => {
		fetchQuote();
	});

	const fallbackQuotes = [
		{
			content: 'The best way to predict the future is to invent it.',
			author: 'Alan Kay'
		},
		{
			content: "Code is like humor. When you have to explain it, it's bad.",
			author: 'Cory House'
		},
		{
			content:
				'The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.',
			author: 'Tom Cargill'
		},
		{
			content: 'Debugging is twice as hard as writing the code.',
			author: 'Brian Kernighan'
		}
	];

	async function fetchQuote() {
		try {
			const response = await fetch('https://api.quotable.io/random?tags=technology|famous-quotes');
			const data = await response.json();
			quote = {
				content: data.content,
				author: data.author
			};
			loading = false;
		} catch (err) {
			console.error('API error:', err);
			const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
			quote = randomFallback;
			loading = false;
			error = true;
		}
	}
</script>

{#if loading}
	<div class="flex w-full justify-center align-middle">
		<Spinner class="size-8 text-primary" />
	</div>
{:else}
	<Empty.Root>
		<Empty.Header>
			<Empty.Title class="text-3xl font-bold text-primary">{page.status}</Empty.Title>
			<Empty.Description class="text-xl text-foreground">
				{page.error?.message}
			</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<Empty.Description>
				{quote?.content}<br />
				<span class="text-sm opacity-50">{quote?.author}</span>
			</Empty.Description>
		</Empty.Content>
	</Empty.Root>
{/if}
