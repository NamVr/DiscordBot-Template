const Discord = require('discord.js');
const client = new Discord.Client();

// Ready Event
client.once('ready', () => {
	console.log('Ready!');
});

// On Message (Any Message)
client.on('message', message => {
	if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
});

// Bot Logins Here
client.login('your-token-goes-here');