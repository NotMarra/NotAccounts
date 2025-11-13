<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Button } from '$lib/components/ui/button/index.js';


    import { Star,Check,X } from 'lucide-svelte';

    let subscription: null|{ name: string; price_usd: number; expires: number; perks: string[]; } = {
        "name":"Premium",
        "price_usd": 25,
        "expires": 1857487827,
        "perks": [
            "Access to all plugins",
            "Priority support",
            "Larger storage",
            "Cloud saves"
        ]
    }; 
</script>

<h1 class="text-xl mb-2">Active Subscription</h1>

<Card.Root class="gap-2">
    {#if subscription}
        <Card.Header class="flex justify-between items-center">
            <span class="flex"><Star class="text-purple-500 mr-2"/>{subscription.name}</span>
            <Button variant="outline">Cancel</Button> 
        </Card.Header>

        <Card.Content>
            <ul>
            {#each subscription.perks as perk}
                <li class="flex my-1"><Check class="mr-2"/> {perk}</li>
            {/each}
            </ul>
        </Card.Content>
    {/if}
</Card.Root>
<Separator class="mt-5"/>
