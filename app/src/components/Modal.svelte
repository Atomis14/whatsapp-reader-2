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
  export let buttons = [];

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

  // map strings as action to internal functions
  buttons.forEach(button => {
    switch(button.action) {
      case 'open':
        button.action = controls.open;
        break;
      case 'close':
        button.action = controls.close;
        break;
      case 'toggle':
        button.action = controls.toggle;
        break;
    }
  });

  modals[id] = controls;
</script>

<div class="Modal" class:show={visible} on:click={controls.toggle}>
  <div class="Modal__contentButtonContainer">
    <div class="Modal__content">
      {#if title}
        <h2>{title}</h2>
      {/if}
      <slot />
    </div>
    {#if buttons.length !== 0}
      <div class="Modal__buttons">
        {#each buttons as button}
          <button class="button {button.class}" on:click={button.action} >
            {button.label}
          </button>
        {/each}
      </div>
    {/if}
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
    &.show {
      display: flex;
    }

    &__contentButtonContainer {
      max-height: 100vh;
      margin: 20px;
      @include dropShadow;
    }

    &__content, &__buttons {
      padding: 20px;
    }

    &__content {
      background-color: white;
      padding: 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      h2 {
        margin-top: -5px;
        margin-bottom: 15px;
      }
    }

    &__buttons {
      display: flex;
      width: 100%;
      background-color: $color-grey-lighter;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .button--right {
        margin-left: auto;
      }
    }
  }
</style>
