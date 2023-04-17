const { ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('message-context-menus')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        // logic in interactionCreate.js
    },
};