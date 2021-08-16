<script>
  export let message;
</script>

<div class="MessageFile">
  <a>
    <img src="images/file.svg" alt="favicon">
    {message.content}
  </a>
</div>

<style lang="scss">
  .MessageFile {
    a {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>