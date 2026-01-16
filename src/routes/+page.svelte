<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Check } from 'lucide-svelte';
</script>

<div class="container m-auto px-10 py-5">
	<h1 class="text-3xl font-extrabold">Welcome back [NAME]</h1>
	<p class="opacity-50">Here is summary what is new!</p>

	<!-- <Card.Root class="mt-7 w-full">
		<Card.Header>
			<Card.Title>Become Pro!</Card.Title>
			<Card.Description>Support us monthly simply by subscribing to our Pro plan!</Card.Description>
			<Card.Action>
				<Button>Subscribe</Button>
			</Card.Action>
		</Card.Header>
	</Card.Root> -->

	<!-- <div class="mt-7 flex justify-between">
		<h1 class=" text-xl font-bold">Recent Invoices</h1>
		<Button variant="link">More...</Button>
	</div>
	<div class="mt-3 overflow-hidden rounded-md border bg-secondary">
		<Table.Root>
			<Table.Header class="bg-background/40">
				<Table.Row>
					<Table.Head class="w-[100px]">Invoice</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Method</Table.Head>
					<Table.Head class="text-right">Amount</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="font-medium">INV001</Table.Cell>
					<Table.Cell
						><Badge class="bg-notworks-success-600/50 border-2"
							><Check class="text-notworks-success-400 size-5 stroke-3" /> Paid</Badge
						></Table.Cell
					>
					<Table.Cell>Credit Card</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div> -->
</div>
