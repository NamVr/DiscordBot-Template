module.exports = {
	name: "ping",
	//description: 'Ping!',
	//usage: 'put usage here',
	//permissions: 'SEND_MESSAGES',
	//guildOnly: true,
	execute(message, args) {
		message.channel.send("Pong.");
	},
};
