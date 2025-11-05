<script lang="ts">
    import * as Table from '$lib/components/ui/table/index.js';
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Info } from "lucide-svelte";
    import { Download } from "lucide-svelte";

    const data: Array<Record<string, string>> = [
        {
            date: "23.10.2025",
            id: "123456789",
            status: "paid",
            item: "Premium Subscription",
            payment_method: "PayPal",
            due_date: "12.10.2025",
            amount: "$20.00",
            download_url: "about:blank"
        },
        {
            date: "12.10.2025",
            id: "68442879",
            status: "Failed",
            item: "Plugin",
            payment_method: "Google Pay",
            due_date: "12.10.2025",
            amount: "$15.00",
            download_url: "/robots.txt"
        } 
    ]

    const BADGE_CLASSES: Record<string, string> = {
        paid:    'text-green-400 bg-green-400/10 inset-ring-green-500/20',
        unpaid:  'text-orange-400 bg-orange-400/10 inset-ring-orange-500/20',
        pending: 'text-amber-400 bg-amber-400/10 inset-ring-amber-500/20',
        failed:  'text-red-400 bg-red-400/10 inset-ring-red-500/20',
        refunded:'text-indigo-400 bg-indigo-400/10 inset-ring-indigo-500/20',
        voided:  'text-gray-400 bg-gray-400/10 inset-ring-gray-500/20',
        default: 'text-stone-400 bg-stone-400/10 inset-ring-stone-500/20',
    };

    const getBadge = (status: string) => {
        const key = status.toLowerCase();
        const cls = BADGE_CLASSES[key] ?? BADGE_CLASSES.default;
        return `<span class="min-w-[80%] justify-center inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring ${cls}">${status.toUpperCase()}</span>`;
    };

    function titleCase(s: String) {
        return s.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
</script>


<Table.Root class="bg-muted text-md text-center font-mono rounded-md overflow-hidden">
    <Table.Caption>Your recent invoices</Table.Caption>
    <Table.Header class="bg-primary-700">
        <Table.Row>
            <Table.Head class="text-center">Date</Table.Head>
            <Table.Head class="text-center">Amount</Table.Head>
            <Table.Head class="text-center">Status</Table.Head>
            <Table.Head class="text-right w-0 p-0"></Table.Head>
        </Table.Row>
    </Table.Header>

    <Table.Body class="font-mono">
        {#each data as row}
        <Table.Row>
            <Table.Cell>{row.date}</Table.Cell>
            <Table.Cell>{row.amount}</Table.Cell>
            <Table.Cell>{@html getBadge(row.status)}</Table.Cell>

            <Dialog.Root>
                <Dialog.Trigger class="p-0 pr-2 m-0 w-full h-full flex justify-center items-center">
                    <Table.Cell class="px-0 "><Info class="text-muted-foreground w-5 m-0"/></Table.Cell>
                </Dialog.Trigger>

                <Dialog.Content >
                    <Dialog.Header>
                    <Dialog.Title class="text-2xl font-bold">Invoice {row.id}</Dialog.Title>
                    <Dialog.Description>
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-col">
                                <p>Title</p>
                                <h3 class=" text-lg text-foreground font-bold">{row.item}</h3>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex flex-col">
                                    <p>Issued</p>
                                    <h3 class="text-foreground font-bold">{row.date}</h3>
                                </div>
                                <div class="flex flex-col">
                                    <p>Due Date</p>
                                    <h3 class="text-foreground font-bold">{row.due_date}</h3>
                                </div>
                                <div class="flex flex-col">
                                    <p>Invoice No.</p>
                                    <h3 class="text-foreground font-bold">{row.id}</h3>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex flex-col">
                                    <p>Status</p>
                                    <h3 class="text-foreground font-bold">{row.status}</h3>
                                </div>
                                <div class="flex flex-col">
                                    <p>Payment Method</p>
                                    <h3 class="text-foreground font-bold">{row.payment_method}</h3>
                                </div>
                                <div class="flex flex-col">
                                    <p>Price</p>
                                    <h3 class="text-foreground font-bold">{row.amount}</h3>
                                </div>
                            </div>
                            <div class="flex justify-end">
                                <div class="px-2  py-2">
                                    <Button class="h-full items-center flex justify-center bg-foreground border-transparent focus:border-transparent focus:ring-0" href="" download><Download /> Download</Button>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="grid grid-cols-2 rounded-xl mt-4 rounded-br-none ">

                            {#each Object.entries(row) as [key, value] (key)}

                            <div class="min-h-10 px-2 items-center flex w-full justify-center text-white border-t-1 border-primary-750">{titleCase(key.replace("_", " "))}</div>
                                {#if key == "download_url"}
                                    <div class="px-2  py-2">
                                        <Button class="h-full items-center flex justify-center bg-white border-transparent focus:border-transparent focus:ring-0" href={value} download><Download /> Download</Button>
                                    </div>
                                {:else}
                                    <div class="px-2 items-center flex w-full justify-center text-stone-200">{value}</div>
                                {/if}
                            {/each}
                        </div> -->
                    </Dialog.Description>
                    </Dialog.Header>
                </Dialog.Content>

            </Dialog.Root>

        </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>