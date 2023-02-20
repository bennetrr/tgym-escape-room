<script lang="ts">
    import {currentUser, pb} from "../connectors/PocketBase";
    import type {EscapeStationsRecord, UsersResponse} from "../interfaces/PocketBaseTypes";
    import type {EscapeStation} from "../interfaces/IEscapeStation";
    import {addNotification} from "../stores/NotificationStore";

    import {Button, Group, Modal, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faKey} from "@fortawesome/free-solid-svg-icons";

    export let station: EscapeStation;

    let modalOpen = false;
    let secret: string;

    function openModal() {
        if (station.completed === true) return;
        modalOpen = true;
    }

    function closeModal() {
        secret = "";
        modalOpen = false;
    }

    async function submitModal() {
        if ($currentUser.username !== station.name) {
            if (secret !== station.code) {
                addNotification({type: "warning", text: "You've entered the wrong secret!", duration: 5});
                return;
            }
        }

        const userResult = await pb.collection("users").getOne<UsersResponse>($currentUser.id);
        const completedStations = [...userResult.completed_stations, station.id];
        await pb.collection("users")
            .update<EscapeStationsRecord>($currentUser.id, {...userResult, completed_stations: completedStations});

        closeModal();
    }

    function handleKeyPress(e: KeyboardEvent) {
        switch (e.key) {
            case "Enter":
                submitModal();
                break;
            case "Escape":
                closeModal();
                break;
        }
    }
</script>

<div class="station-container" class:station-container-complete={station.completed} on:click={openModal}>
    <span class="station-name">{station.name}</span>
</div>

<Modal on:close={closeModal} opened={modalOpen} target={'body'} title="{station.name}">
    {#if $currentUser.username === station.name}
        <span>
            This station is yours!<br/>
            You can claim it without entering the secret.
        </span>
    {:else}
        <TextInput bind:value={secret} label="Enter the secret for {station.name}" type="password"
                   on:keypress={handleKeyPress}>
            <svelte:fragment slot="rightSection">
                <Icon icon={faKey}/>
            </svelte:fragment>
        </TextInput>
    {/if}

    <Group override={{marginTop: 15}} position="center">
        <Button color="teal" on:click={submitModal} override={{width: "7em"}}>
            Claim it
        </Button>
        <Button color="red" on:click={closeModal} override={{width: "7em"}}>
            Abort
        </Button>
    </Group>
</Modal>

<style lang="scss">
  @import "../vars";

  .station-container {
    padding: $base-spacing;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: $base-color-alt1;
    border: $base-border;
  }

  .station-name {
    font-size: 24px;
  }

  .station-container-complete {
    visibility: hidden;
  }
</style>
