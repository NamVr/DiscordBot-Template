const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Ready Event
client.once('ready', () => {
	console.log('Ready!');
});

// On Message (Any Message)
client.on('message', message => {
    // A good practice is to avoid reading commands from other bots! Also return if the command does not starts with the prefix in config.json!

    if (!message.content.startsWith(prefix) || message.author.bot) return;
	
    // Splits the arguments by reading spaces, BONUS: Ignores the extra spaces!
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    // Converts your command to lower case, then !PING == !ping == !pInG
	const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command! (We will be changing this message later!)');
	}
});

// Bot Logins Here
client.login(token);