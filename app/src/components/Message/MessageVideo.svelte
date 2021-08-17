<script>
  import { onMount } from 'svelte';
  import MessageDownloadLink from './partials/MessageDownloadLink.svelte';
  import { Video } from 'video-metadata-thumbnails';

  export let message;

  let active = false;
  const path = window.electron.utils.getFilePath(message);
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

  let thumbnail;

  onMount(async () => {
    const videoReader = new Video(path);
    
    const metaData = await videoReader.getMetadata();
    
    const thumbnailBlob = await videoReader.getThumbnails({ quality: 0.6, start: 0, end: 0 });
    const reader = new FileReader();
    reader.readAsDataURL(thumbnailBlob[0].blob); 
    reader.onloadend = function() {
        thumbnail = reader.result;                
    }
  });
</script>

<div class="MessageVideo" class:active={active}>
  <div class="previewImage">
    <img src="images/play.svg" class="playIcon">
    <img src={thumbnail} on:click={toggleOverlay} class="image">
  </div>
  <br>
  <MessageDownloadLink bind:message path={path} type='video' />
  <div class="overlay" on:click={toggleOverlay}>
    <video controls class="video" bind:this={video}>
      <source src={path}>
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

    .previewImage {
      display: inline-block;
      position: relative;
      .playIcon {
          widows: 50px;
          height: 50px;
          opacity: 0.7;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
      }
      .image {
        width: 300px;
        height: 300px;
        object-fit: cover;
        border-radius: $border-radius-md;
        filter: brightness(80%);
        &:hover {
          cursor: pointer;
        }
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