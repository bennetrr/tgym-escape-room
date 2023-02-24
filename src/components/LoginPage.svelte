<script lang="ts">
    import {pb} from "../connectors/PocketBase";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import {addNotification} from "../stores/NotificationStore";

    import {Button, Stack, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faUserGroup} from "@fortawesome/free-solid-svg-icons";

    let username: string;

    function handleEnterPress(e: KeyboardEvent) {
        if (e.key === "Enter") login();
    }

    async function login() {
        try {
            await pb.collection(Collections.Users).authWithPassword(username, username);
        } catch (e) {
            addNotification({type: "error", title: "Login failed!", text: "Wrong group name", duration: 10});
        }
    }
</script>

<Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
    <TextInput bind:value={username} label="Group Name" on:keypress={handleEnterPress}>
        <svelte:fragment slot="rightSection">
            <Icon icon={faUserGroup}/>
        </svelte:fragment>
    </TextInput>

    <Button on:click={login} variant="gradient">
        Anmelden
    </Button>
</Stack>
