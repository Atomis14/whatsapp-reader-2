<script>
  export let message;
</script>

<div class="MessageImage">
  <img src={'/' + window.electron.utils.store.userDataPath + '/chats/' + message.chat + '/' + message.content} >
  <br>
  {message.content}
</div>

<style lang="scss">
  .MessageImage {
    img {
      width: 300px;
    }
  }
</style>