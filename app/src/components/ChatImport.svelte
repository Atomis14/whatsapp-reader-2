<script>
  
</script>

<div class="ChatImport">
  Import Chat: 
  <button on:click={() => electron.chatImport.showDialogBox('file')}>without media</button>
  <button on:click={() => electron.chatImport.showDialogBox('directory')}>with media</button>
  <button on:click={electron.chatImport.startImport}>Import File</button>
</div>

<style type="text/scss">
  
</style>