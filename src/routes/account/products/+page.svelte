<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Card } from '$lib/components/ui/card/index.js';
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { SquareArrowOutUpRight, Store, ReceiptText, Download, Play } from 'lucide-svelte';

	const products = {
		plugins: [
			{
				name: 'ProductName',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet lectus vel dolor consectetur, non condimentum tortor eleifend. Suspendisse sit.',
				description_short: 'Lorem ipsum dolor ipsum dolor ipsum dolor ipsum dolor',
				image_url: 'https://placehold.co/100',
				version: '1.54.0',
				documentation_url: "http://about:blank"
			}
		],
		games: [
			{
				name: 'ProductName',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet lectus vel dolor consectetur, non condimentum tortor eleifend. Suspendisse sit.',
				description_short: 'Lorem ipsum dolor, sit amet consectetur',
				image_url: 'https://placehold.co/100',
				playtime_hours: 26.5,
			}
		]
	};
</script>

<div class="grid grid-cols-2 gap-x-5">
	<a href="invoices">
		<Button class="h-15 w-full cursor-pointer hover:opacity-80"><Store />Browse Store</Button>
	</a>

	<a href="/store">
		<Button
			class="h-15 w-full cursor-pointer bg-card p-0 text-white outline-2 outline-primary-500 outline-solid hover:bg-muted"
			><ReceiptText /> See Invoices</Button
		>
	</a>
</div>
<Separator class="my-5 mb-2" />

{#if products.plugins.length > 0}
	<h1 class="mt-4 text-xl">Plugins</h1>
	{#each products.plugins as product}
		<Dialog.Root>
			<Dialog.Trigger class="w-full text-left">
				<Card class="relative mt-5 cursor-pointer flex-row gap-0 p-5 pb-7">
					<SquareArrowOutUpRight
						class="absolute top-3 right-3 w-4 cursor-pointer text-muted-foreground"
					/>
					<img src={product.image_url} alt="" class="h-[100px] w-[100px] rounded-sm" />
					<div class="ml-5">
						<h2>{product.name}</h2>
						<p class="mt-1 text-sm text-muted-foreground">{product.description_short}</p>
					</div>
					<p class="absolute right-3 bottom-2 text-xs text-muted-foreground">
						v{product.version} · Latest version
					</p>
				</Card>
			</Dialog.Trigger>
			<Dialog.Content>
				<div class="pr-5">
					<h2 class="text-2xl">{product.name}</h2>
					<img class="float-right ml-2 h-[100px]" src={product.image_url} alt="" />
					<p class="text-base text-muted-foreground mt-5">{product.description}</p>
				</div>

				<Tabs.Root value="versions">
					<Tabs.List class="w-full" style="background:none;">
						<Tabs.Trigger value="versions" style="border-radius: 0px;">Versions</Tabs.Trigger>
						<Tabs.Trigger value="documentation" style="border-radius: 0px;"><a href={product.documentation_url} class="flex gap-2 items-center"><SquareArrowOutUpRight /> Documentation</a></Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="versions">
						<h2 class="my-2">Latest Version</h2>
						<div class="flex gap-x-2 items-center">
							<Button><Download /> </Button>
							<h3>{product.version} · <span class="text-muted-foreground text-sm">Updated 15.5.2021</span></h3>
						</div>

						<Separator class="mt-5"/>
						<h2 class="my-2">Other Versions</h2>
						<div class="mt-2 flex gap-x-2 items-center">
							<Button><Download /> </Button>
							<h3>v1.53.2 · <span class="text-muted-foreground text-sm">Updated 15.5.2020</span></h3>
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
{/if}

{#if products.games.length > 0}
	<Separator class="mt-5 mb-2" />
	<h2 class="mt-4 text-xl">Games</h2>
	{#each products.plugins as product}
		<Dialog.Root open>
			<Dialog.Trigger class="w-full text-left">
				<Card class="relative mt-5 cursor-pointer flex-row gap-0 p-5 pb-7">
					<SquareArrowOutUpRight
						class="absolute top-3 right-3 w-4 cursor-pointer text-muted-foreground"
					/>
					<img src={product.image_url} alt="" class="h-[100px] w-[100px] rounded-sm" />
					<div class="ml-5">
						<h2>{product.name}</h2>
						<p class="mt-1 text-sm text-muted-foreground">{product.description_short}</p>
					</div>
					<p class="absolute right-3 bottom-2 text-xs text-muted-foreground">
						v{product.version} · Latest version
					</p>
				</Card>
			</Dialog.Trigger>
			<Dialog.Content>
				<div class="pr-5">
					<h2 class="text-2xl">{product.name}</h2>
					<img class="float-right ml-2 h-[100px]" src={product.image_url} alt="" />
					<p class="text-base text-muted-foreground mt-5">{product.description}</p>
				</div>

				<Tabs.Root value="info">
					<Tabs.List class="w-full" style="background:none;">
						<Tabs.Trigger value="info" style="border-radius: 0px;">General Info</Tabs.Trigger>
						<Tabs.Trigger value="documentation" style="border-radius: 0px;">DLCs</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="info">
						<Badge variant="outline">Steam</Badge>
						<Badge class="bg-green-500">New</Badge>
						<Badge class="bg-yellow-500">Completed</Badge>
						<style>#stats-list li {margin:7px 0;}</style>
						<ul class="list-style-none text-sm" id="stats-list">
							<li>Playtime: 54h</li>
							<li><a href="steam://run/480"><Button><Play /> Play on Steam</Button></a></li>
						</ul>
					</Tabs.Content>
				</Tabs.Root>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
{/if}
