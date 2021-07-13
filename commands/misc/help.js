const { prefix } = require("./../../config.json");
const Discord = require("discord.js");
module.exports = {
	name: "help",
	description: "List all commands of bot or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,
	eligible: 1,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			let helpEmbed = new Discord.MessageEmbed()
				.setColor(0x4286f4)
				.setURL(process.env.URL)
				.setTitle("List of all my commands")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addField(
					"Usage",
					`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
				);
			return message.author
				.send(helpEmbed)

				.then(() => {
					if (message.channel.type === "dm") return;
					message.reply("I've sent you a DM with all my commands!");
				})
				.catch((error) => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);
					message.reply("it seems like I can't DM you!");
				});
		}

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("that's not a valid command!");
		}

		let commandEmbed = new Discord.MessageEmbed()
			.setColor(0x4286f4)
			.setTitle("Command Help");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed
				.addField("Aliases", `\`${command.aliases.join(", ")}\``, true)
				.addField("Cooldown", `${command.cooldown || 3} second(s)`, true);
		if (command.usage)
			commandEmbed.addField(
				"Usage",
				`\`${prefix}${command.name} ${command.usage}\``,
				true
			);
		message.channel.send(commandEmbed);
	},
};
