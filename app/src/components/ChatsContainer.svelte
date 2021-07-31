<script>
  import { chatStore } from '../store.js';

  const chats = electron.db.getChats();
</script>

<div class="ChatsContainer">
  {#each chats as chat}
    <a on:click={() => chatStore.loadMessages(chat.id)}>{chat.name}</a>
  {/each}
</div>

<style lang="scss">
  a {
    padding: 5px;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
</style>