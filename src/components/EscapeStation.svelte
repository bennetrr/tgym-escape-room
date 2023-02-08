<script lang="ts">
    import type {EscapeStation} from "../interfaces/IEscapeStation";
    import {addNotification} from "../stores/NotificationStore";

    import {Button, Group, Modal, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faKey} from "@fortawesome/free-solid-svg-icons";

    export let station: EscapeStation;

    let modalOpen = false;
    let secret: string;

    function onModalOpen() {
        if (station.completed === true) return;
        modalOpen = true;
    }

    function onModalAbort() {
        modalOpen = false;
    }

    function onModalSubmit() {
        if (secret === station.code) {
            station.completed = true;
            modalOpen = false;
        } else {
            addNotification({type: "warning", text: "You've entered the wrong secret!", duration: 10})
        }
    }
</script>

<div class="station-container" class:station-container-complete={station.completed} on:click={onModalOpen}>
    {#if !station.completed}
        <p>{station.name}</p>
    {/if}
</div>

<Modal on:close={onModalAbort} opened={modalOpen} target={'body'} title="{station.name}">
    <TextInput bind:value={secret} label="Enter the secret for {station.name}" type="password">
        <svelte:fragment slot="rightSection">
            <Icon icon={faKey}/>
        </svelte:fragment>
    </TextInput>

    <Group override={{marginTop: 15}} position="center">
        <Button color="teal" on:click={onModalSubmit} override={{width: 80}}>
            Submit
        </Button>
        <Button color="red" on:click={onModalAbort} override={{width: 80}}>
            Abort
        </Button>
    </Group>
</Modal>

<style lang="scss">
  @import "../vars";

  .station-container {
    background-color: $base-color;
    height: calc(100vh / 2);
    padding: $base-spacing;
    border: $base-border;
  }

  .station-container-complete {
    background-color: transparent;
    border: none;
  }
</style>