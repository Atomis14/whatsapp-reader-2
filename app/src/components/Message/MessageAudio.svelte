<script>
  export let message;

  const src = window.electron.utils.createMessageLink(message);
</script>

<div class="MessageAudio">
  <audio controls>
    <source src={src}>
    {message.content}
  </audio>
</div>

<style lang="scss">
  .MessageAudio {
    audio {
      position: relative;
      z-index: 0;
    }
  }
</style>