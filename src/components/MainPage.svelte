<script lang="ts">
    import {pb, currentUser} from "../connectors/PocketBase";
    import type {EscapeStationsResponse} from "../interfaces/PocketBaseTypes";
    import type {EscapeStation} from "../interfaces/IEscapeStation";

    import {onDestroy, onMount} from "svelte";
    import {ActionIcon, SimpleGrid} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";

    import {faLock} from "@fortawesome/free-solid-svg-icons";
    import EscapeStationView from "./EscapeStation.svelte";

    let stations: EscapeStation[] = [];
    let unsubscribe: () => void;

    onMount(async () => {
        // Get initial stations
        const resultList = await pb.collection("escape_stations").getFullList<EscapeStationsResponse>();

        for (const result of resultList) {
            stations = [...stations, {
                id: result.id,
                name: result.name,
                code: result.code,
                completed: $currentUser.completed_stations.some(value => value === result.id)
            }];
        }

        // Subscribe to realtime
        unsubscribe = await pb.collection("escape_stations")
            .subscribe("*", async ({action, record}) => {
                stations = [...stations, {
                    id: record.id,
                    name: record.name,
                    code: record.code,
                    completed: $currentUser.completed_stations.some(value => value === record.id)
                }];
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
    {#if stations.length > 0}
        <SimpleGrid cols={3} spacing={0}>
            {#each stations as station}
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
  @import "../vars";

  main {
    width: 100vw;
    height: 100vh;
    // noinspection CssUnknownTarget
    background-image: url("background.png");
  }

  .logout-button {
    position: absolute;
    bottom: $base-spacing;
    left: $base-spacing;
  }
</style>
