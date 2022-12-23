const config = require ('../../config.json')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'ping',
	description: 'Displays latency.',
	async execute(message, args) {
        let embed = new EmbedBuilder()
        .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`)
        .setColor(config.themes.default)
        .setTimestamp()
        message.channel.send({embeds: [embed]})
        
        
    }
}