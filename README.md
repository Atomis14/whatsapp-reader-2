# WhatsApp Reader 2.0

## Rules for chat files to be imported
- groups or contacts can't have the name '_SYSTEM'
- groups or contacts can't contain a colon (:)
- system notifications (e.g. change of group description) can't contain a colon  
*should not be the case anyway, but check if import fails*
- first 18 characters of first lines have to be in the following format: 

## Limitations
- if you've left a chat, message is not recognized as a system notification
- only works with chats that are exported on Android

## Planned features
- chat statistics
- notification when chat with same name was already imported
- language agnostic chat import (currently only german)
- only copying in chat linked files into appData instead of whole selected folder

## Documentation
There are four message types: `system`, `message`, `file`, `image`  

Main color: #00BFA5