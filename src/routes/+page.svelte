<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="container m-auto">
	<h1 class="text-3xl font-extrabold">Welcome back [NAME]</h1>
	<p class="opacity-50">Here is summary what is new!</p>

	<Card.Root class="mt-5 w-full">
		<Card.Header>
			<Card.Title>Become Pro!</Card.Title>
			<Card.Description>Support us monthly simply by subscribing to our Pro plan!</Card.Description>
			<Card.Action>
				<Button>Subscribe</Button>
			</Card.Action>
		</Card.Header>
	</Card.Root>
</div>
