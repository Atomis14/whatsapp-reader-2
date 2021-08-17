<script>
  import MessageDownloadLink from './partials/MessageDownloadLink.svelte';

  export let message;

  let active = false;
  const path = window.electron.utils.getFilePath(message);

  function toggleOverlay(e) {
    e.stopPropagation();
    if (e && e.target.classList.contains('bigImage')) return;
    active = !active;
  }
</script>

<div class="MessageImage" class:active={active}>
  <img src={path} on:click={toggleOverlay} class="image">
  <br>
  <MessageDownloadLink bind:message path={path} type='image' />
  <div class="overlay" on:click={toggleOverlay}>
    <img src={path} class="bigImage">
    <img src="images/close-white.svg" class="closeButton" on:click={toggleOverlay}> 
  </div>
</div>

<style lang="scss">
  .MessageImage {
    &.active {
      .overlay {
        display: flex;
      }
    }

    .image {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: $border-radius-md;
      &:hover {
        cursor: pointer;
      }
    }

    .overlay {
      display: none;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(#000000, 0.7);
      padding: 60px;
      text-align: center;
      z-index: 1;
      .bigImage {
        max-height: 100%;
        max-width: 100%;
        margin-bottom: auto;
        margin-top: auto;
      }
      .closeButton {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 25px;
        height: 25px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>