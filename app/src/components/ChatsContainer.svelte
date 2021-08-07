<script>
  import { chatStore } from '../store.js';
  import ChatPreview from './Chat/ChatPreview.svelte'
  import Navigation from './Navigation.svelte'

  const chats = window.electron.db.getChats();

  let activeChat;

  chatStore.loadMessages(8);
</script>

<div class="ChatsContainer">
  <Navigation />
  <div class="ChatsContainer__chats">
    {#each chats as chat (chat.id)}
      <ChatPreview {chat} bind:activeChat={activeChat} />
    {/each}
  </div>
</div>

<style lang="scss">
  .ChatsContainer {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 350px;
    background-color: $color-grey-lighter;
    &__chats {
      overflow-y: auto;
      height: 100%;
    }
  }
</style>
