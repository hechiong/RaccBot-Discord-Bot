const { ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('user-context-menus')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        // logic in interactionCreate.js
    },
};