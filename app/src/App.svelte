<script>
	import ChatImport from './components/ChatImport.svelte';
	import ChatsContainer from './components/ChatsContainer.svelte';
	import MessagesContainer from './components/MessagesContainer.svelte';
</script>

<main>
	<div>
		<ChatImport />
		<hr>
		<ChatsContainer />
		<hr>
		<MessagesContainer />

	</div>
</main>

<style lang="scss">
		@import "./scss/definitions.scss";
</style>