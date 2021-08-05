<script>
	import ChatImport from './components/ChatImport.svelte';
	import ChatsContainer from './components/ChatsContainer.svelte';
	import MessagesContainer from './components/MessagesContainer.svelte';
</script>

<main>
		<!-- <ChatImport /> -->
		<ChatsContainer />
		<MessagesContainer />
</main>

<style lang="scss">
	:global {
		@import "./scss/main.scss";
	}

	main {
		display: flex;
		height: 100vh;
	}
</style>