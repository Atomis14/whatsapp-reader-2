<script>
  export let message;

  console.log(window.electron);
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