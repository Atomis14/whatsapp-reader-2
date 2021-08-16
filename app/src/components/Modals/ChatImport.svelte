<script>
  import ModalButtons from './partials/ModalButtons.svelte';
  import Select from './chatImport/Select.svelte';
  import { getModal } from '../Modal.svelte';
  import { customEvent } from '../../utils.js';

  let files = [];
  let folders = [];

  let importButtonInactive = true;
  let progress = 0; // progress bar
  
  let importRunning = false;

  $: if(progress === 1) {
    importButtonInactive = false;
  }

  let buttons;
  $: buttons = [
		{
			label: 'Close',
			action: () => getModal('import').close(),
      inactive: progress === 1
		},
		{
			label: progress !== 1 ? 'Import' : 'Finish',
			action: () => {
        if(progress !== 1) {  // start import if no yet finished
          window.electron.chatImport.startImport();
          importRunning = true;
          importButtonInactive = true;
        } else {  // reload app if import finished
          location.reload();
        }
      },
			class: 'button--focus button--right',
      inactive: importButtonInactive
		}
	];

  $: if(files.length === 0 && folders.length === 0) importButtonInactive = true;

  customEvent('fileSelected', function(e) {
    files = [...files, ...(e.detail.paths)];
    importButtonInactive = false;
  });
  customEvent('folderSelected', function(e) {
    folders = [...folders, ...(e.detail.paths)];
    importButtonInactive = false;
  });

  let importErrors = [];
  customEvent('importUpdate', function(e) {
    if(e.detail.error) {
      importErrors = [e.detail.error, ...importErrors];
      return;
    }
    progress = e.detail.progress;
  });
</script>

<div class="ChatImport">
  {#if importRunning == false && progress !== 1}
    <Select folders={folders} files={files} />
  {:else}
    <div class="progressBar">
      <div>{parseInt(progress*100)} %</div>
      <progress value={progress} max="1"></progress>
    </div>
    {#if importErrors}
      <div class="errorsContainer">
        {#each importErrors as importError}
          <div>{importError}</div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
<ModalButtons buttons={buttons} />

<style lang="scss">
  .ChatImport {
    width: 700px;
    text-align: center;

    .progressBar {
      width: 100%;

      div {
        font-weight: $font-weight-bold;
        height: 25px;
        width: 100%;
        text-align: center;
        margin-bottom: -27px;
      }

      progress {
        display: block;
        width: 100%;
        height: 25px;
        background-color: $color-grey-light;
        border-radius: $border-radius-md;
        &::-webkit-progress-bar {
          background-color: $color-grey-light;
          border-radius: 2px;
        }
        &::-webkit-progress-value {
          background-color: $color-primary;
          border-radius: 2px;
        }
      }
    }

    .errorsContainer {
      margin-top: 10px;
      color: red;
      max-height: 150px;
      overflow-y: auto;
    }
  }
</style> 