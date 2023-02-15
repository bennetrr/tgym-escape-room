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
                addNotification({type: "warning", text: "You've entered the wrong secret!", duration: 10});
                return;
            }
        }

        const userResult = await pb.collection("users").getOne<UsersResponse>($currentUser.id);
        const completedStations = [...userResult.completed_stations, station.id];
        await pb.collection("users").update<EscapeStationsRecord>($currentUser.id, {...userResult, completed_stations: completedStations});

        closeModal();
    }
</script>

<div class="station-container" class:station-container-complete={station.completed} on:click={openModal}>
    {#if !station.completed}
        <span>{station.name}</span>
    {/if}
</div>

<Modal on:close={closeModal} opened={modalOpen} target={'body'} title="{station.name}">
    {#if $currentUser.username === station.name}
        <span>
            This station is yours!
        </span>
        <Group override={{marginTop: 15}} position="center">
            <Button color="teal" on:click={submitModal} override={{width: "7em"}}>
                Claim it
            </Button>
            <Button color="red" on:click={closeModal} override={{width: "7em"}}>
                Abort
            </Button>
        </Group>
    {:else}
        <TextInput bind:value={secret} label="Enter the secret for {station.name}" type="password">
            <svelte:fragment slot="rightSection">
                <Icon icon={faKey}/>
            </svelte:fragment>
        </TextInput>

        <Group override={{marginTop: 15}} position="center">
            <Button color="teal" on:click={submitModal} override={{width: "7em"}}>
                Submit
            </Button>
            <Button color="red" on:click={closeModal} override={{width: "7em"}}>
                Abort
            </Button>
        </Group>
    {/if}
</Modal>

<style lang="scss">
  @import "../vars";

  .station-container {
    background-color: $base-color-alt1;
    height: calc(100vh / 2);
    padding: $base-spacing;
    border: $base-border;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 24px;
    }
  }

  .station-container-complete {
    visibility: hidden;
  }
</style>
