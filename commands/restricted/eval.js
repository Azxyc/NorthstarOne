const {EmbedBuilder} = require('discord.js');
const { inspect } = require('util');
const config = require('../../config.json');


module.exports = {
    name: 'eval',
    description: 'Evaluates code.',
    async execute(message, args) {
        if(!config.key.owner_id == message.author.id) return;
        try {
            evaled = await eval(args.join(' '));
            message.channel.send(inspect(evaled));
        } catch (e) {
            message.channel.send(e.toString());
            console.log(e.toString());
        }
    }
}