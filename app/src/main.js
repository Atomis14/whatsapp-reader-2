import "./scss/definitions.scss";
import "./scss/main.scss";
import App from './App.svelte';

// diese Variable nach mehr Wissen über Svelte wieder entfernen und bei Svelte › Plugin › Svelte: Compiler Warnings in Settings den key-value entfernen
const electron = window.electron;

const app = new App({
	target: document.body,
	/* props: {
		name: 'world'
	} */
});

export default app;