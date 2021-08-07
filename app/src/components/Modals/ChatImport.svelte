<script>
  import { customEvent } from '../../utils.js';
  import ChatImportSelectedUnits from './ChatImportSelectedUnits.svelte';

  let files = [];
  let folders = [];

  customEvent('fileSelected', function(e) {
    files = [...files, ...(e.detail.paths)];
  });
  customEvent('folderSelected', function(e) {
    folders = [...folders, ...(e.detail.paths)];
  });
</script>

<div class="ChatImport">
  <div class="ChatImport__withMedia">
    <h3>With media</h3>
    <ChatImportSelectedUnits name="folders" bind:units={folders} />
    <button on:click={() => window.electron.chatImport.showDialogBox('directory')} class="button">
      Select folders
    </button>
  </div>
  <div class="line"></div>
  <div class="ChatImport__withoutMedia">
    <h3>Without media</h3>
    <ChatImportSelectedUnits name="files" bind:units={files} />
    <button on:click={() => window.electron.chatImport.showDialogBox('file')} class="button">
      Select files
    </button>
  </div>
</div>

<style lang="scss">
  .ChatImport {
    display: flex;
    width: 700px;
    text-align: center;

    h3 {
      margin-bottom: 20px;
    }

    &__withMedia, &__withoutMedia {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50%;
    }

    &__withMedia {
      margin-right: 10px;
    }

    &__withoutMedia {
      margin-left: 10px;
    }

    .line {
      width: 1px;
      background-color: $color-grey-medium;
      align-self: stretch;
    }
  }
</style> 