const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // rule msg's id is 1048320141378715648
        // console.log(message);
    },
};