<script>
  export let units = [];
  export let name;
</script>

<div class="ChatImportSelectedUnits">
  {#if units.length === 0}
    No {name} selected
  {:else}
    {#each units as unit}
      <div class="ChatImportSelectedUnits__unit">
        <img src="images/clear.svg" alt="clear" />
        <div>{unit}</div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  .ChatImportSelectedUnits {
    margin-bottom: 20px;
    max-height: 300px;
    overflow-y: auto;
    width: 100%;

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
