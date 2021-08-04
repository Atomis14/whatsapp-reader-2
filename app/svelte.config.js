// THIS FILE IS ONLY FOR VSCODE DEBUGGING AND HAS NO IMPACT ON THE APPLICATION ITSELF

const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  // same configuration data as in rollup.config.js under plugins -> svelte -> preprocess
  preprocess: sveltePreprocess({
    scss: {
      prependData: `@import 'app/src/scss/definitions.scss';`   // only difference: app/ at the beginning of the path
    }
  }),
};