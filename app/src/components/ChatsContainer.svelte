<script>
  import ChatPreview from './Chat/ChatPreview.svelte'
  import Navigation from './Navigation.svelte'

  const chats = window.electron.db.getChats();

  let activeChat;
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
    background-color: #fafafa;
    border-right: 1px solid $color-grey-light;
    &__chats {
      overflow-y: auto;
      height: 100%;
    }
  }
</style>
