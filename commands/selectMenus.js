const { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('select-menus')
        .setDescription('Testing select menu MessageComponent'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .setMinValues(1)
                    .setMaxValues(3)
                    .addOptions([
                        {
                            label: 'Option 1',
                            description: 'First option',
                            value: 'first_option',
                        },
                        {
                            label: 'Option 2',
                            description: 'Second option',
                            value: 'second_option',
                        },
                        {
                            label: 'Option 3',
                            description: 'Third option',
                            value: 'third_option',
                        },
                    ]),
            );

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setDescription('Some description here');

        await interaction.reply({ content: 'Rawr! :raccoon:', embeds: [embed], components: [row] });
    },
};