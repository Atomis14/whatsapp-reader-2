<script>
  import ChatImportSelectedUnits from '../partials/ChatImportSelectedUnits.svelte';

  export let folders = [];
  export let files = [];
</script>

<div class="Select">
  <div class="withMedia">
    <h3>With media</h3>
    <ChatImportSelectedUnits name="folders" bind:units={folders} />
    <button on:click={() => window.electron.chatImport.showDialogBox('directory')} class="button">
      Select folders
    </button>
  </div>
  <div class="line"></div>
  <div class="withoutMedia">
    <h3>Without media</h3>
    <ChatImportSelectedUnits name="files" bind:units={files} />
    <button on:click={() => window.electron.chatImport.showDialogBox('file')} class="button">
      Select files
    </button>
  </div>
</div>

<style lang="scss">
  .Select {
    display: flex;

    h3 {
      margin-bottom: 20px;
    }

    .withMedia, .withoutMedia {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: stretch;
      width: 50%;
      margin: 15px 0;
    }

    .withMedia {
      margin-right: 10px;
    }

    .withoutMedia {
      margin-left: 10px;
    }

    .line {
      width: 1px;
      background-color: $color-grey-medium;
      align-self: stretch;
    }
  }
</style>