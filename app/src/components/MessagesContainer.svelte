<script>
  import { afterUpdate, beforeUpdate } from 'svelte';
  import { chatStore } from '../store.js';
  import MessageMetaInformations from './Message/partials/MessageMetaInformations.svelte';
  import MessageText from './Message/MessageText.svelte';
  import MessageSystem from './Message/MessageSystem.svelte';
  import MessageImage from './Message/MessageImage.svelte';
  import MessageVideo from './Message/MessageVideo.svelte';
  import MessageAudio from './Message/MessageAudio.svelte';
  import MessageFile from './Message/MessageFile.svelte';

  const components = {
    text: MessageText,
    system: MessageSystem,
    image: MessageImage,
    video: MessageVideo,
    audio: MessageAudio,
    file: MessageFile,
  };

  let container;
  let currentChat;
  let offset;

  let oldHeight;
  let newHeight;

  beforeUpdate(() => {
    if(container) {
      oldHeight = container.scrollHeight;
    }
  });

  afterUpdate(async () => {
    if (container) {
      if (currentChat != $chatStore.currentChat) {
        container.scrollTop = container.scrollHeight; // start at the bottom if new chat is selected
        currentChat = $chatStore.currentChat;
      } else {
        newHeight = container.scrollHeight;
      }
    }
  });

  // load new messages if scrolled to top
  $: if (offset === 0) {
    chatStore.loadMessages(currentChat);
  }

  // keep position in chat when new messages are loaded
  $: if(newHeight !== oldHeight) {
    container.scrollTop = newHeight - oldHeight;
  }
</script>

<div class="MessagesContainer">
  {#if $chatStore.messages.length !== 0}
    <div
      class="messages"
      bind:this={container}
      on:scroll={() => (offset = container.scrollTop)}
    >
      {#each $chatStore.messages as message (message.id)}
        <div class="message {message.type}">
          <MessageMetaInformations {message} />
          <svelte:component this={components[message.type]} {message} />
        </div>
      {/each}
    </div>
  {:else}
    <div class="noMessage">No chat selected</div>
  {/if}
</div>

<style lang="scss">
  .MessagesContainer {
    height: 100vh;
    width: 100%;
    background-color: #fafafa;
    overflow-x: hidden;

    .messages {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      padding: 0 20px;

      .message {
        margin-bottom: 15px;
        word-wrap: break-word;
        &.system {
          margin: 20px 0;
          font-size: $font-size-sm;
        }
      }
    }

    .noMessage {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
