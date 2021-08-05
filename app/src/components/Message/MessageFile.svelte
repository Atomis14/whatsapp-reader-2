<script>
  export let message;
</script>

<div class="MessageFile">
  <img src="../src/images/file.svg" alt="favicon">
  {message.content}
</div>

<style lang="scss">
  .MessageFile {
    display: flex;
    align-items: center;
  }
</style>