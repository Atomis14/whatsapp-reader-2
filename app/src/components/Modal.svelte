<script context="module">
  let modals = {};

  export function getModal(id) {
    return modals[id];
  }
</script>

<script>
  export let id;
  export let visible = false;
  export let title = null;

  const controls = {
    open() {
      visible = true;
      document.body.style.overflow = 'hidden';
    },
    close() {
      visible = false;
    },
    toggle(e) {
      if(e && !e.target.classList.contains('Modal')) return;
      visible = !visible;
    }
  };

  modals[id] = controls;
</script>

<div class="Modal" class:show={visible} on:click={controls.toggle}>
  <div class="content">
    {#if title}
      <h2>{title}</h2>
    {/if}
    <slot />
  </div>
</div>

<style lang="scss">
  .Modal {
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(black, 0.4);
    padding: 50px;
    z-index: 3;
    &.show {
      display: flex;
    }

    .content {
      max-height: 100vh;
      margin: 20px;
      background-color: white;
      border-radius: $border-radius-md;
      @include dropShadow;

      h2 {
        padding: 15px 20px 0 20px;
      }
    }
  }

  :global(.Modal .content > div) {
    padding: 20px;
  }
</style>
