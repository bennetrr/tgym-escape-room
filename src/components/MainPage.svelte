<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {writable} from "svelte/store";

    import {ActionIcon, Loader, Stack} from "@svelteuidev/core";
    import {Icon} from "svelte-fontawesome/main";
    import {faLock} from "@fortawesome/free-solid-svg-icons";

    import {currentUser, pb} from "../connectors/PocketBase";
    import type {EscapeStationsResponse, UsersResponse} from "../interfaces/PocketBaseTypes";
    import {Collections} from "../interfaces/PocketBaseTypes";
    import type {EscapeStation} from "../interfaces/IEscapeStation";

    import EscapeStationView from "./EscapeStation.svelte";

    const stations = writable<EscapeStation[]>([]);

    onMount(async () => {
        // Get initial stations
        const stationResultList = await pb.collection(Collections.EscapeStations).getFullList<EscapeStationsResponse<{codes: string[]}>>();
        const userResult = await pb.collection(Collections.Users).getOne<UsersResponse>($currentUser.id);

        for (const stationResult of stationResultList) {
            $stations = [...$stations, {
                id: stationResult.id,
                name: stationResult.name,
                codes: stationResult.codes,
                color: stationResult.color,
                completed: userResult.completed_stations.some(x => x === stationResult.id),
                ownStation: userResult.my_station === stationResult.id
            }];
        }

        // Subscribe to realtime changes
        await pb.collection(Collections.Users).subscribe<UsersResponse>("*", async ({action, record}) => {
            if (action !== "update") return;
            if (record.id !== $currentUser.id) return;

            $stations = $stations.map(x => {
                x.completed = record.completed_stations.some(y => y === x.id);
                return x;
            });
        });
    });

    onDestroy(() => {
        pb.collection(Collections.Users).unsubscribe();
    });

    function logout() {
        pb.authStore.clear();
    }
</script>

<main class:main-background-image={$stations.length > 0}>
    {#if $stations.length > 0}
        <div class="stations-grid">
            {#each $stations as station}
                <EscapeStationView station={station}/>
            {/each}
        </div>
    {:else}
        <Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
            <Loader variant="bars" color="teal" size="xl"/>
        </Stack>
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
    width: 100%;
    height: 100%;
  }

  .main-background-image {
    // noinspection CssUnknownTarget
    background: url("/background.png") no-repeat center fixed;
    background-size: contain;
  }

  .stations-grid {
    height: 100%;
    width: 100%;
    display: grid;

    @media screen and (orientation: portrait) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }

    @media screen and (orientation: landscape) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 1fr);
    }
  }

  .logout-button {
    position: fixed;
    bottom: $base-spacing;
    left: $base-spacing;
  }
</style>
