<script>
  import { getModal } from './Modal.svelte';
</script>

<div class="Navigation">
  <div class="Navigation__link Navigation__link-import" on:click={() => getModal('import').toggle() }>
    <img src="images/add.svg" alt="import" />
  </div>
  <div class="Navigation__link Navigation__link-about" on:click={() => getModal('about').toggle() }>
    <img src="images/about.svg" alt="about">
  </div>
</div>

<style lang="scss">
  .Navigation {
    padding: 15px 10px;
    background-color: $color-primary;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__link {
      &:hover {
        cursor: pointer;
      }

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
</style>
