<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { LogOut, Rocket } from 'lucide-svelte';

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
			<!--TODO-->
			<Sidebar.Group />
		</Sidebar.Content>
		<Sidebar.Footer>
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a
				href="#"
				class="flex h-auto w-full justify-center gap-2 rounded-md border-2 border-primary-600 bg-primary-800 p-2 px-5 text-center align-middle font-bold transition-colors hover:bg-primary-600"
				><Rocket /> Become Pro!</a
			>
		</Sidebar.Footer>
	</Sidebar.Root>
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
