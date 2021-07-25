<script>
	import Sidebar from './components/Sidebar.svelte';
	import ChatContainer from './components/ChatContainer.svelte';
</script>

<main>
	<div>
		<button on:click={electron.chatImport.showDialogBox}>Select File</button>
		<button on:click={electron.chatImport.parseFile}>Import File</button>
	</div>
</main>

<style lang="scss">
		@import "./scss/definitions.scss";

		main {
			display: flex;
			align-items: stretch;
			min-height: 100vh;
		}
</style>