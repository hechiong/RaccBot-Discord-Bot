const { Events } = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const commandName = interaction.commandName;
        const command = interaction.client.commands.get(commandName);
        const username = interaction.user.username;

        if (interaction.isAutocomplete()) {
            if (!command) {
                console.error(`No command matching ${commandName} was found.`);
                return;
            }

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isButton()) {
            // Useful for filtering multiple clicks, but first click won't work
            // Timer starts when first click occurs
            /* const collector = interaction.channel.createMessageComponentCollector({ max: 1, time: 60000 });

            try {
                collector.on('collect', async i => {
                    if (i.user.id === interaction.user.id && i.customId === 'primary') {
                        await i.update({ content: 'The primary button was clicked!', components: [] });
                    } else if (i.user.id === interaction.user.id && i.customId === 'secondary') {
                        await i.update({ content: 'The secondary button was clicked!', components: [] });
                    } else {
                        await i.reply({ content: 'These buttons aren\'t for you!', ephemeral: true });
                    }
                });

                collector.on('end', collected => console.log(`Collected ${collected.size} interactions.`));
            } catch (error) {
                console.error(error);
            }*/
            if (interaction.customId === 'primary') {
                await interaction.update({ content: `Primary was clicked by ${username}!`, components: [] });
            } else {
                await interaction.update({ content: `Secondary was clicked by ${username}!`, components: [] });
            }
        } else if (interaction.isChatInputCommand()) {
            if (!command) {
                console.error(`No command matching ${commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${commandName}.`);
                console.error(error);
            }
        } else if (interaction.isContextMenuCommand()) {
            if (interaction.isMessageContextMenuCommand()) {
                const targetMsg = interaction.targetMessage;

                await interaction.reply({ content: `${username} targetted ${targetMsg.content}.` });
            } else if (interaction.isUserContextMenuCommand()) {
                // basically else statement
                const targetMember = interaction.targetMember;
                const targetUser = interaction.targetUser;

                await interaction.reply({ content: `${username} targetted ${targetUser.username} user or ${targetMember.username} member.` });
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'myModal') {
                // Get the data entered by the user
                const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
                const hobbies = interaction.fields.getTextInputValue('hobbiesInput');

                await interaction.reply({ content: `${username}'s favorite color is ${favoriteColor}, and their hobbies are ${hobbies}.` });
            }
        } else if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'select') {
                const selected = interaction.values;
                const selectedReply = selected.join(', ');

                await interaction.update({ content: `${username} selected ${selectedReply}.` });
            }
        } else {
            return;
        }
    },
};