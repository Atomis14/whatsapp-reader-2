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
  {#each chats as chat (chat.id)}
    <ChatPreview {chat} bind:activeChat={activeChat} />
  {/each}
</div>

<style lang="scss">
  .ChatsContainer {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 350px;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid $color-grey-light;
    background-color: $color-grey-lighter;
  }
</style>
