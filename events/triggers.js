const Discord = require("discord.js");

module.exports = {
	name: "message",
	async execute(message) {
		// Checks if the trigger author is a bot, also provides all args of the message if needed for the specific trigger.
		const args = message.content.split(/ +/);
		if (message.author.bot) return;

		// Checking ALL triggers using every function and breaking out if a trigger was found.
		var check;
		await message.client.triggers.every(async (trigger) => {
			if (check == 1) return false;
			await trigger.name.every(async (name) => {
				if (check == 1) return false;
				if (message.content.includes(name)) {
					try {
						trigger.execute(message, args);
					} catch (error) {
						console.error(error);
						message.reply("there was an error trying to execute that trigger!");
					}
					check = 1;
					return false;
				}
			});
		});
	},
};
