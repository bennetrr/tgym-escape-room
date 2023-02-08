<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import {addNotification} from "../stores/NotificationStore";

    import {Button, Stack, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faUserGroup} from "@fortawesome/free-solid-svg-icons";

    let username: string;

    async function login() {
        try {
            await pb.collection("users").authWithPassword(username, username);
        } catch (e) {
            addNotification({type: "error", title: "Login failed!", text: "Wrong group name", duration: 10});
        }
    }
</script>

<Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
    <TextInput bind:value={username} label="Group Name">
        <svelte:fragment slot="rightSection">
            <Icon icon={faUserGroup}/>
        </svelte:fragment>
    </TextInput>

    <Button on:click={login} variant="gradient">
        Anmelden
    </Button>
</Stack>
