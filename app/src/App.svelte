<script>
	import Sidebar from './components/Sidebar.svelte';
	import ChatContainer from './components/ChatContainer.svelte';
</script>

<main>
	<div>
		<button>Import Chats</button>
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