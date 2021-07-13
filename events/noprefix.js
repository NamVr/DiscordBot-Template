const { Collection, MessageEmbed: Embed } = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
	name: "message",
	async execute(message) {
		// Declares const to be used.
		const { client, guild, channel, content, author } = message;

		// Real checks goes dynamically.
		const args = content.split(/ +/);
		const npcmdName = args.shift().toLowerCase();

		// Finds the actual command.
		const npcmd =
			client.npcmds.get(npcmdName) ||
			client.npcmds.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(npcmdName)
			);

		// It it's not a command, return :)
		if (!npcmd) return;

		// Guild Only Property, add in your command properties if true.
		if (npcmd.guildOnly && message.channel.type === "dm") {
			return message.reply("I can't execute that command inside DMs!");
		}

		// Author perms property
		if (npcmd.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(npcmd.permissions)) {
				return message.reply("You can not do this!");
			}
		}

		// Args missing
		if (npcmd.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (npcmd.usage) {
				reply += `\nThe proper usage would be: \`${npcmd.name} ${npcmd.usage}\``;
			}

			return message.channel.send(reply);
		}

		// Copldowns
		const { cooldowns } = client;

		if (!cooldowns.has(npcmd.name)) {
			cooldowns.set(npcmd.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(npcmd.name);
		const cooldownAmount = (npcmd.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${npcmd.name}\` command.`
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		// Rest your creativity is below.

		// execute the final command. Put everything above this.
		try {
			npcmd.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply("there was an error trying to execute that command!");
		}
	},
};
