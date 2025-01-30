<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { checkLogin, pb } from '$lib/pb';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Loader from '../../components/Loader.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;
	let isLoading = false;
	let err: Error | null = null;

	const form = superForm(data, {
		validators: zodClient(formSchema),

		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	async function authenticate() {
		isLoading = true;
		try {
			const response = await pb
				.collection('users')
				.authWithPassword($formData.username, $formData.password);
			if (response) {
				window.location.href = '/';
			}
		} catch (error) {
			isLoading = false;
			err = error as Error;
		}
	}

	if (checkLogin()) {
		window.location.href = '/';
	}
</script>

{#if isLoading}
	<div
		class="absolute z-50 flex h-[100vh] w-full items-center justify-center bg-slate-950 text-center"
	>
		<Loader />
	</div>
{/if}

<div class="flex h-[100dvh] w-full items-center justify-center">
	<form method="POST" use:enhance class="w-96 rounded border p-8">
		{#if err}
			<div class="mb-4 w-full rounded border border-red-800 p-4">
				<h1 class="text-lg font-bold text-red-800">Failed to authenticate!</h1>
				<p class="text-red-800">Wrong credentials!</p>
			</div>
		{/if}
		<h1 class="mb-4 text-2xl font-bold">Login</h1>
		<Form.Field {form} name="username">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Username</Form.Label>
					<Input {...props} bind:value={$formData.username} placeholder="Johny" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Password</Form.Label>
					<Input type="password" {...props} bind:value={$formData.password} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<button type="submit" class="my-4" on:click|preventDefault={authenticate}>
			<Form.Button>Login</Form.Button>
		</button>

		<p class="text-sm">
			Forgot password? <a
				class="text-sky-600 underline transition hover:text-sky-700"
				href="/reset-password">Reset Password!</a
			>
		</p>

		<p class="text-sm">
			Don't have an account? <a
				class="text-sky-600 underline transition hover:text-sky-700"
				href="/register">Register!</a
			>
		</p>
	</form>
</div>
