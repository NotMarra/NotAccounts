<script lang="ts">
	import { page } from '$app/stores';
	import { formSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	type FormSchema = Infer<typeof formSchema>;

	let {
		data
	}: {
		data: {
			success: any;
			form: SuperValidated<FormSchema>;
		};
	} = $props();

	let success = $state(data?.success);

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onResult: ({ result }) => {
			if ('success' in result) {
				success = result.success;
			}
		}
	});

	const { form: formData, enhance, submitting, errors } = form;
</script>

<div class="flex h-[100dvh] w-full items-center justify-center">
	{#if success}
		<div class="flex flex-col items-center rounded bg-slate-900 p-8">
			<h1 class="text-3xl">Password Reset</h1>
			<p class="text-lg">Your password has been reset successfully.</p>
		</div>
	{:else}
		<div class="flex flex-col items-center rounded bg-slate-900 p-8">
			<h1 class="text-3xl">Password Reset</h1>

			<form method="POST" use:enhance class="space-y-2">
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

				<Input type="hidden" name="token" value={$page.params.token} />

				<Form.Button disabled={$submitting}>
					{$submitting ? 'Setting...' : 'Confirm Password'}
				</Form.Button>
			</form>
		</div>
	{/if}
</div>
