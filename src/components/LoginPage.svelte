<script lang="ts">
    import {pb} from "../connectors/PocketBase";

    import {Button, Stack, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faKey, faUserGroup} from "@fortawesome/free-solid-svg-icons";

    let username: string;
    let password: string;

    async function login() {
        await pb.collection("users").authWithPassword(username, password);
    }
</script>

<Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
    <TextInput bind:value={username} label="Group Name">
        <svelte:fragment slot="rightSection">
            <Icon icon={faUserGroup}/>
        </svelte:fragment>
    </TextInput>

    <TextInput bind:value={password} label="Password" type="password">
        <svelte:fragment slot="rightSection">
            <Icon icon={faKey}/>
        </svelte:fragment>
    </TextInput>

    <Button on:click={login} variant="gradient">
        Anmelden
    </Button>
</Stack>
