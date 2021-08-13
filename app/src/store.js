import { writable } from 'svelte/store';

function chatHandler() {
  const defaultData = {
    currentId: null,
    messages: []
  }

  const { subscribe, set, update } = writable(defaultData);

  let currentId;
  let currentOffset = 0;
  function loadMessages(id) {
    if(id !== currentId) { // clear old messages if new chat is selected
      currentId = id;
      currentOffset = 0;
      set({
        currentId,
        messages: []
      });
    } else {
      currentOffset += 30;
    }

    const olderMessages = window.electron.db.loadMessages(id, currentOffset);   // load newest messages (reverse order because newest messages alre loaded first like in every chat)
    update(data => {
      return {
        currentChat: currentId,
        messages: [...olderMessages.reverse(), ...data.messages]  // append loaded messages to already loaded ones
      }; 
    });
  }

	return {
		subscribe,
		loadMessages,
		reset: () => set(defaultData)
	};
}

export const chatStore = chatHandler();