<script>
  import { chatStore } from '../store.js';
  import MessageMetaInformations from './Message/MessageMetaInformations.svelte';
  import MessageText from './Message/MessageText.svelte';
  import MessageSystem from './Message/MessageSystem.svelte';
  import MessageImage from './Message/MessageImage.svelte';
  import MessageFile from './Message/MessageFile.svelte';

  const components = {
    text: MessageText,
    system: MessageSystem,
    image: MessageImage,
    file: MessageFile
  }
</script>

<div class="MessagesContainer">
  {#each $chatStore as message (message.id)}
    <div class="MessagesContainer__message">
      <MessageMetaInformations {message} />
      <svelte:component this={components[message.type]} {message} />
    </div>
  {/each}
</div>

<style lang="scss">
  .MessagesContainer {
    overflow-y: auto;
    max-height: 100vh;
    width: 100%;
    padding: 0 20px;
    &__message {
      margin-bottom: 15px;
    }
  }
</style>