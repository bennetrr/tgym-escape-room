<script lang="ts">
    import type {EscapeStation} from "../interfaces/IEscapeStation";

    import {Button, Modal, TextInput} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faKey} from "@fortawesome/free-solid-svg-icons";

    export let station: EscapeStation;

    let modalOpen = false;
    let secret: string;

    function onModalOpen() {
        modalOpen = true;
    }

    function onModalAbort() {
        modalOpen = false;
    }

    function onModalSubmit() {
        station.completed = true;
        modalOpen = false;
    }
</script>

<div class="station-container" class:station-container-complete={station.completed} on:click={onModalOpen}>
    {#if !station.completed}
        <p>{station.name}</p>
    {/if}
</div>

<Modal on:close={onModalAbort} opened={modalOpen} target={'body'} title="Station {station.name}">
    <TextInput bind:value={secret} label="Enter the secret for the station {station.name}" type="password">
        <svelte:fragment slot="rightSection">
            <Icon icon={faKey}/>
        </svelte:fragment>
    </TextInput>
    <Button on:click={onModalSubmit}>
        Submit
    </Button>
    <Button on:click={onModalAbort}>
        Abort
    </Button>
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
  }
</style>