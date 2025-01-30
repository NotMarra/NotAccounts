<script lang="ts">
	import { User } from '$lib/object';
	import Dropzone from 'svelte-file-dropzone';
	import {
		uploadUserAvatar,
		getUserAvatar,
		sendVerificationEmail,
		sendEmailChangeEmail,
		updateUser
	} from '$lib/api';
	import Loader from '../components/Loader.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	export let user: User;
	var uploading = false;
	let files = [];
	let isEditing = false;
	let editedProfile: {
		username: string;
		email?: string;
		firstname: string;
		lastname: string;
	} = {
		username: user.username,
		email: user.email,
		firstname: user.firstname,
		lastname: user.lastname
	};

	async function handleDrop(event: any): Promise<void> {
		if (uploading) return;
		uploading = true;
		console.log(event);
		const file = event.detail.acceptedFiles[0];
		const response = await uploadUserAvatar(user.id, file);
		if (response) {
			user.avatar = await getUserAvatar(user.id);
		}
		uploading = false;
	}

	async function requestVerificationEmail() {
		await sendVerificationEmail(user.email);
	}

	async function saveProfile() {
		try {
			if (editedProfile.email) {
				if (user.email !== editedProfile.email) {
					await sendEmailChangeEmail(editedProfile.email);
				}
			}

			delete editedProfile.email;

			await updateUser(user.id, editedProfile);
			user.username = editedProfile.username;
			user.firstname = editedProfile.firstname;
			user.lastname = editedProfile.lastname;
			isEditing = false;
		} catch (error) {
			console.error('Failed to update profile', error);
		}
	}

	function cancelEditing() {
		editedProfile.firstname = user.firstname;
		editedProfile.lastname = user.lastname;
		isEditing = false;
	}
</script>

<div class="p-4">
	<div class="mx-auto flex max-w-screen-xl flex-col rounded border p-4">
		<h2 class="mb-2 text-xl">Personal Information</h2>
		<div class="flex">
			<div class="flex w-1/3 flex-col items-center gap-4 border-r pr-4">
				<Dropzone
					class="my-2 flex w-full flex-col items-center justify-center rounded border-2 border-dashed p-8 pb-4 transition-all hover:border-sky-600"
					accept={['image/*']}
					containerClasses="custom-dropzone"
					on:drop={handleDrop}
				>
					{#if files.length === 0 && !uploading}
						<div class="w-full rounded-xl">
							{#if user.avatar}
								<img
									src={`https://base.notmarra.com/api/files/users/${user.id}/${user.avatar}`}
									alt={user.avatar}
									class="rounded"
								/>
							{:else}
								<div
									class="flex h-full w-full items-center justify-center rounded bg-slate-800 text-white"
								>
									{user.username.slice(0, 2).toUpperCase()}
								</div>
							{/if}
						</div>
						<p class="mt-2 opacity-50">Drop your profile picture here!</p>
					{:else}
						<Loader />
					{/if}
				</Dropzone>
			</div>
			<div class="flex w-2/3 flex-col py-2 pl-4">
				{#if !user.verified}
					<Alert.Root class="mb-4">
						<Alert.Title>Account Not Verified</Alert.Title>
						<Alert.Description>
							Your account is not verified. Please check your email for the verification link. If
							you did not receive the email, you can request a new one. <br /><br />
							<Button variant="outline" onclick={requestVerificationEmail}
								>Request New Verification Email</Button
							>
						</Alert.Description>
					</Alert.Root>
				{/if}

				<form>
					{#if isEditing}
						<div class="flex justify-between gap-8">
							<div class="w-full">
								<label for="username" class="mb-2 block">Username</label>
								<Input
									type="text"
									id="username"
									bind:value={editedProfile.username}
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
							<div class="w-full">
								<label for="email" class="mb-2 block">Email</label>
								<Input type="email" id="email" bind:value={editedProfile.email} />
							</div>
						</div>
						<div class="flex justify-between gap-8">
							<div class="w-full">
								<label for="view-first-name" class="mb-2 block">First Name</label>
								<Input
									type="text"
									id="first-name"
									bind:value={editedProfile.firstname}
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
							<div class="w-full">
								<label for="view-last-name" class="mb-2 block">Last Name</label>
								<Input
									type="text"
									id="last-name"
									bind:value={editedProfile.lastname}
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
						</div>

						<div class="flex space-x-2">
							<Button onclick={saveProfile} variant="default">Save</Button>
							<Button onclick={cancelEditing} variant="outline">Cancel</Button>
						</div>
					{:else}
						<div class="flex justify-between gap-8">
							<div class="w-full">
								<label for="username" class="mb-2 block">Username</label>
								<Input
									type="text"
									id="username"
									value={user.username}
									disabled
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
							<div class="w-full">
								<label for="email" class="mb-2 block">Email</label>
								<Input
									type="text"
									id="email"
									value={user.email}
									disabled
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
						</div>
						<div class="flex justify-between gap-8">
							<div class="w-full">
								<label for="view-first-name" class="mb-2 block">First Name</label>
								<Input
									type="text"
									id="view-first-name"
									value={user.firstname}
									disabled
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
							<div class="w-full">
								<label for="view-last-name" class="mb-2 block">Last Name</label>
								<Input
									type="text"
									id="view-last-name"
									value={user.lastname}
									disabled
									class="mb-3 w-full rounded border p-2"
								/>
							</div>
						</div>
						<Button onclick={() => (isEditing = true)} variant="outline">Edit Profile</Button>
					{/if}
				</form>
			</div>
		</div>
	</div>
</div>
