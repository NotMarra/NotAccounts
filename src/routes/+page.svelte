<script lang="ts">
	import type { User } from '$lib/object';
	import { logout, pb } from '$lib/pb';
	import { checkLogin } from '$lib/pb';
	import { onMount } from 'svelte';
	import { getUser } from '$lib/api';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Loader from '../components/Loader.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	import House from 'lucide-svelte/icons/house';

	import HomeFile from '../views/home.svelte';

	var activeFile = HomeFile;
	var activeItem = 'Home';
	export let user: User | null = null;

	const items = [
		{
			title: 'Home',
			file: HomeFile,
			icon: House
		}
	];

	onMount(async () => {
		if (!checkLogin()) {
			window.location.href = '/login';
		}
		user = pb.authStore.model ? await getUser(pb.authStore.model.id) : null;
	});
</script>

{#if user === null}
	<div
		class="absolute z-50 flex h-[100vh] w-full items-center justify-center bg-slate-950 text-center"
	>
		<Loader />
	</div>
{/if}
<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Content class="bg-slate-950">
			<Sidebar.Group>
				<Sidebar.GroupLabel>NotAccounts</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<button
											on:click={() => {
												if (item.file) activeFile = item.file;
												activeItem = item.title;
											}}
											{...props}
										>
											<item.icon />
											<span>{item.title}</span>
										</button>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		{#if user}
			<Separator />
			<Sidebar.Footer class="bg-slate-950">
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<button class="flex w-full items-center" on:click={logout}>
								<Avatar.Root class="mr-2 size-8 rounded">
									<Avatar.Image
										src={`https://base.notmarra.com/api/files/users/${user.id}/${user.avatar}`}
										alt={user.avatar}
									/>
									<Avatar.Fallback>{user.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
								<span>{user.username}</span>
								<span class=" ml-auto">Logout</span>
							</button>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Footer>
		{/if}
	</Sidebar.Root>
	<ScrollArea class="h-[100dvh] w-full rounded-md p-8">
		<p class="opacity-50">{activeItem}</p>
		{#if activeFile && user}
			<svelte:component this={activeFile} {user} />
		{:else}
			<div class="flex h-full items-center justify-center">
				<Loader />
			</div>
		{/if}
	</ScrollArea>
</Sidebar.Provider>
