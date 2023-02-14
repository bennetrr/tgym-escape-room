<script lang="ts">
    import {pb, currentUser} from "../connectors/PocketBase";
    import type {EscapeStationsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";
    import type {EscapeStation} from "../interfaces/IEscapeStation";

    import {onDestroy, onMount} from "svelte";
    import {ActionIcon, SimpleGrid} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";

    import {faLock} from "@fortawesome/free-solid-svg-icons";
    import EscapeStationView from "./EscapeStation.svelte";
    import {writable} from "svelte/store";

    const stations = writable<EscapeStation[]>([]);

    onMount(async () => {
        // Get initial stations
        const stationResultList = await pb.collection("escape_stations").getFullList<EscapeStationsResponse>();
        const userResult = await pb.collection("users").getOne<UsersResponse>($currentUser.id);

        for (const stationResult of stationResultList) {
            $stations = [...$stations, {
                id: stationResult.id,
                name: stationResult.name,
                code: stationResult.code,
                completed: userResult.completed_stations.some(x => x === stationResult.id)
            }];
        }

        // Subscribe to realtime changes
        await pb.collection("users").subscribe<UsersResponse>($currentUser.id, async ({action, userRecord}) => {
            if (action !== "update") return;
            console.log("user.update event");
            console.log(userRecord);
            console.log($currentUser.id);

            pb.collection("users").getOne<UsersResponse>($currentUser.id)
                .then(userRecord => {
                    $stations = $stations.map(x => {
                        x.completed = userRecord.completed_stations.some(y => y === x.id);
                        return x;
                    })
                });
        });
    });

    onDestroy(() => {
        pb.collection("users").unsubscribe("*");
    });

    function logout() {
        pb.authStore.clear();
    }
</script>

<main class:main-background-image={$stations.length > 0}>
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
  @import "../vars";

  main {
    width: 100vw;
    height: 100vh;
  }

  .main-background-image {
    // noinspection CssUnknownTarget
    background-image: url("background.png");
  }

  .logout-button {
    position: absolute;
    bottom: $base-spacing;
    left: $base-spacing;
  }
</style>
