import { writable } from 'svelte/store';

function chatHandler() {
  const { subscribe, set, update } = writable([]);

  let currentId;
  let currentOffset = 0;
  function loadMessages(id) {

    if(id !== currentId) { // clear old messages if new chat is selected
      currentId = id;
      currentOffset = 0;
      set([]);
    } else {
      currentOffset += 10;
    }

    const olderMessages = electron.db.loadMessages(id, currentOffset);   // load newest messages (reverse order because newest messages alre loaded first like in every chat)
    update(messages => {
      const newArray = [...olderMessages.reverse(), ...messages];
      return newArray; // append loaded messages to already loaded ones
    });
  }

	return {
		subscribe,
		loadMessages,
		reset: () => set([])
	};
}

export const chatStore = chatHandler();