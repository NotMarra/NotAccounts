<script lang="ts">
    import { Upload } from "lucide-svelte";

    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    import FileDrop from "filedrop-svelte";
	import type { Files, FileDropOptions } from "filedrop-svelte";
	let files: Files;

</script>

<main class="p-5 pt-10">

    <div class="flex items-center">
        <Avatar.Root class="w-15 h-15
        ">
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>

        <div class="w-full ml-5">
            <h2 class="font-semibold">UserName24</h2>
            <p class="text-sm text-muted-foreground">Premium Account</p>
        </div>
    </div>
    <Separator class="mt-5 mb-5"/>

    
    <Tabs.Root value="account">
        <Card.Root>
            <Card.Content class="flex flex-col gap-5">
                <div>
                    <Label for="account-picture" class="mb-2">Profile Picture</Label>
                    <FileDrop id="account-picture" accept="image/* " on:filedrop={(e) => { 
                        files = e.detail.files 
                        console.log(files)
                        }}>
                            <Card.Root>
                                <Card.Content class="flex flex-col justify-center items-center text-muted-foreground">
                                    <Upload />
                                    <span class="text-sm">Upload files</span>
                                </Card.Content>
                            </Card.Root>
                    </FileDrop>
                </div>
                <div>
                    <Label for="account-username" class="mb-2">Username</Label>
                    <Input id="account-username" value="UserName42" />
                </div>

                <div>
                    <Label for="account-email" class="mb-2">E-mail</Label>
                    <Input id="account-email" type="email" value="mail@gmail.com" />
                </div>

                <div>
                    <Label class="mb-1">Registration date</Label>
                    <span class="text-sm">10.4.1998</span>
                </div>

                <div>
                    <Label class="mb-1">Account Status</Label>
                    <span class="text-sm">Verified</span>
                </div>
            </Card.Content>
             <Card.Footer>
                <Button class="bg-transparent border-1 border-primary-400 text-white">Save changes</Button>
            </Card.Footer>
        </Card.Root>
    </Tabs.Root>
</main>