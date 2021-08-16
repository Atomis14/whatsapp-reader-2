<script>
  export let buttons = [];
</script>

<div class="ModalButtons">
  {#each buttons as button}
    <button class="button {button.class}" class:inactive={button.inactive} on:click={button.action} >
      {button.label}
    </button>
  {/each}
</div>

<style lang="scss">
  .ModalButtons {
      display: flex;
      width: 100%;
      background-color: $color-grey-lighter;
      border-bottom-left-radius: $border-radius-md;
      border-bottom-right-radius: $border-radius-md;
      margin-top: 5px;

      button.inactive {
        pointer-events: none;
        opacity: 0.4;
      }

      .button--right {
        margin-left: auto;
      }
    }
</style>