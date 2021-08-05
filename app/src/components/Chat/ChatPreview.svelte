<script>
  import { chatStore } from '../../store.js';

  export let chat;
  export let activeChat;

  function selectChat() {
    chatStore.loadMessages(chat.id);
    activeChat = chat.id;
  }
</script>

<div on:click|preventDefault={selectChat} class="ChatPreview" class:active={activeChat === chat.id}>
  <img src="images/person.svg" alt="person" class="ChatPreview__image">
  <div class="ChatPreview__name">{chat.name}</div>
</div>

<style lang="scss">
  .ChatPreview {
    display: flex;
    align-items: center;
    min-height: 20px;
    padding: 15px 10px;
    &:hover {
      cursor: pointer;
      background-color: $color-grey-light;
    }

    &__image {
      margin-right: 10px;
    }

    &__name {
      font-weight: bold;
    }

    &.active {
      background-color: lightgrey;
    }
  }
</style>