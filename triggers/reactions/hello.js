// For now, the only available property is name array. Not making the name array will result in an error.

module.exports = {
	name: ["your", "trigger", "words", "in", "array"],
	execute(message, args) {
		// Put all your trigger code over here.
		message.channel.send("Pong.");
	},
};
