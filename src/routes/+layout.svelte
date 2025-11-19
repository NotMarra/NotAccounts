<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { LogOut } from 'lucide-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Header>
			<div class="flex justify-center align-middle">
				<Avatar.Root class="mx-2 my-auto">
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<h2>[username]</h2>
					<p class="text-sm opacity-50">[email]</p>
				</div>
				<button>
					<LogOut class="mr-auto ml-6 size-5 opacity-50" />
				</button>
			</div>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group />
			<Sidebar.Group />
		</Sidebar.Content>
		<Sidebar.Footer />
	</Sidebar.Root>
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
