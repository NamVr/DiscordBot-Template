module.exports = {
	name: "very-secret",
	//description: 'Ping!',
	//usage: 'put usage here',
	//permissions: 'SEND_MESSAGES',
	//guildOnly: true,
	execute(message, args) {
		message.channel.send("Yes, this worked without prefix. ||SECRET||");
	},
};
