const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

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

    if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in!
		message.channel.send('Pong.');
	}
});

// Bot Logins Here
client.login(token);