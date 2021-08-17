<script>
  export let message;
  export let path;
  export let type = 'file';
</script>

<a on:click={() => window.electron.utils.copyFileToDownloads(path)} class="ImageLink">
  <img src="images/{type}.svg">
  <div>
    {message.content}
  </div>
</a>

<style lang="scss">
  .ImageLink {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    margin-top: 3px;
    &:hover {
      text-decoration: underline;
    }

    img {
      margin-right: 5px;
    }

    div {
      margin-top: 1px;
    }
  }
</style>