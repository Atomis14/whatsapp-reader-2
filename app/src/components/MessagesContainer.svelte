<script>
  import { chatStore } from '../store.js';
  import MessageText from './messageTypes/MessageText.svelte';
  import MessageSystem from './messageTypes/MessageSystem.svelte';
  import MessageImage from './messageTypes/MessageImage.svelte';
  import MessageFile from './messageTypes/MessageFile.svelte';

  const components = {
    text: MessageText,
    system: MessageSystem,
    image: MessageImage,
    file: MessageFile
  }
</script>

<div class="messagesContainer">
  {#each $chatStore as message}
    <div class="message">
      <strong>{message.sender}</strong> <i>{message.date} um {message.time}</i>
      <br>
      <svelte:component this={components[message.type]} />
    </div>
  {/each}
</div>

<style lang="scss">

</style>