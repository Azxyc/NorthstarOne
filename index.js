const { Client, Events, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const config = require('./config.json');

const fs = require('fs')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection()

const misc = fs.readdirSync('./commands/misc').filter(file => file.endsWith('.js'));
const mod = fs.readdirSync('./commands/mod').filter(file => file.endsWith('.js'));
const util = fs.readdirSync('./commands/util').filter(file => file.endsWith('.js'));
const restricted = fs.readdirSync('./commands/restricted').filter(file => file.endsWith('.js'));

for (const file of misc) {
	const command = require(`./commands/misc/${file}`);
	client.commands.set(command.name, command);
}

for (const file of mod) {
	const command = require(`./commands/mod/${file}`);
	client.commands.set(command.name, command);
}

for (const file of util) {
	const command = require(`./commands/util/${file}`);
	client.commands.set(command.name, command);
}

for (const file of restricted) {
	const command = require(`./commands/restricted/${file}`);
	client.commands.set(command.name, command);
}


client.once(Events.ClientReady, async client => {
	console.log(`${config.meta.name} version ${config.meta.version} logged in as ${client.user.tag}`);
    
});



client.on("messageCreate", async message =>{
    if (!message.content.startsWith(config.key.prefix) || message.author.bot) return;
    const args = message.content.slice(config.key.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return message.reply('command does not exist')
    cmd = client.commands.get(command);
    try{
        await cmd.execute(message,args)

    } catch (e){
        err = e.toString()
        fields = [
            {name: 'Command', value: "```"+ message.content + "```"},
            {name: 'Error', value: "```"+ err + "```"}
        ]
        let embed = new EmbedBuilder()
            .setTitle('Command handler error')
            .addFields(fields)
            .setDescription(`An error has occured while executing this command.`)
            .setColor(config.themes.error);

        message.channel.send({ embeds: [embed] });
        console.error(e)
        
    }

})

client.login(config.key.token);