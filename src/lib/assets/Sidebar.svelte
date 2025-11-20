<script lang="ts">
	import type { Component } from 'svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { LogOut, Rocket, House } from 'lucide-svelte';

	interface SidebarProps {
		items?: { label: string; link: string; icon: Component }[];
		activeUrl: string;
	}

	let props: SidebarProps = $props();
</script>

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
	<Separator />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each props.items ?? [] as item (item.label)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.link} {...props}>
										<item.icon />
										<span>{item.label}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a
			href="#"
			class="flex h-auto w-full justify-center gap-2 rounded-md border-2 border-primary-600 bg-primary-600/50 p-2 px-5 text-center align-middle font-bold transition-colors hover:bg-primary-600"
			><Rocket /> Become Pro!</a
		>
	</Sidebar.Footer>
</Sidebar.Root>
