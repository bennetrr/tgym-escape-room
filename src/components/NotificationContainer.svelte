<script lang="ts">
    import {notifications, removeNotification} from "../stores/NotificationStore";

    import Notification from "./Notification.svelte";
</script>

<div class="notification-container">
    {#each $notifications as notification}
        <Notification notification={notification} on:remove={e => removeNotification(e.detail.id)}/>
    {/each}
</div>

<style lang="scss">
  @import "../vars";

  .notification-container {
    position: absolute;
    z-index: 1000;
    right: $base-spacing;
    top: $base-spacing;
  }
</style>
