<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
		<h1 class="mb-6">New Password</h1>
		<form method="POST" use:enhance class="space-y-4">
			<div class="flex flex-col gap-1.5">
				<label for="password" class="text-sm font-medium">New Password</label>
				<input type="password" name="password" id="password" required />
			</div>
			<div class="flex flex-col gap-1.5">
				<label for="passwordConfirm" class="text-sm font-medium">Confirm Password</label>
				<input type="password" name="passwordConfirm" id="passwordConfirm" required />
			</div>

			{#if form?.error}
				<p class="text-sm text-destructive">{form.error}</p>
			{/if}
			<button
				type="submit"
				class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:opacity-90"
			>
				Change Password
			</button>
		</form>
	</div>
</div>
