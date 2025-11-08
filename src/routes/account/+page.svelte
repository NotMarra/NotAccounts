<script lang="ts">
	import { Upload } from 'lucide-svelte';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	import FileDrop from 'filedrop-svelte';
	import type { Files } from 'filedrop-svelte';
	let files: Files;

	const user = {
		username: 'UserName24',
		account_type: 'Premium Account',
		image_src: 'https://github.com/shadcn.png',
		email: 'mail@gmail.com',
		register_at: '12.12.2000',
		account_status: 'Verified'
	};
</script>

<div class="flex items-center">
	<Avatar.Root
		class="h-15 w-15"
	>
		<Avatar.Image src={user.image_src} alt={user.username} />
		<Avatar.Fallback>{user.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
	</Avatar.Root>

	<div class="ml-5 w-full">
		<h2 class="font-semibold">{user.username}</h2>
		<p class="text-sm text-muted-foreground">{user.account_type}</p>
	</div>
</div>
<Separator class="mt-5 mb-5" />

<Tabs.Root>
	<Card.Root>
		<Card.Content class="flex flex-col gap-5">
			<div>
				<Label for="account-picture" class="mb-2">Profile Picture</Label>
				<FileDrop
					id="account-picture"
					accept="image/* "
					on:filedrop={(e) => {
						files = e.detail.files;
						console.log(files);
					}}
				>
					<Card.Root>
						<Card.Content class="flex flex-col items-center justify-center text-muted-foreground">
							<Upload />
							<span class="text-sm">Upload files</span>
						</Card.Content>
					</Card.Root>
				</FileDrop>
			</div>

			<div>
				<Label for="account-username" class="mb-2">Username</Label>
				<Input id="account-username" value={user.username} />
			</div>

			<div>
				<Label for="account-email" class="mb-2">E-mail</Label>
				<Input id="account-email" type="email" value={user.email} />
			</div>

			<div>
				<Label class="mb-1">Registration date</Label>
				<span class="text-sm">{user.register_at}</span>
			</div>

			<div>
				<Label class="mb-1">Account Status</Label>
				<span class="text-sm">{user.account_status}</span>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="cursor-pointer border-1 border-primary-400 bg-transparent text-white"
				>Save changes</Button
			>
		</Card.Footer>
	</Card.Root>
</Tabs.Root>
