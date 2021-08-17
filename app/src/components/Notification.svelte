<script>
  import { customEvent } from '../utils.js';
  import NotificationAddedToDownloads from './Notification/NotificationAddedToDownloads.svelte';

  let notifications = [];

  customEvent('notification', function(e) {
    notifications = [...notifications, e.detail];
  });

  function close(id) {  // remove item with given id
    console.log(notifications);
    notifications = notifications.filter((item) => {
      return item.id !== id;
    });
  }
</script>

<div class="Notification">
  {#each notifications as notification (notification.id)}
    <div class="item">
      <NotificationAddedToDownloads notification={notification} />
      <img src="images/close.svg" on:click={() => close(notification.id)} >
    </div>
  {/each}
</div>

<style lang="scss">
  .Notification {
    position: fixed;
    bottom: 20px;
    left: 15px;
    .item {
      display: flex;
      align-items: center;
      background-color: white;
      @include dropShadow;
      z-index: 2;
      padding: 10px 15px;
      border-radius: $border-radius-md;
      margin-top: 10px;
      img {
        box-sizing: content-box;
        width: 23px;
        height: 23px;
        flex-shrink: 0;
        margin-left: auto;
        padding: 0 8px;
        margin-right: -15px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>