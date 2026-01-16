<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
		<h1 class="mb-2">Zapomenuté heslo</h1>
		<p class="mb-6 text-sm text-muted-foreground">
			Zadejte svůj e-mail a my vám pošleme odkaz pro změnu hesla.
		</p>

		{#if form?.success}
			<div class="rounded-md border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
				Odkaz byl odeslán. Zkontrolujte prosím svou e-mailovou schránku.
			</div>
			<div class="mt-6 text-center">
				<a href="/login" class="text-sm font-medium">Zpět na přihlášení</a>
			</div>
		{:else}
			<form method="POST" use:enhance class="space-y-4">
				<div class="flex flex-col gap-1.5">
					<label for="email" class="text-sm font-medium">E-mail</label>
					<input type="email" name="email" id="email" required placeholder="jmeno@priklad.cz" />
				</div>

				{#if form?.error}
					<p class="text-sm text-destructive">{form.error}</p>
				{/if}

				<button
					type="submit"
					class="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground hover:opacity-90"
				>
					Odeslat odkaz
				</button>
			</form>
			<div class="mt-6 text-center">
				<a href="/login" class="text-sm">Zpět na přihlášení</a>
			</div>
		{/if}
	</div>
</div>
