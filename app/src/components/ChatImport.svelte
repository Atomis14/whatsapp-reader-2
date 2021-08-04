<div class="ChatImport">
  Import Chat: 
  <button on:click={() => window.electron.chatImport.showDialogBox('file')}>without media</button>
  <button on:click={() => window.electron.chatImport.showDialogBox('directory')}>with media</button>
  <button on:click={window.electron.chatImport.startImport}>Import File</button>
  <button on:click={window.electron.utils.resetApp}>RESET</button>
</div>

<style lang="scss">
</style> 