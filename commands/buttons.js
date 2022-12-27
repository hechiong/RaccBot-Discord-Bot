const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttons')
        .setDescription('Testing button MessageComponent'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Some title')
            .setURL('https://discord.js.org')
            .setDescription('Some description here');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary)
                    // .setEmoji('123456789012345678')  for (custom) server emojis
                    .setDisabled(false),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('secondary')
                    .setLabel('Not click me!')
                    .setStyle(ButtonStyle.Secondary),
            );

        await interaction.reply({ content: 'I think you should...', embeds: [embed], components: [row] });
    },
};