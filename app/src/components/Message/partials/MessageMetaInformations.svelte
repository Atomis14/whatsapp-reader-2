<script>
  export let message;
</script>

<div class="MessageMetaInformations {message.type}">
  {#if message.type != 'system'}
    <strong>{message.sender}</strong>
  {/if}
  <i>{message.date} at {message.time}</i>
</div>

<style lang="scss">
  .MessageMetaInformations {
    margin-bottom: 5px;

    &.system {
      color: $color-grey-mediumdark;
    }
  }
</style>