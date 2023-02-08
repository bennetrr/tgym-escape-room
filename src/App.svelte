<script lang="ts">
    import MainPage from "./components/MainPage.svelte";
    import Login from "./components/LoginPage.svelte";
    import NotificationContainer from "./components/NotificationContainer.svelte";

    import {currentUser} from "./connectors/PocketBase";
</script>

<NotificationContainer/>

{#if $currentUser}
    <MainPage/>
{:else}
    <Login/>
{/if}
