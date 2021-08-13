<script>
  let resetButtonLabel = 'Reset app';
  let count = 0;

  async function resetApp() {
    count++;
    if(count == 1) {
      resetButtonLabel = 'Click again to confirm';
      await setTimeout(() => {
        count = 0;
        resetButtonLabel = 'Reset app';
      }, 3000);
    } else if(count == 2) {
      window.electron.utils.resetApp();
    }
  }
</script>

<div class="About">
  <div><strong>Version:</strong> 2.0 (Dev)</div>
  <div><strong>Developed by:</strong> <a on:click={() => window.electron.utils.openInBrowser('https://msabbatini.ch')} target="_blank">msabbatini.ch</a></div>
  <div>This project is open source on <a on:click={() => window.electron.utils.openInBrowser('https://github.com/Atomis14/whatsapp-reader-2')}>Github</a></div>
  <div class="About__resetLink"><a on:click={resetApp}>{resetButtonLabel}</a></div>
</div>

<style lang="scss">
  .About {
    min-width: 400px;
    >div:not(:last-child) {
      margin-bottom: 10px;
    }

    &__resetLink {
      margin-top: 20px;
      a {
        color: red;
        text-decoration: none;
        border: 1px solid red;
        padding: 1px 5px 3px;
        border-radius: $border-radius-md;
      }
    }
  }
</style>