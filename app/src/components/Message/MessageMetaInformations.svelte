<script>
  export let message;
</script>

<div class="MessageMetaInformations">
  <strong>{message.sender}</strong> <i>{message.date} um {message.time}</i>
</div>

<style>
  .MessageMetaInformations {
    margin-bottom: 5px;
  }
</style>