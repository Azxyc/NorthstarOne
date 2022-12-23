const config = require ('../../config.json')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'sinfo',
    description: 'Displays server information.',
    async execute(message, args) {
        let fields = [
            {name: 'Name', value: message.guild.name},
            {name: 'Id', value: message.guild.id},
            {name: 'Member Count', value: message.guild.members.cache.size.toString()},
            // You can add more fields here
        ]
        let embed = new EmbedBuilder()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .addFields(fields)
        .setColor(config.themes.default)
        .setTimestamp();
        message.channel.send({embeds: [embed]})
    }
}