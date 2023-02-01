<script lang="ts">
    import {pb} from "./PocketBase";
    import type {EscapeStation} from "./DataStructures";
    import {mapPocketBaseToEscapeStation} from "./DataStructures";
    import {faLock} from "@fortawesome/free-solid-svg-icons";
    import {Icon} from "svelte-fontawesome/main";
    import {onDestroy, onMount} from "svelte";
    import {stations} from "./stores";
    import {ActionIcon, SimpleGrid} from "@svelteuidev/core";
    import EscapeStationView from "./EscapeStationView.svelte";

    let unsubscribe: () => void;

    onMount(async () => {
        // Get initial stations
        const newStations: EscapeStation[] = [];
        const resultList = await pb.collection("escape_stations").getFullList();

        for (const result of resultList) {
            const data = mapPocketBaseToEscapeStation(result);
            newStations.push(data);
        }
        stations.set(newStations);

        // Subscribe to realtime
        unsubscribe = await pb.collection("escape_stations")
            .subscribe("*", async ({action, record}) => {
                if (action === "update") {
                    stations.update(oldStations => [...oldStations, mapPocketBaseToEscapeStation(record)]);
                }
            });
    });

    onDestroy(() => {
        unsubscribe();
    });

    function logout() {
        pb.authStore.clear();
    }
</script>

<main>
    {#if $stations.length > 0}
        <SimpleGrid cols={3} spacing={0}>
            {#each $stations as station}
                <EscapeStationView station={station}/>
            {/each}
        </SimpleGrid>
    {:else}
        <span>No stations available!</span>
    {/if}
</main>

<div class="logout-button">
    <ActionIcon on:click={logout} size="xl" variant="outline">
        <Icon icon={faLock}/>
    </ActionIcon>
</div>

<style lang="scss">
  @import "vars";

  main {
    width: 100vw;
    height: 100vh;
    //noinspection CssUnknownTarget
    background-image: url("background.png");
  }

  .logout-button {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }
</style>
