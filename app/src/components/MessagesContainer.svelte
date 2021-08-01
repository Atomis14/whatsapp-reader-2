<script>
  import { chatStore } from '../store.js';
</script>

<div class="messagesContainer">
  {#each $chatStore as message}
    <div class="message">
      <strong>{message.sender}</strong> <i>{message.date} um {message.time}</i>
      <br>
      {message.content}
    </div>
  {/each}
</div>

<style lang="scss">

</style>