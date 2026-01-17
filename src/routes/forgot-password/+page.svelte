<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
		<h1 class="mb-2">Forgot Password</h1>
		<p class="mb-6 text-sm text-muted-foreground">
			Enter your email and we'll send you a link to reset your password.
		</p>

		{#if form?.success}
			<div class="rounded-md border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
				Link has been sent. Please check your email inbox.
			</div>
			<div class="mt-6 text-center">
				<a href="/login" class="text-sm font-medium">Back to login</a>
			</div>
		{:else}
			<form method="POST" use:enhance class="space-y-4">
				<div class="flex flex-col gap-1.5">
					<label for="email" class="text-sm font-medium">Email</label>
					<input type="email" name="email" id="email" required placeholder="name@example.com" />
				</div>

				{#if form?.error}
					<p class="text-sm text-destructive">{form.error}</p>
				{/if}

				<button
					type="submit"
					class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:opacity-90"
				>
					Send link
				</button>
			</form>
			<div class="mt-6 text-center">
				<a href="/login" class="text-sm">Back to login</a>
			</div>
		{/if}
	</div>
</div>
