const {EmbedBuilder}    = require('discord.js');
const config            = require('../../config.json');

module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    execute(message,args){
        function error(errorMsg){
                message.channel.send({embeds: [(
                    new EmbedBuilder().setDescription(errorMsg).setColor(config.themes.error)
                )]})
        }
        
        const user = message.mentions.users.first()
        if (!user) return error('Could not find a user to ban, please mention them.')
        if (!message.member.permissions.has("BAN_MEMBERS")) return error('You do not have the ``BAN_MEMBERS`` permission.')
        if (!message.author.id == user.id) return error('You cannot ban yourself.')
        // You may want to add extra checks here.

        message.guild.members.ban(user)
        message.channel.send({embeds: [(
            new EmbedBuilder().setDescription("Successfully banned user").setColor(config.themes.success)
        )]})

        

    }
}


