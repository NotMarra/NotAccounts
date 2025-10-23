<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { User } from "lucide-svelte";
  import { Star } from "lucide-svelte";
  import { Boxes } from "lucide-svelte";
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
    { label: 'Products', href: '/account/products', icon: Boxes },
    { label: 'Premium', href: '/account/premium', icon: Star },
    { label: 'Settings', href: '/account/settings', icon: Settings },
  ];
</script>

<ModeWatcher defaultMode="dark"/>
<main class="p-5 pt-10">
  {@render children?.()}
</main>

<!-- Change grid-cols-4 class after altering const links length -->
<div class="fixed bottom-0 w-full border-t-1 grid grid-rows-1 grid-cols-4 gap-2 p-1">
      {#each links as link (link)}
        {@const Icon = link.icon}
        <a href={link.href} class={['btn flex-col items-center flex justify-center p-2 rounded-lg gap-1 text-white', 
        (page.url.pathname === link.href || page.url.pathname.split("/").length >= 2 && page.url.pathname.includes(link.href.split("/")[2]))
         && "bg-primary-600"]} style="filter: brightness(100%)">
          <Icon class="size-5" />
          <span class="text-[10px]">{link.label}</span>
        </a>
      {/each}
  </div>