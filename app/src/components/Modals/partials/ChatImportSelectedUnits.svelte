<script>
  export let units = [];
  export let name;

  function removePath(index, name) {
    window.electron.chatImport.removePath(index, name);
    units.splice(index, 1);
    units = units;
  }
</script>

<div class="ChatImportSelectedUnits">
  {#if units.length === 0}
    No {name} selected
  {:else}
    {#each units as unit, index}
      <div class="ChatImportSelectedUnits__unit">
        <img src="images/clear.svg" alt="clear" on:click={() => removePath(index, name)} />
        <div>{unit.name}</div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  .ChatImportSelectedUnits {
    margin-bottom: 25px;
    height: 300px;
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__unit {
      display: flex;
      align-items: center;
      text-align: left;
      margin-bottom: 5px;
      img {
        widows: 18px;
        height: 18px;
        margin-right: 5px;
        margin-top: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
