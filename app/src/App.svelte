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
		<p>
			test
			<span>lol</span>
		</p>
	</div>
</main>

<style lang="scss">
	:global {
		@import "./scss/main.scss";
	}
</style>