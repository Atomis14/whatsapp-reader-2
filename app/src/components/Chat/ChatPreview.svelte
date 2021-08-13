<script>
  import { chatStore } from '../../store.js';

  export let chat;
  export let activeChat = null;

  function selectChat() {
    if(activeChat !== chat.id) {  // if new chat is selected
      chatStore.loadMessages(chat.id);
      activeChat = chat.id;
    }
  }
</script>

<div on:click|preventDefault={selectChat} class="ChatPreview" class:active={activeChat === chat.id}>
  {#if chat.type == 'normal'}
    <img src="images/person.svg" alt="person" class="ChatPreview__image">
  {:else}
    <img src="images/group.svg" alt="person" class="ChatPreview__image">
  {/if}
  <div class="ChatPreview__name">{chat.name}</div>
</div>

<style lang="scss">
  .ChatPreview {
    display: flex;
    align-items: center;
    min-height: 55px;
    padding: 15px 10px;
    &:hover {
      cursor: pointer;
      background-color: $color-grey-light;
    }

    &__image {
      margin-right: 10px;
    }

    &__name {
      font-weight: $font-weight-bold;
    }

    &.active {
      background-color: lightgrey;
    }
  }
</style>