<script>
  /* import ChatImport from './Modals/ChatImport.svelte'; */
  import { getModal } from './Modal.svelte';
</script>

<div class="Navigation">
  <div class="Navigation__link Navigation__link-import" on:click={() => getModal('import').toggle() }>
    <img src="images/add.svg" alt="import" />
  </div>
</div>

<style lang="scss">
  .Navigation {
    padding: 15px 10px;
    background-color: $color-primary;
    display: flex;
    align-items: center;

    &__link {
      &:hover {
        cursor: pointer;
        img {
          opacity: 1;
        }
      }

      img {
        width: 30px;
        height: 30px;
        opacity: 0.7;
      }
    }
  }
</style>
