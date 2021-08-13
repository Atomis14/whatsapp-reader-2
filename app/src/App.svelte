<script>
	import ChatsContainer from './components/ChatsContainer.svelte';
	import MessagesContainer from './components/MessagesContainer.svelte';
	import Modal from './components/Modal.svelte';
	import ChatImport from './components/Modals/ChatImport.svelte';
	import About from './components/Modals/About.svelte';

	const importModalButtons = [
		{
			label: 'Close',
			action: 'close'
		},
		{
			label: 'Import',
			action: window.electron.chatImport.startImport,
			class: 'button--focus button--right'
		}
	];
</script>

<main>
	<ChatsContainer />
	<MessagesContainer />

	<Modal id="import" visible={false} title="Import Chats" buttons={importModalButtons}>
		<ChatImport />			
	</Modal>
	<Modal id="about" visible={false} title="About" buttons={[{ label: 'Close', action: 'close' }]}>
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