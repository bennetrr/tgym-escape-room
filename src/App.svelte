<script lang="ts">
    import MainPage from "./components/MainPage.svelte";
    import Login from "./components/LoginPage.svelte";
    import NotificationContainer from "./components/NotificationContainer.svelte";

    import {currentUser} from "./connectors/PocketBase";
    import {Stack} from "@svelteuidev/core";
</script>

<NotificationContainer/>

<div class="small-device-text">
    <Stack align="center" override={{ height: "100%", width: "100%"}} spacing="xl">
        <span>This page is not optimized for this screen sizes. Please use a bigger screen or put the device in horizontal mode.</span>
    </Stack>
</div>

<div class="main-content">
    {#if $currentUser}
        <MainPage/>
    {:else}
        <Login/>
    {/if}
</div>

<style lang="scss">
  .small-device-text,
  .main-content {
    height: 100vh;
    width: 100vw;
  }

  .small-device-text {
    display: none;
    padding: 15px;
  }

  @media screen and (max-width: 800px) {
    .small-device-text {
      display: block;
    }

    .main-content {
      display: none;
    }
  }
</style>
