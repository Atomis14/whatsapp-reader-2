<script>
  import MessageDownloadLink from './partials/MessageDownloadLink.svelte';

  export let message;

  const path = window.electron.utils.getFilePath(message);
</script>

<div class="MessageFile">
  <MessageDownloadLink bind:message path={path} type='file' />
</div>

<style lang="scss">
</style>