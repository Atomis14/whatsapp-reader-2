<script>
  import MessageDownloadLink from './partials/MessageDownloadLink.svelte';

  export let message;

  const path = window.electron.utils.getFilePath(message);
</script>

<div class="MessageAudio">
  <audio controls>
    <source src={path}>
  </audio>
  <br>
  <MessageDownloadLink bind:message path={path} type='audio' />
</div>

<style lang="scss">
  .MessageAudio {
    audio {
      position: relative;
      z-index: 0;
    }
  }
</style>