<script>
  const chats = electron.db.getChats();
</script>

<div class="ChatsContainer">
  {#each chats as chat}
    <a data-id={chat.id}>{chat.name}</a>
  {/each}
</div>

<style type="text/scss">
  a {
    padding: 5px;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
</style>