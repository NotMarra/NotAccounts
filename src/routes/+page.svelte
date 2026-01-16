<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	const getAvatarUrl = (user: any) => {
		if (!user?.avatar) return `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`;
		return `https://pb.notmarra.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}?thumb=100x100`;
	};

	// Pomocník pro zobrazení zpráv
	$: successMessage =
		form?.success || form?.pwSuccess || form?.emailSuccess || form?.verificationSuccess;
</script>

<div class="container mx-auto max-w-5xl p-4 md:p-8">
	<header class="mb-10 flex items-end justify-between border-b border-border pb-6">
		<div class="space-y-1">
			<h1 class="text-4xl">Nastavení účtu</h1>
			<p class="text-muted-foreground">Spravujte svou identitu a zabezpečení napříč aplikacemi.</p>
		</div>
		<form method="POST" action="?/logout" use:enhance>
			<button
				class="rounded-md border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				Odhlásit se
			</button>
		</form>
	</header>

	<div class="space-y-8">
		{#if !data.user?.verified}
			<div
				class="flex flex-col items-start justify-between gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 md:flex-row md:items-center"
			>
				<div class="space-y-1">
					<h3 class="text-lg text-primary">Ověřte svůj e-mail</h3>
					<p class="text-sm text-muted-foreground">
						Váš účet není plně aktivní. Zkontrolujte schránku <strong>{data.user?.email}</strong>.
					</p>
				</div>
				<form method="POST" action="?/resendVerification" use:enhance>
					<button
						type="submit"
						class="rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground hover:opacity-90"
					>
						Znovu odeslat kód
					</button>
				</form>
			</div>
		{/if}

		{#if successMessage}
			<div
				class="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center text-sm font-medium text-primary"
			>
				Změny byly úspěšně uloženy.
			</div>
		{/if}

		<div class="grid gap-8 lg:grid-cols-12">
			<aside class="space-y-6 lg:col-span-4">
				<div class="rounded-lg border border-border bg-card p-6 shadow-sm">
					<div class="flex flex-col items-center text-center">
						<div class="relative mb-4">
							<img
								src={getAvatarUrl(data.user)}
								alt="Avatar"
								class="h-32 w-32 rounded-md border-2 border-border object-cover shadow-sm"
							/>
						</div>
						<h3 class="text-xl leading-tight">{data.user?.name || 'Uživatel'}</h3>
						<p class="text-sm font-medium text-primary">@{data.user?.username}</p>
						<p class="text-xs text-muted-foreground">{data.user?.email}</p>
					</div>

					<div class="mt-6 space-y-5 border-t border-border pt-6">
						<div class="text-xs">
							<span class="mb-2 block tracking-wider text-muted-foreground uppercase"
								>Vaše oprávnění</span
							>
							<div class="flex flex-wrap gap-1">
								{#if data.user?.perms && data.user.perms.length > 0}
									{#each data.user.perms as perm}
										<span
											class="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 font-semibold text-primary"
										>
											{perm}
										</span>
									{/each}
								{:else}
									<span class="text-[10px] text-muted-foreground italic">Základní přístup</span>
								{/if}
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4 border-t border-border pt-4">
							<div class="text-xs">
								<span class="block tracking-wider text-muted-foreground uppercase">Status</span>
								<span
									class="font-medium {data.user?.verified ? 'text-primary' : 'text-destructive'}"
								>
									{data.user?.verified ? 'Ověřen' : 'Neověřen'}
								</span>
							</div>
							<div class="text-right text-xs">
								<span class="block tracking-wider text-muted-foreground uppercase">Členem od</span>
								<span class="font-medium">{new Date(data.user?.created).toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</div>
			</aside>

			<main class="space-y-8 lg:col-span-8">
				<section class="rounded-lg border border-border bg-card p-6 shadow-sm">
					<h3 class="mb-6 border-b border-border pb-2 text-lg">Osobní údaje</h3>
					<form
						method="POST"
						action="?/updateProfile"
						use:enhance
						enctype="multipart/form-data"
						class="space-y-6"
					>
						<div class="grid gap-4 md:grid-cols-2">
							<div class="flex flex-col gap-2">
								<label for="username" class="text-sm font-medium">Uživatelské jméno</label>
								<input
									type="text"
									name="username"
									id="username"
									value={data.user?.username || ''}
									required
								/>
							</div>
							<div class="flex flex-col gap-2">
								<label for="name" class="text-sm font-medium">Celé jméno</label>
								<input
									type="text"
									name="name"
									id="name"
									value={data.user?.name || ''}
									placeholder="Jan Novák"
								/>
							</div>
							<div class="flex flex-col gap-2 md:col-span-2">
								<label for="avatar" class="text-sm font-medium">Změnit profilovou fotku</label>
								<input
									type="file"
									name="avatar"
									id="avatar"
									accept="image/*"
									class="text-sm file:mr-4 file:rounded file:bg-secondary file:px-3 file:py-1 file:text-xs"
								/>
							</div>
						</div>
						<div class="flex justify-end">
							<button
								type="submit"
								class="rounded-md bg-primary px-8 py-2 font-medium text-primary-foreground hover:opacity-90"
							>
								Aktualizovat profil
							</button>
						</div>
					</form>
				</section>

				<section class="rounded-lg border border-border bg-card p-6 shadow-sm">
					<h3 class="mb-6 border-b border-border pb-2 text-lg">Zabezpečení</h3>

					<form method="POST" action="?/requestEmailChange" use:enhance class="mb-10 space-y-4">
						<div class="flex flex-col gap-2">
							<label for="newEmail" class="text-sm font-medium">Změnit e-mail</label>
							<div class="flex gap-2">
								<input
									type="email"
									name="newEmail"
									id="newEmail"
									placeholder="novy@email.cz"
									required
									class="flex-1"
								/>
								<button
									type="submit"
									class="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
								>
									Změnit
								</button>
							</div>
							{#if form?.emailError}<p class="text-xs text-destructive">{form.emailError}</p>{/if}
						</div>
					</form>

					<form method="POST" action="?/changePassword" use:enhance class="space-y-4">
						<div class="grid gap-4 md:grid-cols-2">
							<div class="flex flex-col gap-2 md:col-span-2">
								<label for="oldPassword" class="text-sm font-medium">Současné heslo</label>
								<input type="password" name="oldPassword" id="oldPassword" required />
							</div>
							<div class="flex flex-col gap-2">
								<label for="password" class="text-sm font-medium">Nové heslo</label>
								<input type="password" name="password" id="password" required />
							</div>
							<div class="flex flex-col gap-2">
								<label for="passwordConfirm" class="text-sm font-medium">Potvrzení hesla</label>
								<input type="password" name="passwordConfirm" id="passwordConfirm" required />
							</div>
						</div>
						{#if form?.pwError}<p class="text-xs text-destructive">{form.pwError}</p>{/if}
						<div class="flex justify-end pt-2">
							<button
								type="submit"
								class="rounded-md bg-primary px-8 py-2 font-medium text-primary-foreground hover:opacity-90"
							>
								Aktualizovat heslo
							</button>
						</div>
					</form>
				</section>

				<section class="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
					<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
						<div class="space-y-1">
							<h3 class="text-lg text-destructive">Smazat účet</h3>
							<p class="text-sm text-muted-foreground">
								Tato akce je nevratná a odstraní všechna vaše data.
							</p>
						</div>
						<form
							method="POST"
							action="?/deleteAccount"
							use:enhance={({ cancel }) => {
								if (!confirm('Opravdu chcete smazat svůj účet? Tato akce je definitivní.'))
									cancel();
							}}
						>
							<button
								type="submit"
								class="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90"
							>
								Smazat účet
							</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	</div>
</div>
