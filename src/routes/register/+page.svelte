<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { checkLogin } from '$lib/pb';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	if (checkLogin()) {
		window.location.href = '/';
	}
</script>

<div class="flex h-[100vh] w-full flex-col items-center justify-center px-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Register</Card.Title>
			<Card.Description>Enter your email and password to create an account.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance class="space-y-2">
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Username</Form.Label>
							<Input {...props} bind:value={$formData.username} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input type="password" {...props} bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input type="password" {...props} bind:value={$formData.confirmPassword} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Register</Form.Button>
			</form>
		</Card.Content>
		<Card.Footer>
			<p class="text-sm">
				Already have an account? <a
					href="/login"
					class="text-sky-600 underline transition hover:text-sky-700">Login!</a
				>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
