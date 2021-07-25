const Discord = require("discord.js");
const { prefix, owner } = require("../config.json");

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
	name: "message",
	async execute(message) {
		// Declares const to be used.
		const { client, guild, channel, content, author } = message;

		// Converts prefix to lowercase.
		const checkPrefix = prefix.toLowerCase();

		// New: Mention Prefix added.
		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);
		if (!prefixRegex.test(content.toLowerCase())) return;

		// Real checks goes dynamically.
		const [matchedPrefix] = content.toLowerCase().match(prefixRegex);
		const args = content.slice(matchedPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		// Check if mesage does not starts with prefix, or message author is bot. If yes, return.
		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return;

		// Finds the actual command.
		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		// It it's not a command, return :)
		if (!command) return;

		// Owner Only Property, add in your command properties if true.
		if (command.ownerOnly && message.author.id !== owner) {
			return message.reply("This is a owner only command!");
		}
		// Guild Only Property, add in your command properties if true.
		if (command.guildOnly && message.channel.type === "dm") {
			return message.reply("I can't execute that command inside DMs!");
		}

		// Author perms property
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply("You can not do this!");
			}
		}

		// Args missing
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		// Copldowns
		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${command.name}\` command.`
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		// Rest your creativity is below.

		// execute the final command. Put everything above this.
		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply("There was an error trying to execute that command!");
		}
	},
};
