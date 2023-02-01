<script lang="ts">
    import type {EscapeStation} from "./DataStructures";
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

<div class="station-container" on:click={onModalOpen} class:station-container-complete={station.completed}>
    {#if !station.completed}
        <p>{station.name}</p>
    {/if}
</div>

<Modal opened={modalOpen} target={'body'} on:close={onModalAbort} title="Station {station.name}">
    <TextInput label="Enter the secret for the station {station.name}" type="password" bind:value={secret}>
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

<style>
    .station-container {
        background-color: #ffffff;
        height: calc(100vh/2);
        padding: 15px;
        border: 1px solid black;
    }

    .station-container-complete {
        background-color: transparent;
    }
</style>