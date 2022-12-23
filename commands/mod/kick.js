const {EmbedBuilder}    = require('discord.js');
const config            = require('../../config.json');

module.exports = {
    name: 'kick',
    description: 'Kicks a user.',
    execute(message,args){
        function error(errorMsg){
                message.channel.send({embeds: [(
                    new EmbedBuilder().setDescription(errorMsg).setColor(config.themes.error)
                )]})      
        }
        
        const user = message.mentions.users.first()
        if (!user) return error('Could not find a user to kick, please mention them.')
        if (!message.member.permissions.has("KICK_MEMBERS")) return error('You do not have the ``KICK_MEMBERS`` permission.')
        if (!message.author.id == user.id) return error('You cannot kick yourself.')
        // You may want to add extra checks here.

        message.guild.members.kick(user)
        message.channel.send({embeds: [(
            new EmbedBuilder().setDescription("Successfully kicked user").setColor(config.themes.success)
        )]})

        

    }
}


