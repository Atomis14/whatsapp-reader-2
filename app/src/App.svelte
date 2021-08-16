<script>
	import ChatsContainer from './components/ChatsContainer.svelte';
	import MessagesContainer from './components/MessagesContainer.svelte';
	import Modal from './components/Modal.svelte';
	import ChatImport from './components/Modals/ChatImport.svelte';
	import About from './components/Modals/About.svelte';

</script>

<main>
	<ChatsContainer />
	<MessagesContainer />

	<Modal id="import" visible={false} title="Import Chats">
		<ChatImport />			
	</Modal>
	<Modal id="about" visible={false} title="About">
		<About />
	</Modal>
</main>

<style lang="scss">
	:global {
		@import "./scss/main.scss";
	}

	main {
		display: flex;
		height: 100vh;
		font-family: 'Inter',s Arial, Helvetica, sans-serif;
	}
</style>