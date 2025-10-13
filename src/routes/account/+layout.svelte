<script lang="ts">
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import { User } from "lucide-svelte";
  import { Star } from "lucide-svelte";
  import { Banknote } from "lucide-svelte";
  import { Settings } from "lucide-svelte";

	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	
	let { children } = $props();


	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

  const links = [
    { label: 'Account', href: '/account', icon: User },
    { label: 'Premium', href: '/account/premium', icon: Star },
    { label: 'Billing', href: '/account/billing', icon: Banknote },
    { label: 'Settings', href: '/account/settings', icon: Settings },
  ];
</script>

{@render children?.()}

<Navigation layout="bar" class="fixed bottom-0 w-full border-t-1 bg-surface-950">
    <Navigation.Menu class="grid grid-cols-4 gap-2">
      {#each links as link (link)}
        {@const Icon = link.icon}
        <a href={link.href} class={['btn flex-col items-center gap-1 text-white', page.url.pathname === link.href && "bg-blue-500"]} style="filter: brightness(100%)">
          <Icon class="size-5" />
          <span class="text-[10px]">{link.label}</span>
        </a>
      {/each}
    </Navigation.Menu>
  </Navigation>

<!--TODO-->
<footer>
</footer>