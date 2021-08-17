<script>
  export let notification;
</script>

<div class="NotificationAddedToDownlodas">
  <!-- { notification.message } -->
  File added to downloads folder.
  <a on:click={() => window.electron.utils.showFileInExplorer(notification.file)}>Show</a>
</div>

<style lang="scss">
  a {
    margin-left: 3px;
    color: $color-primary;
    text-decoration: none;
  }
</style>