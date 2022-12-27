const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prune up to 99 messages.')
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('Number of messages to prune')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(99))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
        });

        return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true });
    },
};