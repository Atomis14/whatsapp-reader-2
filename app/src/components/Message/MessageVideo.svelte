<script>
  export let message;

  let active = false;
  let videoPath = '/' + window.electron.utils.store.userDataPath + '/chats/' + message.chat + '/' + message.content;
  let video;

  $: {
    if(video && !active) {
      video.pause();
    }
  }

  function toggleOverlay(e) {
    e.stopPropagation();
    if (e && e.target.classList.contains('video')) return;
    active = !active;
  }
</script>

<div class="MessageVideo" class:active={active}>
  <img src={videoPath} on:click={toggleOverlay} class="image">
  <br>
  {message.content}
  <div class="overlay" on:click={toggleOverlay}>
    <video controls class="video" bind:this={video}>
      <source src={videoPath}>
    </video>
    <img src="images/close-white.svg" class="closeButton" on:click={toggleOverlay}> 
  </div>
</div>

<style lang="scss">
  .MessageVideo {
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
      video {
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